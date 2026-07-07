import { Injectable, inject } from '@angular/core';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';

export const MAX_COVER_IMAGE_BYTES = 2 * 1024 * 1024;
export const ALLOWED_COVER_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly storage = inject(Storage);

  async uploadCoverImage(file: File, slug: string): Promise<string> {
    if (!ALLOWED_COVER_IMAGE_TYPES.includes(file.type)) {
      throw new Error("Format d'image non supporté (JPEG, PNG ou WebP uniquement).");
    }
    if (file.size > MAX_COVER_IMAGE_BYTES) {
      throw new Error("L'image dépasse la taille maximale autorisée (2 Mo).");
    }
    const extension = file.name.split('.').pop() ?? 'jpg';
    const path = `covers/${slug}-${Date.now()}.${extension}`;
    const storageRef = ref(this.storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref);
  }
}
