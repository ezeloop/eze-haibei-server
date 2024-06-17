// src/folders/folders.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dtos/create-folder.dto';
import { Folder } from './folder.schema';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  create(@Body() createFolderDto: CreateFolderDto): Promise<Folder> {
    return this.foldersService.create(createFolderDto);
  }

  @Get()
  findAll(): Promise<Folder[]> {
    return this.foldersService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Folder> {
    return this.foldersService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFolderDto: CreateFolderDto): Promise<Folder> {
    return this.foldersService.update(id, updateFolderDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Folder> {
    return this.foldersService.delete(id);
  }
}
