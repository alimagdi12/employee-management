import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang = new BehaviorSubject<'en' | 'ar'>('en');
  currentLang$ = this.currentLang.asObservable();

  setLanguage(lang: 'en' | 'ar'): void {
    this.currentLang.next(lang);
    // You might want to save this preference to localStorage
  }

  getCurrentLanguage(): 'en' | 'ar' {
    return this.currentLang.value;
  }
}
