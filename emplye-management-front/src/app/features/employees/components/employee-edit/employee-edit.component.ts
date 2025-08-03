import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../../shared/services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateEmployeeDto } from '../../../../core/models/update-employee.dto';
import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { DropdownOption } from '../../../../core/models/dropdown-option.model';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private employeeService: EmployeeService = inject(EmployeeService);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private translate: TranslateService = inject(TranslateService);
  public router: Router = inject(Router);

  employeeForm!: FormGroup;
  loading = false;
  employeeId: string;
  currentLanguage: string;

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

  constructor() {
    this.employeeId = this.route.snapshot.params['id'];
    this.currentLanguage = this.translate.currentLang;
  }

  ngOnInit(): void {
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

    this.loadEmployee();
  }

  getDisplayText(option: DropdownOption): string {
    return this.currentLanguage === 'ar' ? option.ar : option.en;
  }

  getValueForCurrentLanguage(option: DropdownOption): string {
    return this.currentLanguage === 'ar' ? option.valueAr : option.valueEn;
  }

  findOptionByValue(value: string): DropdownOption | undefined {
    const allOptions = [...this.jobOptions, ...this.maritalStatusOptions, ...this.religionOptions];
    return allOptions.find(opt => opt.valueEn === value || opt.valueAr === value);
  }

  loadEmployee(): void {
    this.loading = true;
    this.employeeService.getById(this.employeeId).subscribe({
      next: (employee) => {
        // Convert backend values to display values
        const jobOption = this.jobOptions.find(opt => opt.valueEn === employee.job || opt.valueAr === employee.job);
        const maritalStatusOption = this.maritalStatusOptions.find(opt => opt.valueEn === employee.maritalStatus || opt.valueAr === employee.maritalStatus);
        const religionOption = this.religionOptions.find(opt => opt.valueEn === employee.religion || opt.valueAr === employee.religion);

        const displayValues = {
          ...employee,
          job: jobOption ? this.getValueForCurrentLanguage(jobOption) : employee.job,
          maritalStatus: maritalStatusOption ? this.getValueForCurrentLanguage(maritalStatusOption) : employee.maritalStatus,
          religion: religionOption ? this.getValueForCurrentLanguage(religionOption) : employee.religion,
          birthdate: employee.birthdate ? new Date(employee.birthdate) : null,
          appointmentDate: employee.appointmentDate ? new Date(employee.appointmentDate) : null,
          workReceiptDate: employee.workReceiptDate ? new Date(employee.workReceiptDate) : null,
          schoolEntryDate: employee.schoolEntryDate ? new Date(employee.schoolEntryDate) : null,
          currentDegreeDate: employee.currentDegreeDate ? new Date(employee.currentDegreeDate) : null
        };

        this.employeeForm.patchValue(displayValues);
        this.loading = false;
      },
      error: (error) => {
        this.snackBar.open(
          this.currentLanguage === 'ar' ? 'فشل تحميل بيانات الموظف' : 'Failed to load employee',
          'Close',
          { duration: 5000, panelClass: ['error-snackbar'] }
        );
        this.router.navigate(['/employees']);
      }
    });
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
    const employeeData: UpdateEmployeeDto = {
      ...formValue,
      job: selectedJob ? selectedJob.valueEn : formValue.job,
      maritalStatus: selectedMaritalStatus ? selectedMaritalStatus.valueEn : formValue.maritalStatus,
      religion: selectedReligion ? selectedReligion.valueEn : formValue.religion,
      birthdate: moment(formValue.birthdate).toISOString(),
      appointmentDate: moment(formValue.appointmentDate).toISOString(),
      workReceiptDate: moment(formValue.workReceiptDate).toISOString(),
      schoolEntryDate: formValue.schoolEntryDate ? moment(formValue.schoolEntryDate).toISOString() : undefined,
      currentDegreeDate: formValue.currentDegreeDate ? moment(formValue.currentDegreeDate).toISOString() : undefined
    };

    this.employeeService.update(this.employeeId, employeeData).subscribe({
      next: () => {
        this.snackBar.open(
          this.currentLanguage === 'ar' ? 'تم تحديث بيانات الموظف بنجاح' : 'Employee updated successfully',
          'Close',
          { duration: 5000, panelClass: ['success-snackbar'] }
        );
        this.router.navigate(['/employees']);
      },
      error: (error) => {
        this.snackBar.open(
          error.error?.message || (this.currentLanguage === 'ar' ? 'فشل تحديث بيانات الموظف' : 'Failed to update employee'),
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
