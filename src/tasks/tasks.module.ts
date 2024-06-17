// src/tasks/tasks.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task, TaskSchema } from './task.schema';
import { FoldersModule } from '../folders/folders.module';
import { FoldersService } from '../folders/folders.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    FoldersModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, FoldersService],
  exports: [TasksService],
})
export class TasksModule {}
