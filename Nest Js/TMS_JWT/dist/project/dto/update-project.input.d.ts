import { CreateProjectInput } from './create-project.input';
declare const UpdateProjectInput_base: import("@nestjs/common").Type<Partial<CreateProjectInput>>;
export declare class UpdateProjectInput extends UpdateProjectInput_base {
    id: number;
    project_name?: string;
    description?: string;
    userId: string;
}
export {};
