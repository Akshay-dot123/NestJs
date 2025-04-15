import { Project } from 'src/project/entities/project.entity';
import { TaskUser } from 'src/task/entities/task-user.entity';
export declare enum Role {
    Admin = "ADMIN",
    Team_lead = "TEAM_LEAD",
    Member = "MEMBER"
}
export declare class User {
    id: number;
    email: string;
    password: string;
    role: Role;
    projects: Project[];
    taskUsers: TaskUser[];
}
