import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz/entity/quiz.entity';
import { QuestionModule } from './question/question.module';
import { Question } from './question/entity/question.entity';
import { OptionModule } from './option/option.module';
import { Option } from './option/entity/option.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';
// import { dataSourceOptions } from 'db/data-source';
import { AuthModule } from './auth/auth.module';
import { ApiTokenMiddleware } from './middleware/api-token-check.middleware';

@Module({
  controllers: [AppController],
  imports: [
    QuizModule,
    TypeOrmModule.forRoot({
      // ...dataSourceOptions,
      type: 'mysql',
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'akshay',
      password: process.env.DB_PASSWORD || 'E1719prbu',
      database: process.env.DB_NAME || 'dummy',
      entities: [Quiz, Question, Option, User],
      synchronize: true,
      // migrations: ['dist/db/migrations/*.js'],
    }),
    QuestionModule,
    OptionModule,
    UserModule,
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiTokenMiddleware).forRoutes('*');
  }
}
