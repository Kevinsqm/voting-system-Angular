import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const isAdminGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getUserInfo().roles.includes("ROLE_ADMIN"))
    return true;

  console.log("Access denied: User is not an admin");
  return router.createUrlTree(['/access-denied']);
};
