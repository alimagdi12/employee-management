import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../core/env/environment';
import { User } from '../../core/models/user.model';
import { SignupDto } from '../../core/models/signup.dto';
import { LoginDto } from '../../core/models/login.dto';
import { ForgotPasswordDto } from '../../core/models/forget-password.dto';
import { ResetPasswordDto } from '../../core/models/reset-password.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loadCurrentUser();
  }

  private loadCurrentUser(): void {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      const user: User = JSON.parse(userJson);
      this.currentUserSubject.next(user);
      if (user.token) {
        this.getCurrentUser().subscribe();
      }
    }
  }

  signup(signupDto: SignupDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, signupDto).pipe(
      tap((response: any) => {
        if (response.user) {
          const user: User = response.user;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
      })
    );
  }

  login(loginDto: LoginDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginDto).pipe(
      tap((response: any) => {
        if (response.token && response.user) {
          const user: User = {
            ...response.user,
            token: response.token
          };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.getCurrentUser().subscribe();
        }
      })
    );
  }

  getCurrentUser(): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<User>(`${this.apiUrl}/user`, { headers }).pipe(
      tap((user: User) => {
        const currentUser: User = {
          ...user,
          token: this.token || undefined // Convert null to undefined if needed
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.currentUserSubject.next(currentUser);
      })
    );
  }

  forgotPassword(forgotPasswordDto: ForgotPasswordDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/forget-password`, forgotPasswordDto);
  }

  resetPassword(resetPasswordDto: ResetPasswordDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, resetPasswordDto);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  get token(): string | null {
    return this.currentUserValue?.token || null;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
}
