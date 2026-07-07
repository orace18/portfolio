import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

export const MAX_COVER_IMAGE_BYTES = 2 * 1024 * 1024;
export const ALLOWED_COVER_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly http = inject(HttpClient);

  /** Envoie l'image au backend (GridFS) et retourne l'identifiant du fichier stocké. */
  async uploadCoverImage(file: File): Promise<string> {
    if (!ALLOWED_COVER_IMAGE_TYPES.includes(file.type)) {
      throw new Error("Format d'image non supporté (JPEG, PNG ou WebP uniquement).");
    }
    if (file.size > MAX_COVER_IMAGE_BYTES) {
      throw new Error("L'image dépasse la taille maximale autorisée (2 Mo).");
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await firstValueFrom(
      this.http.post<{ id: string }>(`${environment.apiUrl}/files`, formData)
    );
    return response.id;
  }
}
