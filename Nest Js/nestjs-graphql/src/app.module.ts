import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { EmployeeModule } from './employee/employee.module';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee/entity/employee.entity';
import { ProjectModule } from './project/project.module';
import { Project } from './project/entities/project.entity';
import { QuizModule } from './quiz/quiz.module';
import { QuestionModule } from './question/question.module';
import { Quiz } from './quiz/entities/quiz.entity';
import { Question } from './question/entities/question.entity';
import { OptionsModule } from './options/options.module';
import { Options } from './options/entities/option.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { ProfileResolver } from './profile/profile.resolver';
import { ProfileModule } from './profile/profile.module';
import { APP_GUARD } from '@nestjs/core';
import { GqlJwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'akshay',
      password: process.env.DB_PASSWORD || 'E1719prbu',
      database: process.env.DB_NAME || 'prac-grapghql',
      entities: [Employee, Project, Quiz, Question, Options, User],
      synchronize: true,
    }),
    EmployeeModule,
    ProjectModule,
    QuizModule,
    QuestionModule,
    OptionsModule,
    AuthModule,
    UserModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ProfileResolver,
    // { provide: APP_GUARD, useClass: GqlJwtAuthGuard }, // This will apply strategy or guards to every route
  ],
})
export class AppModule {}
