import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../../shared/services/auth.service';
import { ResetPasswordDto } from '../../../../core/models/reset-password.dto';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  loading = false;
  token: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.token = this.route.snapshot.queryParams['token'];
  }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      token: [this.token, Validators.required],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
      ]]
    });
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.loading = true;
    const resetPasswordDto: ResetPasswordDto = this.resetPasswordForm.value;

    this.authService.resetPassword(resetPasswordDto).subscribe(
      () => {
        this.snackBar.open('Password reset successfully', 'Close', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/auth/login']);
      },
      error => {
        this.snackBar.open(error.error?.message || 'Failed to reset password', 'Close', {
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
