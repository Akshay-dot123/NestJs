import {
  Controller,
  Get,
  Param,
  Res,
  NotFoundException,
  Header,
  UseGuards,
  Req,
  Query,
  ForbiddenException,
} from '@nestjs/common';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import * as crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { GqlJwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Context } from '@nestjs/graphql';
const SECRET = process.env.SIGNED_URL_SECRET || 'your-very-secure-secret';

@Controller('files')
export class FileController {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  @UseGuards(GqlJwtAuthGuard)
  // @Get('download/:fileId')
  // async downloadFile(
  //   @Param('fileId') fileId: string,
  //   @Res() res: Response,
  //   @Context() context: any,
  // ): Promise<void> {
  //   const userRole = context.req.user;
  //   console.log('Finding File By ID:', userRole);

  //   const file = await this.fileRepository.findOne({
  //     where: {
  //       fileId: fileId,
  //       userId: userRole.id,
  //     },
  //   });
  //   // const file = await this.fileRepository.findOneBy({ fileId });

  //   if (!file) throw new NotFoundException('File not found');

  //   const savedFilename = `${file.fileId}-${file.filename}`;
  //   const filePath = join(
  //     process.cwd(),
  //     'uploads',
  //     String(file.userId),
  //     savedFilename,
  //   );
  //   console.log(filePath);

  //   if (!existsSync(filePath)) {
  //     throw new NotFoundException('File is missing on disk');
  //   }

  //   res.setHeader('Content-Type', file.mimetype);
  //   res.setHeader(
  //     'Content-Disposition',
  //     `attachment; filename="${file.filename}"`,
  //   );

  //   const fileStream = createReadStream(filePath);
  //   fileStream.pipe(res);
  // }

  // New code
  @Get('/download/:fileId')
  async downloadFile(
    @Param('fileId') fileId: string,
    @Query('expires') expires: string,
    @Query('signature') signature: string,
    @Res() res: Response,
  ) {
    const expiresAt = parseInt(expires, 10);
    const now = Math.floor(Date.now() / 1000);

    // Step 1: Check expiration
    if (now > expiresAt) {
      throw new ForbiddenException('Download link has expired');
    }

    // Step 2: Recreate signature
    const payload = `${fileId}:${expiresAt}`;
    const expectedSignature = crypto
      .createHmac('sha256', SECRET)
      .update(payload)
      .digest('hex');

    // Step 3: Verify signature
    if (expectedSignature !== signature) {
      throw new ForbiddenException('Invalid signature');
    }

    // Step 4: Find and send the file
    const file = await this.fileRepository.findOneBy({ fileId });
    if (!file) {
      throw new NotFoundException('File not found');
    }

    const savedFilename = `${file.fileId}-${file.filename}`;
    const filePath = join(
      process.cwd(),
      'uploads',
      String(file.userId),
      savedFilename,
    );
    console.log(filePath);
    return res.download(filePath, file.fileId);
  }
}
