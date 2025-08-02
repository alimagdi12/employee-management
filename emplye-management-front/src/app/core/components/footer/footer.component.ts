import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../../../shared/shared.service';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  public translate = inject(TranslateService);
  public sharedService = inject(SharedService);
}
