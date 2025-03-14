import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersController } from './customers/controllers/customers/customers.controller';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CustomersModule,
    UsersModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'akshay',
      password: process.env.DB_PASSWORD || 'E1719prbu',
      database: process.env.DB_NAME || 'uk',
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController, CustomersController],
  providers: [AppService],
})
export class AppModule {}
