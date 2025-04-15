"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("./entities/task.entity");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../user/user.service");
const user_entity_1 = require("../user/entities/user.entity");
const role_helper_1 = require("../utils/role-helper");
const task_user_entity_1 = require("./entities/task-user.entity");
const project_entity_1 = require("../project/entities/project.entity");
let TaskService = class TaskService {
    taskRepository;
    taskUserRepository;
    userRepository;
    userService;
    roleService;
    projectRepository;
    constructor(taskRepository, taskUserRepository, userRepository, userService, roleService, projectRepository) {
        this.taskRepository = taskRepository;
        this.taskUserRepository = taskUserRepository;
        this.userRepository = userRepository;
        this.userService = userService;
        this.roleService = roleService;
        this.projectRepository = projectRepository;
    }
    async create(createTaskInput, userRole) {
        if (userRole.role === 'ADMIN' || userRole.role === 'TEAM_LEAD') {
            const { projectId, task_name, userId, task_status, task_priority } = createTaskInput;
            const project = await this.projectRepository.findOne({
                where: { id: projectId },
            });
            if (!project) {
                throw new Error('Project does not exist');
            }
            const creatorId = project.created_by;
            const projectCreatedUser = await this.userService.findOne(creatorId);
            if (!projectCreatedUser) {
                throw new common_1.NotFoundException('User not found');
            }
            console.log('userRole===========>', userRole.role);
            console.log('User:', projectCreatedUser);
            if (userRole.role == 'ADMIN' ||
                (userRole.role == 'TEAM_LEAD' && projectCreatedUser.role == 'TEAM_LEAD')) {
                const users = await this.roleService.validateAssignedUsers(userId, userRole);
                if (!users) {
                    throw new Error('Users do not exist');
                }
                const task = this.taskRepository.create({
                    projectId,
                    task_name,
                    created_by: userRole.id,
                });
                const savedTask = await this.taskRepository.save(task);
                const taskUsers = users.map((user) => this.taskUserRepository.create({
                    task: savedTask,
                    user: user,
                    task_status,
                    task_priority,
                }));
                await this.taskUserRepository.save(taskUsers);
                return savedTask;
            }
            else {
                throw new Error('TL cannot assign tasks for Project created by Admin');
            }
        }
        else {
            throw new Error('Only TL and Admins can assign tasks');
        }
    }
    findAll() {
        return this.taskRepository.find();
    }
    findOne(id) {
        return this.taskRepository.findOne({
            where: { id },
            relations: ['taskUsers'],
        });
    }
    async updateAdminTlTask(id, UpdateTaskInput, userRole) {
        const task = await this.taskRepository.findOne({
            where: { id },
        });
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        const Creator = await this.userRepository.findOne({
            where: { id: task.created_by },
        });
        if (!Creator) {
            throw new common_1.NotFoundException('Creator not found');
        }
        console.log('Creator.role=========>', Creator.role);
        const { task_name, description, userId } = UpdateTaskInput;
        console.log('Updater.role=========>', userRole.role);
        if ((Creator.role == 'TEAM_LEAD' && userRole.role == 'TEAM_LEAD') ||
            userRole.role == 'ADMIN') {
            const users = await this.roleService.validateAssignedUsers(userId, Creator);
            if (!users) {
                throw new Error('Users do not exist');
            }
            task.task_name = task_name;
            task.description = description;
            task.updated_by = userRole.id;
            const savedTask = await this.taskRepository.save(task);
            await Promise.all(users.map(async (user) => {
                const existingTaskUser = await this.taskUserRepository.findOne({
                    where: {
                        task: savedTask,
                        user: user,
                    },
                });
                if (!existingTaskUser) {
                    const taskUser = this.taskUserRepository.create({
                        task: savedTask,
                        user: user,
                    });
                    return await this.taskUserRepository.save(taskUser);
                }
                return existingTaskUser;
            }));
            return savedTask;
        }
        else {
            throw new common_1.UnauthorizedException('Updater is not authorized to update this task');
        }
    }
    async updateMember(id, UpdateTaskMemberInput) {
        const task = await this.taskUserRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        if (!task.user)
            throw new common_1.NotFoundException('Task owner not found');
        const { task_status, task_priority, updated_by } = UpdateTaskMemberInput;
        const updater = await this.userRepository.findOne({
            where: { id: updated_by },
        });
        if (!updater) {
            throw new common_1.NotFoundException('Updater not found');
        }
        const canUpdate = task.user.role === 'MEMBER' ||
            (task.user.role === 'ADMIN' && updater.role === 'ADMIN') ||
            (task.user.role === 'TEAM_LEAD' && updater.role === 'ADMIN') ||
            (task.user.role === 'TEAM_LEAD' && updater.role === 'TEAM_LEAD');
        if (!canUpdate) {
            throw new common_1.UnauthorizedException('Updater is not authorized to update this task');
        }
        task.task_status = task_status;
        task.task_priority = task_priority;
        return await this.taskUserRepository.save(task);
    }
    async remove(id, removerRole) {
        const task = await this.taskUserRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!task) {
            throw new Error('Task not found');
        }
        const user = task.user;
        console.log('User.role=========>', user);
        const isAuthorized = task.user.role === 'MEMBER' ||
            (task.user.role === 'ADMIN' && removerRole === 'ADMIN') ||
            (task.user.role === 'TEAM_LEAD' && removerRole === 'ADMIN') ||
            (task.user.role === 'TEAM_LEAD' && removerRole === 'TEAM_LEAD');
        if (!isAuthorized) {
            throw new common_1.UnauthorizedException('Not authorized to remove this task');
        }
        const deletedTaskId = task.id;
        await this.taskUserRepository.remove(task);
        return { id: deletedTaskId };
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __param(1, (0, typeorm_1.InjectRepository)(task_user_entity_1.TaskUser)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(5, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        user_service_1.UserService,
        role_helper_1.RoleService,
        typeorm_2.Repository])
], TaskService);
//# sourceMappingURL=task.service.js.map