import { environment } from '../../../environments/environment';

export function coverImageUrl(coverImage: string): string {
  return coverImage ? `${environment.apiUrl}/files/${coverImage}` : '';
}
