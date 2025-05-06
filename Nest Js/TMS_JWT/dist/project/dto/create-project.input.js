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
exports.CreateProjectInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let CreateProjectInput = class CreateProjectInput {
    project_name;
    description = 'Description';
    updated_by;
    userId;
};
exports.CreateProjectInput = CreateProjectInput;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Project is required' }),
    (0, graphql_1.Field)(),
    (0, class_validator_1.MinLength)(3, { message: 'Project name must be at least 3 characters long' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Project name must be at most 50 characters long' }),
    __metadata("design:type", String)
], CreateProjectInput.prototype, "project_name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateProjectInput.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreateProjectInput.prototype, "updated_by", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateProjectInput.prototype, "userId", void 0);
exports.CreateProjectInput = CreateProjectInput = __decorate([
    (0, graphql_1.InputType)()
], CreateProjectInput);
//# sourceMappingURL=create-project.input.js.map