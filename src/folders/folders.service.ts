// src/folders/folders.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Folder } from './folder.schema';
import { CreateFolderDto } from './dtos/create-folder.dto';
import { CastError } from 'mongoose/lib/error';
import { UpdateFolderDto } from './dtos/update-folder.dto';


@Injectable()
export class FoldersService {
  constructor(@InjectModel(Folder.name) private folderModel: Model<Folder>) {}

  async create(createFolderDto: CreateFolderDto): Promise<Folder> {
    const createdFolder = new this.folderModel(createFolderDto);
    return createdFolder.save();
  }

  async findAll(): Promise<Folder[]> {
    return this.folderModel.find().exec();
  }

  async findById(id: string): Promise<Folder> {
    return this.folderModel.findById(id).exec();
  }

  async update(id: string, updateFolderDto: UpdateFolderDto): Promise<Folder> {
    try {
      const folder = await this.folderModel.findByIdAndUpdate(id, updateFolderDto, { new: true }).exec();
      if (!folder) {
        throw new NotFoundException(`Folder with ID ${id} not found`);
      }
      return folder;
    } catch (error) {
      if (error instanceof CastError && error.path === '_id') {
        throw new BadRequestException(`Invalid ID format for ${error.value}`);
      }
      throw error;
    }
  }

  async delete(id: string): Promise<Folder> {
    try {
      const folder = await this.folderModel.findById(id).exec();
      if (!folder) {
        throw new NotFoundException(`Folder with ID ${id} not found`);
      }
      return this.folderModel.findByIdAndDelete(id).exec();
    } catch (error) {
      if (error instanceof CastError && error.path === '_id') {
        throw new BadRequestException(`Invalid ID format for ${error.value}`);
      }
      throw error;
    }
  }
}
