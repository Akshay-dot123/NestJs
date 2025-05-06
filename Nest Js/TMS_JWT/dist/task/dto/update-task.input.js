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
exports.UpdateTaskMemberInput = exports.UpdateTaskInput = void 0;
const create_task_input_1 = require("./create-task.input");
const graphql_1 = require("@nestjs/graphql");
const task_enums_1 = require("../entities/task.enums");
let UpdateTaskInput = class UpdateTaskInput extends (0, graphql_1.PartialType)(create_task_input_1.CreateTaskInput) {
    id;
    task_name;
    description = 'Description';
    userId;
};
exports.UpdateTaskInput = UpdateTaskInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], UpdateTaskInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateTaskInput.prototype, "task_name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateTaskInput.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateTaskInput.prototype, "userId", void 0);
exports.UpdateTaskInput = UpdateTaskInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateTaskInput);
let UpdateTaskMemberInput = class UpdateTaskMemberInput {
    id;
    task_status;
    task_priority;
};
exports.UpdateTaskMemberInput = UpdateTaskMemberInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], UpdateTaskMemberInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => task_enums_1.Task_status),
    __metadata("design:type", String)
], UpdateTaskMemberInput.prototype, "task_status", void 0);
__decorate([
    (0, graphql_1.Field)(() => task_enums_1.Task_priority),
    __metadata("design:type", String)
], UpdateTaskMemberInput.prototype, "task_priority", void 0);
exports.UpdateTaskMemberInput = UpdateTaskMemberInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateTaskMemberInput);
//# sourceMappingURL=update-task.input.js.map