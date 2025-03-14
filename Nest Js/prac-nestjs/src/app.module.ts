import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DummyUsersModule } from './dummy-users/dummy-users.module';
import { QuizModule } from './quiz/quiz.module';
import { QuestionModule } from './question/question.module';
import { Quiz } from './quiz/entity/quiz.entity';
import { Question } from './question/entity/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionsModule } from './options/options.module';
import { Options } from './options/entity/options.entity';

@Module({
  imports: [
    DummyUsersModule,
    QuizModule,
    QuestionModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'akshay',
      password: process.env.DB_PASSWORD || 'E1719prbu',
      database: process.env.DB_NAME || 'dummy',
      entities: [Quiz, Question, Options],
      synchronize: true,
    }),
    OptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
