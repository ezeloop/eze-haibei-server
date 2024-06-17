// src/folders/folders.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { Folder, FolderSchema } from './folder.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Folder.name, schema: FolderSchema }])
  ],
  controllers: [FoldersController],
  providers: [FoldersService],
  exports: [FoldersService, MongooseModule],
})
export class FoldersModule {}
