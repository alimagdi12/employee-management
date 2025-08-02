// src/app/shared/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('currentUser');

  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
