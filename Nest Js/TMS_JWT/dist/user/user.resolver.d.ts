import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    me(context: any): any;
    createUser(createUserInput: CreateUserInput): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User | null>;
    updateUser(updateUserInput: UpdateUserInput): string;
    deleteUser(id: number, context: any): Promise<User>;
}
