// import { Option } from 'src/option/entity/option.entity';
// import { Question } from 'src/question/entity/question.entity';
// import { Quiz } from 'src/quiz/entity/quiz.entity';
// import { User } from 'src/user/entity/user.entity';
// import { DataSource, DataSourceOptions } from 'typeorm';

// export const dataSourceOptions: DataSourceOptions = {
//   type: 'mysql',
//   host: process.env.DB_HOST || '127.0.0.1',
//   port: Number(process.env.DB_PORT) || 3306,
//   username: process.env.DB_USERNAME || 'akshay',
//   password: process.env.DB_PASSWORD || 'E1719prbu',
//   database: process.env.DB_NAME || 'dummy',
//   entities: [Quiz, Question, Option, User],
//   migrations: ['dist/db/migrations/*.js'],
//   synchronize: false,
// };

// const dataSource = new DataSource(dataSourceOptions);
// export default dataSource;
