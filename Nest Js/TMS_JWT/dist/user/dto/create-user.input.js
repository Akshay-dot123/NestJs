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
exports.LoginUserInput = exports.CreateUserInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../entities/user.entity");
let CreateUserInput = class CreateUserInput {
    email;
    password;
    role;
};
exports.CreateUserInput = CreateUserInput;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email' }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateUserInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.MinLength)(4, { message: 'Password must be at least 4 characters long' }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.Role),
    (0, class_validator_1.IsNotEmpty)({ message: 'Role should be Admin or TL or Member ' }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "role", void 0);
exports.CreateUserInput = CreateUserInput = __decorate([
    (0, graphql_1.InputType)()
], CreateUserInput);
let LoginUserInput = class LoginUserInput {
    email;
    password;
};
exports.LoginUserInput = LoginUserInput;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email' }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LoginUserInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.MinLength)(4, { message: 'Password must be at least 4 characters long' }),
    __metadata("design:type", String)
], LoginUserInput.prototype, "password", void 0);
exports.LoginUserInput = LoginUserInput = __decorate([
    (0, graphql_1.InputType)()
], LoginUserInput);
//# sourceMappingURL=create-user.input.js.map