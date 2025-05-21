import { Room } from 'src/room/entities/room.entity';
export declare class User {
    id: number;
    username: string;
    password: string;
    rooms: Room[];
    createdAt: Date;
}
