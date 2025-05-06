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
exports.Task = void 0;
const graphql_1 = require("@nestjs/graphql");
const project_entity_1 = require("../../project/entities/project.entity");
const typeorm_1 = require("typeorm");
const task_user_entity_1 = require("./task-user.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let Task = class Task {
    id;
    task_name;
    description;
    created_by;
    updated_by;
    projectId;
    users;
    project;
    taskUsers;
};
exports.Task = Task;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Task.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Task.prototype, "task_name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Task.prototype, "created_by", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], Task.prototype, "updated_by", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Task.prototype, "projectId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [user_entity_1.User]),
    __metadata("design:type", Array)
], Task.prototype, "users", void 0);
__decorate([
    (0, graphql_1.Field)(() => project_entity_1.Project),
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, (project) => project.tasks),
    __metadata("design:type", project_entity_1.Project)
], Task.prototype, "project", void 0);
__decorate([
    (0, graphql_1.Field)(() => [task_user_entity_1.TaskUser]),
    (0, typeorm_1.OneToMany)(() => task_user_entity_1.TaskUser, (taskUser) => taskUser.task),
    __metadata("design:type", Array)
], Task.prototype, "taskUsers", void 0);
exports.Task = Task = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], Task);
//# sourceMappingURL=task.entity.js.map