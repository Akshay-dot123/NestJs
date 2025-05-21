import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Room {
    id: number;
    room_name: string;
    user: User;
    messages: Message[];
    createdAt: Date;
}
