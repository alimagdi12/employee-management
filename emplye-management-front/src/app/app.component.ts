import { Component, HostListener, Inject, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import ar from '../../public/i18n/ar.json';
import en from '../../public/i18n/en.json';
import { SharedService } from './shared/shared.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslatePipe, MatProgressSpinnerModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private translate = inject(TranslateService);
  private sharedService = inject(SharedService);

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    this.sharedService.screenWidth = window.innerWidth;

    this.translate.setTranslation('en', en);
    this.translate.setTranslation('ar', ar);
    this.translate.setDefaultLang('ar');

    const lang = localStorage.getItem('lang');

    if (lang) {
      this.translate.use(lang);
    } else {
      this.translate.use('ar');
      localStorage.setItem('lang', 'ar');
    }

    this.document.dir = this.translate.currentLang === 'ar' ? 'rtl' : 'ltr';
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.sharedService.screenWidth = window.innerWidth;
  }
}
