import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ALLOWED_COVER_IMAGE_TYPES, FilesService, MAX_COVER_IMAGE_BYTES } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: MAX_COVER_IMAGE_BYTES } }))
  async upload(@UploadedFile() file?: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Aucun fichier reçu.');
    }
    if (!ALLOWED_COVER_IMAGE_TYPES.includes(file.mimetype)) {
      throw new BadRequestException("Format d'image non supporté (JPEG, PNG ou WebP uniquement).");
    }

    const id = await this.filesService.uploadCoverImage(file);
    return { id };
  }

  @Get(':id')
  async download(@Param('id') id: string, @Res() res: Response) {
    const stream = this.filesService.openDownloadStream(id);
    stream.on('error', () => res.status(404).end());
    stream.pipe(res);
  }
}
