import { Message } from './entities/message.entity';
import { MessageService } from './message.service';
import { DeleteMessageInput, SendMessageInput, UpdateMessageInput } from './dto/create-message.dto';
import { RoomService } from 'src/room/room.service';
import { UserService } from 'src/user/user.service';
import { PubSub } from 'graphql-subscriptions';
export declare class MessageResolver {
    private readonly messageService;
    private readonly roomService;
    private readonly userService;
    private pubSub;
    constructor(messageService: MessageService, roomService: RoomService, userService: UserService, pubSub: PubSub);
    findAllMessages(room_name: string, username: string): Promise<{
        id: number;
        message: string;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        user: {
            id: number;
            username: string;
        };
        room: {
            id: number;
            room_name: string;
        };
    }[]>;
    sendMessage(sendMessageInput: SendMessageInput): Promise<Message>;
    updateMessage(updateMessageInput: UpdateMessageInput): Promise<Message | null>;
    deleteMessage(deleteMessageInput: DeleteMessageInput): Promise<Message | null>;
    messageSent(room_name: string): import("graphql-subscriptions/dist/pubsub-async-iterable-iterator").PubSubAsyncIterableIterator<unknown>;
    messageUpdated(room_name: string): import("graphql-subscriptions/dist/pubsub-async-iterable-iterator").PubSubAsyncIterableIterator<unknown>;
    messageDeleted(room_name: string): import("graphql-subscriptions/dist/pubsub-async-iterable-iterator").PubSubAsyncIterableIterator<unknown>;
}
