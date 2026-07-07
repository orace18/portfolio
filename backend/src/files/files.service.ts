import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Types, mongo } from 'mongoose';

export const MAX_COVER_IMAGE_BYTES = 2 * 1024 * 1024;
export const ALLOWED_COVER_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

@Injectable()
export class FilesService {
  private readonly bucket: mongo.GridFSBucket;

  constructor(@InjectConnection() connection: Connection) {
    if (!connection.db) {
      throw new Error('Connexion MongoDB non initialisée.');
    }
    this.bucket = new mongo.GridFSBucket(connection.db, { bucketName: 'covers' });
  }

  uploadCoverImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = this.bucket.openUploadStream(file.originalname, {
        contentType: file.mimetype,
      });
      uploadStream.end(file.buffer);
      uploadStream.on('finish', () => resolve(uploadStream.id.toString()));
      uploadStream.on('error', reject);
    });
  }

  openDownloadStream(id: string): mongo.GridFSBucketReadStream {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Image introuvable.');
    }
    return this.bucket.openDownloadStream(new Types.ObjectId(id));
  }
}
