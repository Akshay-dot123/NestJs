import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ChatGateway } from './chat.gateway';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { RoomModule } from './room/room.module';
import { Room } from './room/entities/room.entity';
import { MessageModule } from './message/message.module';
import { Message } from './message/entities/message.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
      subscriptions: {
        'graphql-ws': true,
      },
      context: ({ req, res }) => ({ req, res }),
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'akshay',
      password: process.env.DB_PASSWORD || 'E1719prbu',
      database: process.env.DB_NAME || 'Prac Graphql Chat',
      charset: 'utf8mb4',
      entities: [User, Room, Message],
      synchronize: true,
    }),
    UserModule,
    RoomModule,
    AuthModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
