import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
interface UserRole {
    role: string;
}
export declare class RoleService {
    private readonly userRepository;
    private readonly projectRepository;
    constructor(userRepository: Repository<User>, projectRepository: Repository<Project>);
    validateAssignedUsers(userId: string, userRole: UserRole, projectId: number): Promise<User[]>;
}
export {};
