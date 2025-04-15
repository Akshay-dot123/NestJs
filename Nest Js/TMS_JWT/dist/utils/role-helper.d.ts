import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
interface UserRole {
    role: string;
}
export declare class RoleService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    validateAssignedUsers(userId: string, userRole: UserRole): Promise<User[]>;
}
export {};
