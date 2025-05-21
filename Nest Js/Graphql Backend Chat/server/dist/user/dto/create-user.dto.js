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
exports.LoginUserInput = exports.UserOutput = exports.CreateUserDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let CreateUserDto = class CreateUserDto {
    username;
    password;
    room;
};
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4, { message: 'Password must be at least 4 characters long' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "room", void 0);
exports.CreateUserDto = CreateUserDto = __decorate([
    (0, graphql_1.InputType)()
], CreateUserDto);
let UserOutput = class UserOutput {
    id;
    username;
    room;
};
exports.UserOutput = UserOutput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserOutput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserOutput.prototype, "username", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserOutput.prototype, "room", void 0);
exports.UserOutput = UserOutput = __decorate([
    (0, graphql_1.ObjectType)()
], UserOutput);
let LoginUserInput = class LoginUserInput {
    username;
    password;
    room;
};
exports.LoginUserInput = LoginUserInput;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'username is required' }),
    (0, graphql_1.Field)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], LoginUserInput.prototype, "username", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.MinLength)(4, { message: 'Password must be at least 4 characters long' }),
    __metadata("design:type", String)
], LoginUserInput.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LoginUserInput.prototype, "room", void 0);
exports.LoginUserInput = LoginUserInput = __decorate([
    (0, graphql_1.InputType)()
], LoginUserInput);
//# sourceMappingURL=create-user.dto.js.map