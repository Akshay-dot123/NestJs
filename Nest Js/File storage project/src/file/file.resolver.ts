// import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
// import { createWriteStream, existsSync, mkdirSync } from 'fs';
// import * as GraphQLUpload from 'graphql-upload/public/GraphQLUpload.js';
// import * as Upload from 'graphql-upload/public/Upload.js';
// import { join } from 'path';

// @Resolver()
// export class FileResolver {
//   @Query(() => String)
//   async getName(): Promise<string> {
//     return 'Coding by Anas';
//   }

//   // For multiple file:-
//   @Mutation(() => Boolean, { name: 'uploadImages' })
//   async uploadImages(
//     @Args({ name: 'images', type: () => [GraphQLUpload] }) images: Upload[],
//     @Args({ name: 'createFileInDirectory', type: () => Boolean })
//     createFileInDirectory: boolean,
//   ) {
//     const files = await Promise.all(images);

//     console.log('UPLOAD_IMAGES_CALLED', {
//       files,
//       createFileInDirectory,
//     });

//     await Promise.all(
//       files.map((file) => {
//         return new Promise((resolve, reject) => {
//           if (createFileInDirectory) {
//             const dirPath = join(__dirname, '/uploads');
//             if (!existsSync(dirPath)) {
//               mkdirSync(dirPath, { recursive: true });
//             }
//             file
//               .createReadStream()
//               .pipe(createWriteStream(`${dirPath}/${file.filename}`))
//               .on('finish', () => {
//                 console.log(`${file.filename} saved`);
//                 resolve(true);
//               })
//               .on('error', (error) => {
//                 console.log(`${file.filename} error`, error);
//                 reject(false);
//               });
//           } else {
//             file
//               .createReadStream()
//               .on('data', (data) => console.log('DATA:', data))
//               .on('end', resolve)
//               .on('error', reject);
//           }
//         });
//       }),
//     );
//     return true;
//   }
// }

import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/public/GraphQLUpload.js';
import * as Upload from 'graphql-upload/public/Upload.js';
import { FileService } from './file.service';
import { BadRequestException, NotFoundException, UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { File } from './entities/file.entity';
import { generateSignedUrl } from 'src/utils/signed-url.util';

@Resolver(() => File)
export class FileResolver {
  constructor(private readonly FileService: FileService) {}

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => String, { name: 'findFileId' })
  async findOne(@Args('fileId') fileId: string, @Context() context: any) {
    const userRole = context.req.user;
    console.log('Finding File By Id:', userRole);
    const file = await this.FileService.findFileByIdForAdmin(userRole, fileId);
    if (!file) {
      throw new NotFoundException('File not found');
    }
    const signedUrl = generateSignedUrl(fileId, 60 * 5); // 5 minutes
    return signedUrl;
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => [File], { name: 'findAllFiles' })
  findAll(@Context() context: any) {
    const userRole = context.req.user;
    console.log('Finding all user Files:', userRole);
    return this.FileService.findAll(userRole);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => String)
  async getDownloadLink(
    @Args('fileId') fileId: string,
    @Context() context: any,
  ) {
    const userRole = context.req.user;
    const file = await this.FileService.findone(userRole, fileId);
    if (!file) {
      throw new NotFoundException('File not found');
    }
    const signedUrl = generateSignedUrl(fileId, 60 * 5); // 5 minutes
    return signedUrl;
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Boolean, { name: 'uploadImages' })
  async uploadImages(
    @Args({ name: 'images', type: () => [GraphQLUpload] }) images: Upload[],
    @Args({ name: 'createFileInDirectory', type: () => Boolean })
    createFileInDirectory: boolean,
    @Context() context: any,
  ): Promise<boolean> {
    const creatorRole = context.req.user;
    console.log('User Creating the File:', creatorRole);
    const files = await Promise.all(images);
    console.log('UPLOAD_IMAGES_CALLED', {
      files,
      createFileInDirectory,
    });

    return this.FileService.handleFileUpload(
      files,
      createFileInDirectory,
      creatorRole,
    );
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => String)
  deleteFile(@Args('fileId') id: string, @Context() context: any) {
    const userRole = context.req.user;
    console.log('User Deleting File:', userRole);
    return this.FileService.remove(id, userRole);
  }
}
