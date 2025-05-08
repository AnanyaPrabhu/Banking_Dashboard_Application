import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.authService.isAuthenticated = false;
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]]
    });
  }

  get isUsernameRequired() {
    return this.loginForm.controls['username'].errors?.['required'] && this.loginForm.controls['username'].touched;
  }

  get isUsernameInvalid() {
    return this.loginForm.controls['username'].errors?.['pattern'] && this.loginForm.controls['username'].touched;
  }

  get isPasswordRequired() {
    return this.loginForm.controls['password'].errors?.['required'] && this.loginForm.controls['password'].touched;
  }

  get isPasswordInvalid() {
    return this.loginForm.controls['password'].errors?.['pattern'] && this.loginForm.controls['password'].touched;
  }

  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (this.authService.login(username, password)) {
        this.router.navigate(['/pages/dashboard']);
      } else {
        alert('Invalid credentials');
      }
    }
  }
  ngOnInit() {
    document.body.style.backgroundColor = '#0591a43e';
  }
  
}








