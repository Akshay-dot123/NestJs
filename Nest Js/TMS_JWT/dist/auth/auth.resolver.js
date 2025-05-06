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
const create_user_input_1 = require("../user/dto/create-user.input");
const auth_service_1 = require("./auth.service");
const local_auth_guard_1 = require("./local-auth.guard");
let AuthResolver = class AuthResolver {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginInput, context) {
        console.log('Runs last');
        const user = context.req.user;
        console.log(user);
        const accessToken = await this.authService.login(user);
        const res = context.res;
        res.cookie('token', accessToken);
        console.log(accessToken);
        return accessToken.access_token;
    }
};
exports.AuthResolver = AuthResolver;
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Mutation)(() => String, { name: 'login' }),
    __param(0, (0, graphql_1.Args)('loginInput')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.LoginUserInput, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
exports.AuthResolver = AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
//# sourceMappingURL=auth.resolver.js.map