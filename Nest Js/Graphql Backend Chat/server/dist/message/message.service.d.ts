import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Room } from 'src/room/entities/room.entity';
export declare class MessageService {
    private readonly messageRepository;
    private readonly roomRepository;
    private readonly userRepository;
    constructor(messageRepository: Repository<Message>, roomRepository: Repository<Room>, userRepository: Repository<User>);
    create(data: any): Promise<Message>;
    findAll(id: string): Promise<Message[]>;
    findOne(id: string): Promise<Message | null>;
    update(body: any): Promise<Message | null>;
    remove(body: any): Promise<Message | null>;
}
