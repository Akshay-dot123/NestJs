import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileResolver } from './file.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { User } from 'src/user/entities/user.entity';
import { FileController } from './file.controller';

@Module({
  providers: [FileResolver, FileService],
  controllers:[FileController],
  imports: [TypeOrmModule.forFeature([File, User])],
})
export class FileModule {}
