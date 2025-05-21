import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
// import { pubsub } from '../pubsub';
import { Message } from './entities/message.entity';
import { MessageService } from './message.service';
import {
  DeleteMessageInput,
  SendMessageInput,
  UpdateMessageInput,
} from './dto/create-message.dto';
import { RoomService } from 'src/room/room.service';
import { UserService } from 'src/user/user.service';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { RuleTester } from 'eslint';

@Resolver(() => Message)
export class MessageResolver {
  constructor(
    private readonly messageService: MessageService,
    private readonly roomService: RoomService,
    private readonly userService: UserService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  // @Query(() => [Message])
  // messages(@Args('roomId') roomId: string) {
  //   return this.messageService.findAll(roomId);
  // }

  // New code is working properly, above code won't diff b/w time sent by each user
  // Note:- If this does not work here put in room.resolver.ts and then check
  @Query(() => [Message])
  async findAllMessages(
    @Args('room_name') room_name: string,
    @Args('username') username: string,
  ) {
    const roomMessages = await this.roomService.findAllRoom(room_name);
    // Find the user
    const user = await this.userService.findOne(username);
    if (!user) throw new Error('User not found');

    // Check if user is part of the room
    const userRoom = await this.roomService.findUserRoom(room_name, user.id);
    if (!userRoom) throw new Error('User has not joined this room');

    const joinedAt = new Date(userRoom.createdAt).getTime();

    // Filter and sort messages by joined time
    const filteredMessages = roomMessages
      .filter((msg) => new Date(msg.createdAt).getTime() >= joinedAt)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    return filteredMessages;
  }

  @Mutation(() => Message)
  async sendMessage(
    @Args('sendMessageInput') sendMessageInput: SendMessageInput,
  ) {
    const created = await this.messageService.create(sendMessageInput);
    await this.pubSub.publish('messageSent', { messageSent: created });
    return created;
  }

  @Mutation(() => Message)
  async updateMessage(
    @Args('updateMessageInput') updateMessageInput: UpdateMessageInput,
  ) {
    const updated = await this.messageService.update(updateMessageInput);
    await this.pubSub.publish('messageUpdated', { messageUpdated: updated });
    console.log(updated);
    return updated;
  }
  
  @Mutation(() => Message)
  async deleteMessage(
    @Args('deleteMessageInput') deleteMessageInput: DeleteMessageInput,
  ) {
    const deletedMessage = await this.messageService.remove(deleteMessageInput);
    await this.pubSub.publish('messageDeleted', { messageDeleted: deletedMessage });
    console.log(deletedMessage);
    return deletedMessage;
  }

  @Subscription(() => Message, {
    name: 'messageSent',
    filter: (payload, variables) => {
      console.log('Received filter variables:', variables);
      console.log('payload===========>', payload);
      return payload.messageSent.room.room_name === variables.room_name;
    },
  })
  messageSent(@Args('room_name') room_name: string) {
    return this.pubSub.asyncIterableIterator('messageSent');
  }

  @Subscription(() => Message, {
    name: 'messageUpdated',
    filter: (payload, variables) => {
      console.log('Received filter variables:', variables);
      console.log('payload===========>', payload);
      return payload.messageUpdated.room.room_name === variables.room_name;
    },
  })
  messageUpdated(@Args('room_name') room_name: string) {
    return this.pubSub.asyncIterableIterator('messageUpdated');
  }

  @Subscription(() => Message, {
    name: 'messageDeleted',
    filter: (payload, variables) => {
      console.log('Received filter variables:', variables);
      console.log('payload===========>', payload);
      return payload.messageDeleted.room.room_name === variables.room_name;
    },
  })
  messageDeleted(@Args('room_name') room_name: string) {
    return this.pubSub.asyncIterableIterator('messageDeleted');
  }
}
