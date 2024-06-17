import { IsString, IsOptional } from 'class-validator';

export class UpdateFolderDto {
  @IsString()
  @IsOptional()
  readonly name?: string;
}
