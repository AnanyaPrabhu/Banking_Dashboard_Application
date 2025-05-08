import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { MessageModule } from 'primeng/message'; 
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    ButtonModule,
    InputTextModule,
    LoginRoutingModule, 
    MessageModule,
    CardModule,
    MessagesModule
  ]
})
export class LoginModule {}








// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { CommonModule } from '@angular/common';

// const routes: Routes = [
//   {
//     path: '',
//     loadComponent: () => import('./login.component').then(m => m.LoginComponent) 
//   }
// ];

// @NgModule({
//   imports: [CommonModule, RouterModule.forChild(routes)],
// })
// export class LoginModule {}
