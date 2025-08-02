// src/app/shared/guards/not-auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const notAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('currentUser');

  if (token) {
    router.navigate(['/employees']);
    return false;
  } else {
    return true;
  }
};
