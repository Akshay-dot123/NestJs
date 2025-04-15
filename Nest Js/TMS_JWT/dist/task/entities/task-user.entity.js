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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskUser = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const task_entity_1 = require("./task.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const task_enums_1 = require("./task.enums");
let TaskUser = class TaskUser {
    id;
    task;
    user;
    task_status;
    task_priority;
};
exports.TaskUser = TaskUser;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TaskUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => task_entity_1.Task, (task) => task.taskUsers, { onDelete: 'CASCADE' }),
    (0, graphql_1.Field)(() => task_entity_1.Task),
    __metadata("design:type", task_entity_1.Task)
], TaskUser.prototype, "task", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.taskUsers, { onDelete: 'CASCADE' }),
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], TaskUser.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: task_enums_1.Task_status, default: task_enums_1.Task_status.To_Do }),
    (0, graphql_1.Field)(() => task_enums_1.Task_status),
    __metadata("design:type", String)
], TaskUser.prototype, "task_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: task_enums_1.Task_priority, default: task_enums_1.Task_priority.Low }),
    (0, graphql_1.Field)(() => task_enums_1.Task_priority),
    __metadata("design:type", String)
], TaskUser.prototype, "task_priority", void 0);
exports.TaskUser = TaskUser = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], TaskUser);
//# sourceMappingURL=task-user.entity.js.map