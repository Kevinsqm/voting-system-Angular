import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const token = localStorage.getItem("token");
  const URLsOmitted = ["login", "register", "is-token-valid", "idCard"];

  if (token && !URLsOmitted.some(url => req.url.includes(url))) {
    const newReq = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${token}`)
    });
    return next(newReq);
  }
  return next(req);
};
