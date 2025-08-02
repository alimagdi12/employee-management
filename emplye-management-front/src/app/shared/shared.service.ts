import { inject, Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private router = inject(Router);
  private translate = inject(TranslateService);
  private isAirportLoadingSubject = new BehaviorSubject<boolean>(false);

  public screenWidth = 0;
  public webViewBreakPoint = 1080;

  navigateTo(segments: string[], extras?: NavigationExtras) {
    this.router.navigate(segments, extras);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  isSegmentPresent(segments: string[]): boolean {
    for (let i = 0; i < segments.length; i++) {
      if (this.router.url.includes(segments[i])) {
        return true;
      }
    }
    return false;
  }

  get lang(): 'en' | 'ar' {
    return this.translate.currentLang as 'en' | 'ar';
  }
}
