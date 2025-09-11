import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const isAuthenticatedGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.verifyStatus().pipe(
    map(status => {
      if (status === "Authenticated") {
        console.log("User is authenticated");
        return true;
      }

      console.log("User is not authenticated");
      return router.createUrlTree(["/auth/login"])
    })
  );
};
