import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const isAdminOrCandidateGuard: CanMatchFn = (route, segments) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getRole() === "ADMIN" || authService.getRole() === "CANDIDATE")
    return true;

  return router.createUrlTree(["/access-denied"]);

};
