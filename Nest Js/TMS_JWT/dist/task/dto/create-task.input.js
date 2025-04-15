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
exports.CreateTaskInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const task_enums_1 = require("../entities/task.enums");
let CreateTaskInput = class CreateTaskInput {
    task_name;
    description = 'Description';
    projectId;
    updated_by;
    userId;
    task_priority = task_enums_1.Task_priority.Low;
    task_status = task_enums_1.Task_status.To_Do;
};
exports.CreateTaskInput = CreateTaskInput;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Task is required' }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateTaskInput.prototype, "task_name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateTaskInput.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateTaskInput.prototype, "projectId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreateTaskInput.prototype, "updated_by", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateTaskInput.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(task_enums_1.Task_priority, { message: 'Invalid task priority' }),
    (0, graphql_1.Field)(() => task_enums_1.Task_priority, { nullable: true }),
    __metadata("design:type", String)
], CreateTaskInput.prototype, "task_priority", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(task_enums_1.Task_status, { message: 'Invalid task status' }),
    (0, graphql_1.Field)(() => task_enums_1.Task_status, { nullable: true }),
    __metadata("design:type", String)
], CreateTaskInput.prototype, "task_status", void 0);
exports.CreateTaskInput = CreateTaskInput = __decorate([
    (0, graphql_1.InputType)()
], CreateTaskInput);
//# sourceMappingURL=create-task.input.js.map