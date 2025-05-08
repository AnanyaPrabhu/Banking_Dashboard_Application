import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // ✅ Ensures that the service is globally available
})
export class AuthService {
  public isAuthenticated = false; // By default is not logged in

  // Call this when the user logs in
  login(username: string, password: string){
    return this.isAuthenticated = true;
  }

  // Call this when the user logs out
  logout() {
    this.isAuthenticated = false;
  }

  // Check if user is authenticated
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
