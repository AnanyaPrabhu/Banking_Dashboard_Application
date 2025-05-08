import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';





export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const isLoggedIn = authService.isLoggedIn();

  console.log("Auth Guard Triggered: User logged in?", isLoggedIn);

  if (!isLoggedIn) {
    console.log("Redirecting to login...");

    // Redirect & prevent forward navigation after logout
    router.navigate(['/login']);

    return false;
  }
  return true;
};