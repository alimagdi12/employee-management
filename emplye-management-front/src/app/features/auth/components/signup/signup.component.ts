import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../../shared/services/auth.service';
import { SignupDto } from '../../../../core/models/signup.dto';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder)
  private authService: AuthService = inject(AuthService)
  private router: Router = inject(Router)
  private snackBar: MatSnackBar = inject(MatSnackBar)
  signupForm!: FormGroup;
  loading = false;

  constructor(
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
      ]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;
    const signupDto: SignupDto = this.signupForm.value;

    this.authService.signup(signupDto).subscribe(
      () => {
        this.snackBar.open('Account created successfully!', 'Close', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/']);
      },
      error => {
        this.snackBar.open(error.error?.message || 'Signup failed', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
}
