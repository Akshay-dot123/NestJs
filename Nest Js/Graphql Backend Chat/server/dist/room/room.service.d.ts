import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
export declare class RoomService {
    private readonly roomRepository;
    constructor(roomRepository: Repository<Room>);
    findAll(): string;
    findOne(id: number): string;
    findRoom(room: string): Promise<Room | null>;
    findUserRoom(room_name: string, userId: number): Promise<Room | null>;
    findAllRoom(room_name: string): Promise<{
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
    remove(id: number): string;
}
