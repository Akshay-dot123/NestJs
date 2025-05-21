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
exports.AuthResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const create_user_dto_1 = require("../user/dto/create-user.dto");
const auth_service_1 = require("./auth.service");
const user_service_1 = require("../user/user.service");
const loginResponse_dto_1 = require("../dto/loginResponse.dto");
let AuthResolver = class AuthResolver {
    userService;
    authService;
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async login(loginInput, context) {
        console.log('Runs last');
        const accessToken = await this.authService.login(loginInput);
        const result = await this.userService.create(loginInput);
        console.log("result1=========>", result);
        if (result) {
            console.log("result1=========>", result.room_name);
            const res = context.res;
            console.log(accessToken);
            return {
                access_token: accessToken.access_token,
                room_name: result.room_name,
                user: {
                    id: result.user.id,
                    username: result.user.username,
                },
            };
        }
        else {
            throw new common_1.UnauthorizedException('Invalid username or password');
        }
    }
};
exports.AuthResolver = AuthResolver;
__decorate([
    (0, graphql_1.Mutation)(() => loginResponse_dto_1.LoginResponse, { name: 'login' }),
    __param(0, (0, graphql_1.Args)('loginInput')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.LoginUserInput, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
exports.AuthResolver = AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], AuthResolver);
//# sourceMappingURL=auth.resolver.js.map