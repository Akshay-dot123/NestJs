import { Room } from 'src/room/entities/room.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Message {
    id: number;
    message: string;
    isDeleted: boolean;
    room: Room;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
