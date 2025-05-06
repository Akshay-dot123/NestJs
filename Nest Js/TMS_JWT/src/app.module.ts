import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
// import { APP_GUARD } from '@nestjs/core';
// import { GqlJwtAuthGuard } from './auth/jwt-auth.guard';
import { ProjectModule } from './project/project.module';
import { Project } from './project/entities/project.entity';
import { TaskModule } from './task/task.module';
import { Task } from './task/entities/task.entity';
import { TaskUser } from './task/entities/task-user.entity';
import { AuthModule } from './auth/auth.module';
import { PubSub } from 'graphql-subscriptions';
import { PubSubModule } from './pubsub.module';
import * as cookie from 'cookie';
import { JwtService } from '@nestjs/jwt';
import * as Jwt from 'jsonwebtoken';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // NestJS gives you { req, res } from Express
      // You return an object { req, res } that gets passed into every resolver's @Context() decorator
      // So now, in your resolver:
      // @Context() context
      // context.req and context.res will actually be there — because you manually included them.
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
      subscriptions: {
        'graphql-ws': true, // <--- enable WebSocket-based subscriptions
        // 'graphql-ws': {
        //   // path: '/graphql',
        //   // Warning/ Note:- We cannot access token or user like we did for resolver by using decorator named (@Context) thats why we are doing this kind of circus.......
        //   onConnect: (ctx: any) => {
        //     const extra = ctx.extra as { socket: WebSocket; request: any };
        //     console.log('ctx.extra==========>', ctx.extra);
        //     const cookieHeader = extra.request.headers?.cookie || ctx.connectionParams?.cookie;
        //     const cookies = cookie.parse(cookieHeader);
        //     const rawToken = cookies.token;
        //     if (!rawToken) {
        //       throw new Error('hi');
        //     }
        //     const jsonToken = JSON.parse(rawToken.slice(2)); // remove 'j:' prefix
        //     const accessToken = jsonToken.access_token;
        //     console.log('accessToken========>', accessToken);
        //     const decoded = Jwt.verify(accessToken, 'Nivalsa'); // Handle try/catch here
        //     console.log('Decoded token:', decoded);
        //     return {
        //       currentUser: decoded,
        //     };
        //   },
        // },
      },

      context: ({ req, res }) => ({ req, res }),
      // context: ({ req, res, connection, ...ctx }) => {
      //   const rawCookie = ctx?.connectionParams?.cookie;
      //   console.log('Raw Cookie:', rawCookie);

      //   const cookies = cookie.parse(rawCookie || '');
      //   const token = cookies?.token;

      //   if (token) {
      //     console.log('token', token);
      //     try {
      //       const jsonToken = JSON.parse(decodeURIComponent(token).slice(2));
      //       const accessToken = jsonToken.access_token;

      //       const decoded = Jwt.verify(accessToken, 'Nivalsa');
      //       console.log('Decoded JWT:', decoded);

      //       return { user: decoded };
      //     } catch (err) {
      //       console.error('JWT verification failed', err);
      //     }
      //   }
      //   return { req, res };
      // },
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'akshay',
      password: process.env.DB_PASSWORD || 'E1719prbu',
      database: process.env.DB_NAME || 'prac-auth-tms',
      entities: [User, Project, Task, TaskUser],
      synchronize: true,
    }),
    PubSubModule,
    UserModule,
    AuthModule,
    ProjectModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Below line newly added
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    // { provide: APP_GUARD, useClass: GqlJwtAuthGuard }, // This will apply strategy or guards to every route
  ],
})
export class AppModule {}

// Generally guards are used ofr graphql-nestjs instead of middleware
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthCookieMiddleware)
//       .forRoutes({ path: '*', method: RequestMethod.ALL });
//   }
// }
