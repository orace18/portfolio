import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';

const TOKEN_KEY = 'portfolio_admin_token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const isApiRequest = req.url.startsWith(environment.apiUrl);
  const token = localStorage.getItem(TOKEN_KEY);

  const request = isApiRequest && token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(request).pipe(
    catchError((error: unknown) => {
      if (isApiRequest && error instanceof HttpErrorResponse && error.status === 401) {
        authService.logout();
        router.navigate(['/admin/login']);
      }
      return throwError(() => error);
    })
  );
};
