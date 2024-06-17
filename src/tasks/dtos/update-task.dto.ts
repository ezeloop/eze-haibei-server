import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsBoolean()
  @IsOptional()
  readonly completed?: boolean;

  @IsString()
  @IsOptional()
  readonly folderId?: string;
}
