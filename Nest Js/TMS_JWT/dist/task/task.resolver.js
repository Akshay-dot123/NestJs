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
exports.TaskResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const task_service_1 = require("./task.service");
const task_entity_1 = require("./entities/task.entity");
const create_task_input_1 = require("./dto/create-task.input");
const update_task_input_1 = require("./dto/update-task.input");
const task_user_entity_1 = require("./entities/task-user.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const common_1 = require("@nestjs/common");
const graphql_subscriptions_1 = require("graphql-subscriptions");
let TaskResolver = class TaskResolver {
    taskService;
    pubSub;
    constructor(taskService, pubSub) {
        this.taskService = taskService;
        this.pubSub = pubSub;
    }
    async createTask(createTaskInput, context) {
        const userRole = context.req.user;
        console.log('Creating a task', userRole);
        const newTask = await this.taskService.create(createTaskInput, userRole);
        await this.pubSub.publish('taskCreated', { taskCreated: newTask });
        console.log("newTask=========>", newTask);
        return newTask;
    }
    findAll() {
        return this.taskService.findAll();
    }
    findAllUserTask(context) {
        const userRole = context.req.user;
        console.log('Finding All User Task', userRole);
        return this.taskService.findAllUserTask(userRole);
    }
    findUserTaskById(id) {
        return this.taskService.findUserTaskById(id);
    }
    findOne(id) {
        return this.taskService.findOne(id);
    }
    updateTask(updateTaskInput, context) {
        const userRole = context.req.user;
        console.log('Updating TL or Member Task', userRole);
        return this.taskService.updateAdminTlTask(updateTaskInput.id, updateTaskInput, userRole);
    }
    updateMemberTask(updateMemberTaskInput, context) {
        const userRole = context.req.user;
        console.log('Updating User or Member Task', userRole);
        return this.taskService.updateMember(updateMemberTaskInput.id, updateMemberTaskInput, userRole);
    }
    deleteTaskUser(id, context) {
        const userRole = context.req.user.role;
        console.log('User Deleting Task_User:', userRole);
        return this.taskService.remove(id, userRole);
    }
    deleteTask(id, context) {
        const userRole = context.req.user.role;
        console.log('User Deleting Task:', userRole);
        return this.taskService.removeTask(id, userRole);
    }
    taskCreated(userId) {
        console.log('New subscription started for userId in Task:', userId);
        return this.pubSub.asyncIterableIterator('taskCreated');
    }
};
exports.TaskResolver = TaskResolver;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    (0, graphql_1.Mutation)(() => task_entity_1.Task),
    __param(0, (0, graphql_1.Args)('createTask')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_input_1.CreateTaskInput, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "createTask", null);
__decorate([
    (0, graphql_1.Query)(() => [task_entity_1.Task], { name: 'findAllTask' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    (0, graphql_1.Query)(() => [task_user_entity_1.TaskUser], { name: 'findAllUserTask' }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "findAllUserTask", null);
__decorate([
    (0, graphql_1.Query)(() => task_user_entity_1.TaskUser, { name: 'findUserTaskById' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "findUserTaskById", null);
__decorate([
    (0, graphql_1.Query)(() => task_entity_1.Task, { name: 'findTaskById' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    (0, graphql_1.Mutation)(() => task_entity_1.Task),
    __param(0, (0, graphql_1.Args)('updateAdminTlTask')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_task_input_1.UpdateTaskInput, Object]),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "updateTask", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    (0, graphql_1.Mutation)(() => task_user_entity_1.TaskUser),
    __param(0, (0, graphql_1.Args)('updateMemberTask')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_task_input_1.UpdateTaskMemberInput, Object]),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "updateMemberTask", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    (0, graphql_1.Mutation)(() => task_user_entity_1.TaskUser),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "deleteTaskUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    (0, graphql_1.Mutation)(() => task_entity_1.Task),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "deleteTask", null);
__decorate([
    (0, graphql_1.Subscription)(() => task_entity_1.Task, {
        name: 'taskCreated',
        filter: (payload, variables) => {
            console.log('opopopopop');
            console.log('Received filter variables:', variables);
            console.log('payload===========>', payload);
            return variables;
        },
    }),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "taskCreated", null);
exports.TaskResolver = TaskResolver = __decorate([
    (0, graphql_1.Resolver)(() => task_entity_1.Task),
    __param(1, (0, common_1.Inject)('PUB_SUB')),
    __metadata("design:paramtypes", [task_service_1.TaskService,
        graphql_subscriptions_1.PubSub])
], TaskResolver);
//# sourceMappingURL=task.resolver.js.map