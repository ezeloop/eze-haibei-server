// src/tasks/tasks.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema';
import { CreateTaskDto } from './dtos/create-task.dto';
import { FoldersService } from '../folders/folders.service';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { CastError } from 'mongoose/lib/error';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>, 
      private foldersService: FoldersService,
) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const folderExists = await this.foldersService.findById(createTaskDto.folderId);
    if (!folderExists) {
      throw new NotFoundException(`Folder with ID ${createTaskDto.folderId} not found`);
    }
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findById(id: string): Promise<Task> {
    return this.taskModel.findById(id).exec();
  }

   async findByFolderId(folderId: string): Promise<Task[]> {
    return this.taskModel.find({ folderId }).exec();
  }

   async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      if (updateTaskDto.folderId) {
        const folderExists = await this.foldersService.findById(updateTaskDto.folderId);
        if (!folderExists) {
          throw new NotFoundException(`Folder with ID ${updateTaskDto.folderId} not found`);
        }
      }

      return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
    } catch (error) {
      if (error instanceof CastError && error.path === '_id') {
        throw new BadRequestException(`Invalid ID format for ${error.value}`);
      }
      throw error;
    }
  }


  async delete(id: string): Promise<Task> {
    try {
      const task = await this.taskModel.findById(id).exec();
      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      return this.taskModel.findByIdAndDelete(id).exec();
    } catch (error) {
      if (error instanceof CastError && error.path === '_id') {
        throw new BadRequestException(`Invalid ID format for ${error.value}`);
      }
      throw error;
    }
  }
}