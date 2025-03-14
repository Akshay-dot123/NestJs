// import { DataSource } from 'typeorm';
// import { config } from 'dotenv';
// import { User } from 'src/user/entity/user.entity';
// import { Option } from 'src/option/entity/option.entity';
// import { Question } from 'src/question/entity/question.entity';
// import { Quiz } from 'src/quiz/entity/quiz.entity';
// config();

// export default new DataSource({
//   type: 'mysql',
//   host: process.env.DB_HOST || '127.0.0.1',
//   port: Number(process.env.DB_PORT) || 3306,
//   username: process.env.DB_USERNAME || 'akshay',
//   password: process.env.DB_PASSWORD || 'E1719prbu',
//   database: process.env.DB_NAME || 'dummy',
//   migrations: ['migrations/**'],
//   entities: [Quiz, Question, Option, User],
// });
