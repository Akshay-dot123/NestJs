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

  @SubscribeMessage('get_room_messages')
  async handleGetMessages(
    @MessageBody() body: { room: string; username: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const Room = await this.roomService.findAllRoom(body.room);
    console.log('Room=======>', Room);
    // const userName = await this.userService.findOne(body.username);
    const sortedMessages = Room.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
    socket.emit('room_messages', sortedMessages);
    socket.broadcast.emit('room_messages', sortedMessages);
  }

  @SubscribeMessage('edit_message')
  async handleDeleteMessage(
    @MessageBody() body: { id: string; message: string },
    @ConnectedSocket() socket: Socket,
  ) {
    await this.messageService.update(body.id, body);
    const updatedMessage = await this.messageService.findOne(body.id);
    socket.emit('message_edited', updatedMessage);
    socket.broadcast.emit('message_edited', updatedMessage);
  }

  // @SubscribeMessage('delete_message')
  // handleDeleteMessage(
  //   @MessageBody() body: any,
  //   @ConnectedSocket() socket: Socket,
  // ) {
  //   console.log("body===========>",body)
  //   console.log("body.id===========>",body.id)
  //   await this.messageService.remove(body.id);
  //   socket.broadcast.emit('message_deleted', body.id);
  // }
}
