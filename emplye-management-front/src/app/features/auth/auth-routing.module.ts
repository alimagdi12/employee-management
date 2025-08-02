import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { notAuthGuard } from '../../shared/guards/not-auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [notAuthGuard],
    data: { title: 'Login' }
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [notAuthGuard],
    data: { title: 'Sign Up' }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [notAuthGuard],
    data: { title: 'Forgot Password' }
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [notAuthGuard],
    data: { title: 'Reset Password' }
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
