import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { ProjectLinksDto } from './project-links.dto';

export class CreateProjectDto {
  @IsString()
  title!: string;

  @IsString()
  slug!: string;

  @IsString()
  @MaxLength(200)
  shortDescription!: string;

  @IsString()
  longDescription!: string;

  @IsArray()
  @IsString({ each: true })
  stack!: string[];

  @ValidateNested()
  @Type(() => ProjectLinksDto)
  links!: ProjectLinksDto;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsBoolean()
  visible!: boolean;

  @IsOptional()
  @IsInt()
  order?: number;
}
