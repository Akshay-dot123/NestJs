/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import * as Upload from 'graphql-upload/public/Upload.js';
import { createWriteStream, existsSync, mkdirSync, unlink } from 'fs';
import { join } from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  // Direct access
  // async findone(userRole: any, fileId: string) {
  //   const file = await this.fileRepository.findOne({
  //     where: {
  //       fileId: fileId,
  //       userId: userRole.id,
  //     },
  //   });
  //   console.log('file==========>', file);
  //   if (!file) {
  //     throw new BadRequestException(
  //       'File not found or not authorized to see this file',
  //     );
  //   }
  //   const savedFilename = `${file.fileId}-${file.filename}`;
  //   const filePath = join(
  //     process.cwd(),
  //     'uploads',
  //     String(file.userId),
  //     savedFilename
  //   );
  //   console.log(filePath)
  //   if (!existsSync(filePath)) {
  //     throw new BadRequestException('File is missing from storage');
  //   }
  //   return {
  //     ...file,
  //     filePath:filePath,
  //   };
  // }

  // SignedURL access
  async findone(userRole: any, fileId: string) {
    const file = await this.fileRepository.findOne({
      where: {
        fileId: fileId,
        userId: userRole.id,
      },
    });
    console.log('file==========>', file);
    return file;
  }

  async findFileByIdForAdmin(userRole: any, fileId: string) {
    if (userRole.role != 'ADMIN') {
      throw new ForbiddenException('Only admin has access to view others file');
    }
    const file = await this.fileRepository.findOne({
      where: {
        fileId: fileId,
      },
    });
    console.log('file==========>', file);
    return file;
  }

  async findAll(userRole: any) {
    return this.fileRepository.find({ where: { userId: userRole.id } });
  }

  private allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'video/mp4',
  ];

  async handleFileUpload(
    files: Upload[],
    createFileInDirectory: boolean,
    creatorRole: any,
  ): Promise<boolean> {
    // try {
    await Promise.all(
      files.map(async (file) => {
        if (!this.allowedMimeTypes.includes(file.mimetype)) {
          throw new BadRequestException(
            `${file.filename} has invalid mimetype: ${file.mimetype}`,
          );
        }
        const userId = creatorRole.id;
        const existing = await this.fileRepository.findOne({
          where: { filename: file.filename, userId },
        });

        if (existing) {
          throw new ConflictException('FileName already exists for User');
        }

        const fileId = uuidv4();
        const dirPath = join(process.cwd(), 'uploads', String(userId));

        if (createFileInDirectory && !existsSync(dirPath)) {
          mkdirSync(dirPath, { recursive: true });
        }

        const filePath = join(dirPath, `${fileId}-${file.filename}`);
        const writeStream = createWriteStream(filePath);

        let fileSize = 0;

        return new Promise((resolve, reject) => {
          file
            .createReadStream()
            .on('data', (chunk) => {
              fileSize += chunk.length;
            })
            .pipe(writeStream)
            .on('finish', async () => {
              const fileRecord = this.fileRepository.create({
                fileId,
                filename: file.filename,
                mimetype: file.mimetype,
                encoding: file.encoding,
                size: fileSize,
                userId,
              });

              await this.fileRepository.save(fileRecord);
              console.log(`Saved: ${fileRecord.filename} (${fileSize} bytes)`);
              resolve(true);
            })
            .on('error', (error) => {
              console.error(`${file.filename} error`, error);
              reject(error);
            });
        });
      }),
    );
    return true;
    // } catch (error) {
    //   console.error('Error in handleFileUpload:', error);
    //   throw error;
    // }
  }

  // New code
  // async handleFileUpload(
  //   files: Upload | Upload[],
  //   createFileInDirectory: boolean,
  //   creatorRole: any,
  // ): Promise<boolean> {
  //   // Convert single file to array for uniform processing
  //   const filesArray = Array.isArray(files) ? files : [files];

  //   // Process each file
  //   await Promise.all(
  //     filesArray.map(async (file) => {
  //       await this.processSingleFile(file, createFileInDirectory, creatorRole);
  //     }),
  //   );

  //   return true;
  // }

  private async processSingleFile(
    file: Upload,
    createFileInDirectory: boolean,
    creatorRole: any,
  ): Promise<void> {
    // Validate MIME type
    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `${file.filename} has invalid mimetype: ${file.mimetype}`,
      );
    }

    // Check for existing file
    const userId = creatorRole.id;
    const existing = await this.fileRepository.findOne({
      where: { filename: file.filename, userId },
    });

    if (existing) {
      throw new ConflictException('FileName already exists for User');
    }

    // Prepare file storage
    const fileId = uuidv4();
    const dirPath = join(process.cwd(), 'uploads', String(userId));

    if (createFileInDirectory && !existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    }

    const filePath = join(dirPath, `${fileId}-${file.filename}`);

    // Process file stream
    return new Promise((resolve, reject) => {
      const writeStream = createWriteStream(filePath);
      let fileSize = 0;

      file
        .createReadStream()
        .on('data', (chunk) => {
          fileSize += chunk.length;
        })
        .pipe(writeStream)
        .on('finish', async () => {
          // Save file record to database
          const fileRecord = this.fileRepository.create({
            fileId,
            filename: file.filename,
            mimetype: file.mimetype,
            encoding: file.encoding,
            size: fileSize,
            userId,
          });

          await this.fileRepository.save(fileRecord);
          console.log(`Saved: ${fileRecord.filename} (${fileSize} bytes)`);
          resolve();
        })
        .on('error', (error) => {
          console.error(`${file.filename} error`, error);
          reject(error);
        });
    });
  }

  async remove(fileId: string, userRole: any) {
    let file;
    if (userRole.role === 'ADMIN') {
      file = await this.fileRepository.findOne({
        where: { fileId },
      });
    } else {
      file = await this.fileRepository.findOne({
        where: { fileId, userId: userRole.id },
      });
    }
    console.log('file==========>', file);
    if (!file) {
      throw new NotFoundException('File not found');
    }
    const dirPath = join(process.cwd(), 'uploads', String(file.userId));
    const filePath = join(dirPath, `${fileId}-${file.filename}`);

    await new Promise<void>((resolve, reject) => {
      unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file ${filePath}`, err);
          reject(new Error('Error deleting file from disk'));
        } else {
          resolve();
        }
      });
    });
    await this.fileRepository.remove(file);
    console.log(`File with ID ${fileId} has been successfully deleted`);
    return true;
  }
}
