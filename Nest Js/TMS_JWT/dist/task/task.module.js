"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModule = void 0;
const common_1 = require("@nestjs/common");
const task_service_1 = require("./task.service");
const task_resolver_1 = require("./task.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("./entities/task.entity");
const user_entity_1 = require("../user/entities/user.entity");
const user_service_1 = require("../user/user.service");
const role_helper_1 = require("../utils/role-helper");
const task_user_entity_1 = require("./entities/task-user.entity");
const project_entity_1 = require("../project/entities/project.entity");
const project_service_1 = require("../project/project.service");
const pubsub_module_1 = require("../pubsub.module");
let TaskModule = class TaskModule {
};
exports.TaskModule = TaskModule;
exports.TaskModule = TaskModule = __decorate([
    (0, common_1.Module)({
        providers: [task_resolver_1.TaskResolver, task_service_1.TaskService, user_service_1.UserService, role_helper_1.RoleService, project_service_1.ProjectService],
        imports: [typeorm_1.TypeOrmModule.forFeature([task_entity_1.Task, user_entity_1.User, task_user_entity_1.TaskUser, project_entity_1.Project]), pubsub_module_1.PubSubModule],
    })
], TaskModule);
//# sourceMappingURL=task.module.js.map