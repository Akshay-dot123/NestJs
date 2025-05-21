import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Room } from 'src/room/entities/room.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly roomRepository;
    constructor(userRepository: Repository<User>, roomRepository: Repository<Room>);
    create(data: any): Promise<false | Room>;
    findAll(): string;
    findOne(username: string): Promise<User | null>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
