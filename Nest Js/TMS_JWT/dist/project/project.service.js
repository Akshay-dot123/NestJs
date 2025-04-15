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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_entity_1 = require("./entities/project.entity");
const user_entity_1 = require("../user/entities/user.entity");
const user_service_1 = require("../user/user.service");
const typeorm_3 = require("typeorm");
const task_entity_1 = require("../task/entities/task.entity");
let ProjectService = class ProjectService {
    projectRepository;
    userRepository;
    userService;
    constructor(projectRepository, userRepository, userService) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }
    async create(createProjectInput, createrRole) {
        if (createrRole.role === 'ADMIN' || createrRole.role === 'TEAM_LEAD') {
            const { project_name, description, userId } = createProjectInput;
            const users = await this.validateAssignedUsers(userId, createrRole.role);
            const project = this.projectRepository.create({
                project_name,
                description,
                created_by: createrRole.id,
                users,
            });
            return this.projectRepository.save(project);
        }
        else {
            throw new Error('Only TL or Admin can create Project for existing users');
        }
    }
    async validateAssignedUsers(userId, userRole) {
        let users = [];
        if (userId) {
            const assignedIds = userId
                .split(',')
                .map((id) => id.trim())
                .filter((id) => /^\d+$/.test(id))
                .map((id) => Number(id));
            if (assignedIds.length === 0) {
                throw new common_1.NotFoundException(`Please insert valid existing Numeric UserId's`);
            }
            users = await this.userRepository.find({
                where: { id: (0, typeorm_3.In)(assignedIds) },
            });
            console.log('number of users assigned', users);
            if (users.length === 0) {
                throw new common_1.NotFoundException('No valid People to be assigned found');
            }
            if (userRole === 'TEAM_LEAD') {
                const isAssigningToAdmin = users.some((assignedUser) => assignedUser.role === 'ADMIN');
                if (isAssigningToAdmin) {
                    throw new common_1.ForbiddenException('TL cannot assign tasks to an Admin, please check userId');
                }
            }
        }
        return users;
    }
    findAll() {
        return this.projectRepository.find({ relations: ['tasks'] });
    }
    async findOne(id) {
        const project = await this.projectRepository.findOne({
            where: { id },
            relations: ['tasks', 'tasks.taskUsers'],
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        const taskUsers = project.tasks.flatMap((task) => task.taskUsers);
        const totalTasks = taskUsers.length;
        const completedTasks = taskUsers.filter((taskUser) => taskUser.task_status === 'Completed').length;
        const completedPercentage = totalTasks === 0 ? '0' : ((completedTasks / totalTasks) * 100).toFixed(2);
        console.log(`Percentage of Completed tasks: ${completedPercentage}%`);
        return {
            ...project,
            completedPercentage: parseFloat(completedPercentage),
        };
    }
    async update(projectId, updateProjectInput, updaterRole) {
        const project = await this.projectRepository.findOne({
            where: { id: projectId },
            relations: ['users'],
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        const user = await this.userService.findOne(project.created_by);
        if (!user) {
            throw new common_1.NotFoundException('User does not exist');
        }
        const { project_name, description, userId } = updateProjectInput;
        if (updaterRole.role == 'ADMIN' ||
            (updaterRole.role == 'TEAM_LEAD' && user.role == 'TEAM_LEAD')) {
            console.log('userId========>', userId);
            console.log('Project created By============>', user.role);
            const users = await this.validateAssignedUsers(userId, updaterRole);
            project.project_name = project_name ?? project.project_name;
            project.description = description ?? project.description;
            project.updated_by = updaterRole.id;
            project.users = users.length > 0 ? users : project.users;
            return this.projectRepository.save(project);
        }
        else {
            throw new Error('Admin can update all and TL can only updated their projects');
        }
    }
    async remove(id, removerRole) {
        const project = await this.projectRepository.findOne({ where: { id } });
        if (!project) {
            throw new Error('Project not found');
        }
        const projectCreator = project.created_by;
        const user = await this.userRepository.findOne({
            where: { id: projectCreator },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        console.log("removerRole========>", removerRole);
        const isAuthorized = removerRole === 'ADMIN' ||
            (user.role === 'TEAM_LEAD' && removerRole === 'TEAM_LEAD');
        if (!isAuthorized) {
            throw new common_1.UnauthorizedException('Not authorized to remove this project');
        }
        const deletedProjectId = project.id;
        await this.projectRepository.manager.delete(task_entity_1.Task, { project: { id } });
        await this.projectRepository.remove(project);
        return { id: deletedProjectId };
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        user_service_1.UserService])
], ProjectService);
//# sourceMappingURL=project.service.js.map