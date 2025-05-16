import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UserService } from './user/user.service';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './user/dto/create-user.dto';
import { validate } from 'class-validator';
import { CreateMessageDto } from './message/dto/create-message.dto';
import { MessageService } from './message/message.service';
import { RoomService } from './room/room.service';

@WebSocketGateway({
  cors: 'http://localhost:5173',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService,
    private readonly roomService: RoomService,
  ) {}
  handleConnection(socket: Socket) {
    // Is same as io.on('connection')
    console.log(`User Connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    // Is same as socket.on('disconnect')
    console.log(`User Disconnected: ${socket.id}`);
  }

  // Note:- socket.emit('dsfdds',someMessage) --> Displays the message only to user who sent the message
  // socket.broadcast.emit('dsfdds',someMessage) --> Displays the message to all other users except for those who sent the message

  @SubscribeMessage('join_room') // Is same as socket.on('join_room')
  async handleJoinRoom(
    @MessageBody() rawdata: any,
    @ConnectedSocket() socket: Socket,
  ) {
    const data = plainToInstance(CreateUserDto, rawdata);
    const errors = await validate(data);

    if (errors.length > 0) {
      console.log(errors);
      const messages = errors.flatMap((err) =>
        Object.values(err.constraints || {}),
      );
      console.log(messages);
      socket.emit('join_error', messages);
      return;
    }
    const result = await this.userService.create(data);
    console.log('user Created', result);
    if (!result) {
      socket.emit('join_error', 'Username or Password is Invalid');
      return;
    }
    socket.join(data.room);
    socket.emit('join_success');
    console.log(`User with ID: ${socket.id} joined room: ${data.room}`);
  }

  @SubscribeMessage('send_message') // Is same as socket.on('send_message')
  async handleSendMessage(
    @MessageBody() rawdata: any,
    @ConnectedSocket() socket: Socket,
  ) {
    const data = plainToInstance(CreateMessageDto, rawdata);
    const errors = await validate(data);

    if (errors.length > 0) {
      console.log(errors);
      const messages = errors.flatMap((err) =>
        Object.values(err.constraints || {}),
      );
      console.log(messages);
      socket.emit('join_error', messages);
      return;
    }
    const result = await this.messageService.create(data);

    // console.log('rawdata message', rawdata.room);
    // console.log('Sent message', result.room.room_name);
    // socket.to(rawdata.room).emit('receive_message', rawdata);
    // Below line states for whom the message should be sent
    socket.to(result.room.room_name).emit('receive_message', result);
    socket.emit('receive_message', result);
  }

  // Don't dont delete this part of code as below code sometimes does not work
  // @SubscribeMessage('get_room_messages')
  // async handleGetMessages(
  //   @MessageBody() body: { room: string; username: string },
  //   @ConnectedSocket() socket: Socket,
  // ) {
  //   const Room = await this.roomService.findAllRoom(body.room);
  //   // console.log('Room=======>', Room);
  //   const sortedMessages = Room.sort(
  //     (a, b) =>
  //       new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  //   );
  //   socket.emit('room_messages', sortedMessages);
  //   socket.broadcast.emit('room_messages', sortedMessages);
  // }

  // New functionlaity working but sometimes dont work
  @SubscribeMessage('get_room_messages')
  async handleGetMessages(
    @MessageBody() body: { room: string; username: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const Room = await this.roomService.findAllRoom(body.room);
    const userName = await this.userService.findOne(body.username);
    if (!userName) {
      return socket.emit('error', { message: 'User not found' });
    }
    const userRoom = await this.roomService.findUserRoom(
      body.room,
      userName.id,
    );
    console.log('userRoom=========>', userRoom);
    if (!userRoom) {
      return socket.emit('error', { message: 'User has not joined this room' });
    }
    // const currentUserCreatedAt = new Date(userRoom?.createdAt);
    // const sortedMessages = Room.filter((message) => {
    //   console.log('message=========>', message);
    //   const messageTime = new Date(message.createdAt);
    //   return currentUserCreatedAt < messageTime;
    // });
    // console.log('sortedMessages====>', sortedMessages);
    // New code working but need to test
    const joinedAt = new Date(userRoom.createdAt).getTime();
    const sortedMessages = Room.filter(
      (msg) => new Date(msg.createdAt).getTime() >= joinedAt,
    ).sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
    socket.emit('room_messages', sortedMessages);
    // socket.broadcast.emit('room_messages', sortedMessages);
  }

  @SubscribeMessage('edit_message')
  async handleEditMessage(
    @MessageBody() body: { id: string; message: string },
    @ConnectedSocket() socket: Socket,
  ) {
    await this.messageService.update(body.id, body);
    const updatedMessage = await this.messageService.findOne(body.id);
    socket.emit('message_edited', updatedMessage);
    socket.broadcast.emit('message_edited', updatedMessage);
  }

  @SubscribeMessage('delete_message')
  async handleDeleteMessage(
    @MessageBody() body: any,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log('body===========>', body);
    console.log('body.id===========>', body.id);
    const deletedMessage = await this.messageService.remove(body.id);
    socket.emit('message_deleted', deletedMessage);
    socket.broadcast.emit('message_deleted', deletedMessage);
  }
}
