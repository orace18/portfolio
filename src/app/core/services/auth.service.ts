import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

const TOKEN_KEY = 'portfolio_admin_token';
const EMAIL_KEY = 'portfolio_admin_email';

interface LoginResponse {
  accessToken: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  readonly currentUserEmail = signal<string | null>(localStorage.getItem(EMAIL_KEY));

  get token(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  async login(email: string, password: string): Promise<void> {
    const response = await firstValueFrom(
      this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, { email, password })
    );
    localStorage.setItem(TOKEN_KEY, response.accessToken);
    localStorage.setItem(EMAIL_KEY, response.email);
    this.currentUserEmail.set(response.email);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EMAIL_KEY);
    this.currentUserEmail.set(null);
  }
}
