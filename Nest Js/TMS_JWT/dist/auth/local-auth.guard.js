"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GqlAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const graphql_1 = require("@nestjs/graphql");
let GqlAuthGuard = class GqlAuthGuard extends (0, passport_1.AuthGuard)('local') {
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        const args = ctx.getArgs();
        if (args.loginInput) {
            const { role, ...loginInputWithoutRole } = args.loginInput;
            req.body = { ...loginInputWithoutRole };
        }
        console.log("Runs 1st(first) after auth-resolver.ts");
        console.log('Request Body:', req.body);
        return req;
    }
};
exports.GqlAuthGuard = GqlAuthGuard;
exports.GqlAuthGuard = GqlAuthGuard = __decorate([
    (0, common_1.Injectable)()
], GqlAuthGuard);
//# sourceMappingURL=local-auth.guard.js.map