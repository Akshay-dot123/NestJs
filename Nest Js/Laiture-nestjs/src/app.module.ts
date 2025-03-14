import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './Entities/Client';
import { Banker } from './Entities/Banker';
import { ClientController } from './client/client.controller';
import { ClientService } from './client/client.service';
import { ClientModule } from './client/client.module';
import { BankerController } from './banker/banker.controller';
import { Transactions } from './Entities/Transaction';

@Module({
  controllers: [AppController, ClientController, BankerController],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'akshay',
      password: process.env.DB_PASSWORD || 'E1719prbu',
      database: process.env.DB_NAME || 'uk',
      entities: [Client, Banker, Transactions],
      synchronize: true,
      // logging: true,
    }),
    ClientModule,
  ],
  providers: [ClientService],
})
export class AppModule {}
