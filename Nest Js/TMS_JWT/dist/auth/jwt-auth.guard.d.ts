import { ExecutionContext } from '@nestjs/common';
declare const GqlJwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class GqlJwtAuthGuard extends GqlJwtAuthGuard_base {
    getRequest(context: ExecutionContext): any;
}
export {};
