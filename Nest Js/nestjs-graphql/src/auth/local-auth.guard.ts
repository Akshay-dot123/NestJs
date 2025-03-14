import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const args = ctx.getArgs();
    if (args.loginInput) {
      req.body = { ...args.loginInput }; // Manually set req.body for Passport
    }
    console.log("Runs first")
    console.log('Modified Request Body:', req.body); // Should now show { email, password }
    return req;
  }
}
