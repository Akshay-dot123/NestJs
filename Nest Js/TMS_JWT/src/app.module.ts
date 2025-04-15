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
// import { AuthCookieMiddleware } from './auth/auth-cookie.middleware';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // NestJS gives you { req, res } from Express
      // You return an object { req, res } that gets passed into every resolver's @Context() decorator
      // So now, in your resolver:
      // @Context() context
      // context.req and context.res will actually be there — because you manually included them.
      context: ({ req, res }) => ({ req, res }),
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
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

    UserModule,
    AuthModule,
    ProjectModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // { provide: APP_GUARD, useClass: GqlJwtAuthGuard }, // This will apply strategy or guards to every route
  ],
})
export class AppModule{}

// Generally guards are used ofr graphql-nestjs instead of middleware
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthCookieMiddleware)
//       .forRoutes({ path: '*', method: RequestMethod.ALL });
//   }
// }
