import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../../shared/services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreateEmployeeDto } from '../../../../core/models/create-employee.dto';
import moment from 'moment';
import { LanguageService } from '../../../../shared/services/language.service';
import { DropdownOption } from '../../../../core/models/dropdown-option.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {
  employeeForm!: FormGroup;
  loading = false;
  public router: Router = inject(Router);
  private fb: FormBuilder = inject(FormBuilder);
  private employeeService: EmployeeService = inject(EmployeeService);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private translate: TranslateService = inject(TranslateService);

  // Updated job options with separate values for each language
  jobOptions: DropdownOption[] = [
    { en: 'Manager', ar: 'مدير', valueEn: 'Manager', valueAr: 'مدير' },
    { en: 'Assistant Principal', ar: 'وكيل', valueEn: 'Assistant Principal', valueAr: 'وكيل' },
    { en: 'Assistant Teacher', ar: 'معلم مساعد', valueEn: 'Assistant Teacher', valueAr: 'معلم مساعد' },
    { en: 'Teacher A', ar: 'معلم أ', valueEn: 'Teacher A', valueAr: 'معلم أ' },
    { en: 'First Teacher A', ar: 'معلم اول أ', valueEn: 'First Teacher A', valueAr: 'معلم اول أ' },
    { en: 'Expert Teacher', ar: 'معلم خبير', valueEn: 'Expert Teacher', valueAr: 'معلم خبير' },
    { en: 'Head Teacher', ar: 'كبير معلمين', valueEn: 'Head Teacher', valueAr: 'كبير معلمين' },
    { en: 'School Janitor', ar: 'عامل', valueEn: 'School Janitor', valueAr: 'عامل' },
    { en: 'Admin', ar: 'اداري', valueEn: 'Admin', valueAr: 'اداري' }
  ];

  // Updated marital status options
  maritalStatusOptions: DropdownOption[] = [
    { en: 'Married', ar: 'متزوج', valueEn: 'Married', valueAr: 'متزوج' },
    { en: 'Single', ar: 'اعزب', valueEn: 'Single', valueAr: 'اعزب' },
    { en: 'Widowed', ar: 'ارمل', valueEn: 'Widowed', valueAr: 'ارمل' },
    { en: 'Divorced', ar: 'مطلق', valueEn: 'Divorced', valueAr: 'مطلق' }
  ];

  // Updated religion options
  religionOptions: DropdownOption[] = [
    { en: 'Muslim', ar: 'مسلم', valueEn: 'Muslim', valueAr: 'مسلم' },
    { en: 'Christian', ar: 'مسيحي', valueEn: 'Christian', valueAr: 'مسيحي' }
  ];

  currentLanguage!: string;

  constructor() {}

  ngOnInit(): void {
    this.currentLanguage = this.translate.currentLang;

    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      birthdate: ['', Validators.required],
      phone: [''],
      religion: [''],
      address: [''],
      job: [''],
      appointmentDate: ['', Validators.required],
      workReceiptDate: ['', Validators.required],
      schoolEntryDate: [''],
      currentDegree: [''],
      currentDegreeDate: [''],
      transferPlace: [''],
      insuranceNumber: ['']
    });
  }

  getDisplayText(option: DropdownOption): string {
    return this.currentLanguage === 'ar' ? option.ar : option.en;
  }

  getValueForCurrentLanguage(option: DropdownOption): string {
    return this.currentLanguage === 'ar' ? option.valueAr : option.valueEn;
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      return;
    }

    this.loading = true;
    const formValue = this.employeeForm.value;

    // Get the selected dropdown values in the current language
    const selectedJob = this.jobOptions.find(opt => opt.valueEn === formValue.job || opt.valueAr === formValue.job);
    const selectedMaritalStatus = this.maritalStatusOptions.find(opt => opt.valueEn === formValue.maritalStatus || opt.valueAr === formValue.maritalStatus);
    const selectedReligion = this.religionOptions.find(opt => opt.valueEn === formValue.religion || opt.valueAr === formValue.religion);

    // Format dates and prepare data for backend
    const employeeData: CreateEmployeeDto = {
      ...formValue,
      job: selectedJob ? this.getValueForCurrentLanguage(selectedJob) : '',
      maritalStatus: selectedMaritalStatus ? this.getValueForCurrentLanguage(selectedMaritalStatus) : '',
      religion: selectedReligion ? this.getValueForCurrentLanguage(selectedReligion) : '',
      birthdate: moment(formValue.birthdate).toISOString(),
      appointmentDate: moment(formValue.appointmentDate).toISOString(),
      workReceiptDate: moment(formValue.workReceiptDate).toISOString(),
      schoolEntryDate: formValue.schoolEntryDate ? moment(formValue.schoolEntryDate).toISOString() : undefined,
      currentDegreeDate: formValue.currentDegreeDate ? moment(formValue.currentDegreeDate).toISOString() : undefined
    };

    this.employeeService.create(employeeData).subscribe({
      next: () => {
        this.snackBar.open(
          this.currentLanguage === 'ar' ? 'تم إضافة الموظف بنجاح' : 'Employee added successfully',
          'Close',
          { duration: 5000, panelClass: ['success-snackbar'] }
        );
        this.router.navigate(['/employees']);
      },
      error: (error) => {
        this.snackBar.open(
          error.error?.message || (this.currentLanguage === 'ar' ? 'فشل إضافة الموظف' : 'Failed to add employee'),
          'Close',
          { duration: 5000, panelClass: ['error-snackbar'] }
        );
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
