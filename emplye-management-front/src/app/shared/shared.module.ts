import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';

const AngularMaterialModules = [
  MatProgressSpinnerModule,
  MatIconModule,
  MatExpansionModule,
  MatTabsModule,
  MatSliderModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatOptionModule,
  MatInputModule,
  MatPaginatorModule,
  MatButtonModule,
  MatProgressBarModule,
  MatMenuModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatDialogModule,
  MatSortModule,
  MatTableModule,
];

// const SharedDirectives = [];

const SharedPipes = [];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...AngularMaterialModules, TranslateDirective, TranslatePipe,NgbDropdownModule,ReactiveFormsModule],
  exports: [...AngularMaterialModules, TranslateDirective, TranslatePipe,CommonModule,NgbDropdownModule,ReactiveFormsModule],
})
export class SharedModule {}
