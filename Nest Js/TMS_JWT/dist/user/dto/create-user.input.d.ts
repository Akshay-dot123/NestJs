import { Role } from '../entities/user.entity';
export declare class CreateUserInput {
    email: string;
    password: string;
    role: Role;
}
export declare class LoginUserInput {
    email: string;
    password: string;
}
