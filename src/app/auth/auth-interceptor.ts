import { A } from '@angular/cdk/keycodes';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth-service';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }
  return next(req).pipe(catchError(err => {
    if (err.status === 401) {
      router.navigate(['login']);
    } 
    return throwError(() => err);
  }));
};
