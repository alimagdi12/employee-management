import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../../shared/services/auth.service';
import { ForgotPasswordDto } from '../../../../core/models/forget-password.dto';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.loading = true;
    const forgotPasswordDto: ForgotPasswordDto = this.forgotPasswordForm.value;

    this.authService.forgotPassword(forgotPasswordDto).subscribe(
      () => {
        this.snackBar.open('Reset link sent to your email', 'Close', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
        this.loading = false;
      },
      error => {
        this.snackBar.open(error.error?.message || 'Failed to send reset link', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.loading = false;
      }
    );
  }
}
