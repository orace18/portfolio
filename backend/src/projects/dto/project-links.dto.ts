import { IsOptional, IsString } from 'class-validator';

export class ProjectLinksDto {
  @IsOptional()
  @IsString()
  playStore?: string;

  @IsOptional()
  @IsString()
  github?: string;

  @IsOptional()
  @IsString()
  live?: string;
}
