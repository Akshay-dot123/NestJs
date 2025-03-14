// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Quiz } from './quiz/entity/quiz.entity';
// import { Question } from './question/entity/question.entity';
// import { Option } from './option/entity/option.entity';
// import { User } from './user/entity/user.entity';
// import { dataSourceOptions } from 'db/data-source'; // The same options you used in AppModule

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       ...dataSourceOptions, // This will reuse your TypeORM configuration from the `data-source.ts` file
//     }),
//     TypeOrmModule.forFeature([Quiz, Question, Option, User]),
//   ],
// })
// export class SeedingModule {}