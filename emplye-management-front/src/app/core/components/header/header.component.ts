import { Component, inject, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedService } from '../../../shared/shared.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../shared/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatMenuModule,
    CommonModule,
    TranslateModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public translate = inject(TranslateService);
  public sharedService = inject(SharedService);
  public router = inject(Router);
  public authService = inject(AuthService);
  selectedLanguage = 'ar';
  isHome: boolean = true;
  isLoading = false;
  userMenuItems = [
    { label: 'header.profile', icon: 'account_circle', action: 'profile' },
    { label: 'header.logout', icon: 'logout', action: 'logout' }
  ];

  ngOnInit(): void {
    this.checkAuthState();
  }

  checkAuthState() {
    if (this.authService.isAuthenticated()) {
      this.isLoading = true;
      this.authService.getCurrentUser().subscribe({
        next: (user) => {
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }
  }

  updateLang(lang: 'ar' | 'en') {
    localStorage.setItem('lang', lang);
    location.reload();
  }

  navigateHome() {
    this.router.navigate(['/']);
  }

  handleUserAction(action: string) {
    if (action === 'logout') {
      this.authService.logout();
    } else if (action === 'profile') {
      this.router.navigate(['/profile']);
    }
  }
}
