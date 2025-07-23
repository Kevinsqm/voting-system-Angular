import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const isAuthenticatedGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.verifyStatus() == "Authenticated")
    return true;

  return router.createUrlTree(['/auth/login']);
};
