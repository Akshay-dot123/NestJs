import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { Room } from './entities/room.entity';
import { RoomService } from './room.service';
import { Message } from 'src/message/entities/message.entity';
import { UserService } from 'src/user/user.service';

@Resolver(() => Room)
export class RoomResolver {
  constructor(
    private readonly roomService: RoomService,
    private readonly userService: UserService,
  ) {}
  // @Query(() => [Message])
  // async findAllMessages( @Args('room_name') room_name: string,
  // @Args('username') username: string,) {
  //   const created = await this.roomService.findAllRoom(room_name);
  //   console.log("created=====>",created)
  //   // pubsub.publish('messageAdded', { messageAdded: created });
  //   return created;
  // }
}
