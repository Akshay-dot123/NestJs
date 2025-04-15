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
exports.User = exports.Role = void 0;
const graphql_1 = require("@nestjs/graphql");
const project_entity_1 = require("../../project/entities/project.entity");
const task_user_entity_1 = require("../../task/entities/task-user.entity");
const typeorm_1 = require("typeorm");
var Role;
(function (Role) {
    Role["Admin"] = "ADMIN";
    Role["Team_lead"] = "TEAM_LEAD";
    Role["Member"] = "MEMBER";
})(Role || (exports.Role = Role = {}));
(0, graphql_1.registerEnumType)(Role, {
    name: 'Role',
    description: 'The roles of a user in the system',
});
let User = class User {
    id;
    email;
    password;
    role;
    projects;
    taskUsers;
};
exports.User = User;
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Role, default: Role.Member }),
    (0, graphql_1.Field)(() => Role),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)(() => [project_entity_1.Project]),
    (0, typeorm_1.ManyToMany)(() => project_entity_1.Project, (project) => project.users),
    __metadata("design:type", Array)
], User.prototype, "projects", void 0);
__decorate([
    (0, graphql_1.Field)(() => [task_user_entity_1.TaskUser]),
    (0, typeorm_1.OneToMany)(() => task_user_entity_1.TaskUser, (taskUser) => taskUser.user),
    __metadata("design:type", Array)
], User.prototype, "taskUsers", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], User);
//# sourceMappingURL=user.entity.js.map