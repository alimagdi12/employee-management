import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../../../../shared/services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateEmployeeDto } from '../../../../core/models/update-employee.dto';
import moment from 'moment';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private employeeService: EmployeeService = inject(EmployeeService)
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private route: ActivatedRoute = inject(ActivatedRoute);
  public router: Router = inject(Router);
  employeeForm!: FormGroup;
  loading = false;
  employeeId: string;
  currentLanguage: string = 'en'; // Default to English, you should get this from a service

  // Dropdown options
  jobOptions = [
    { en: 'manager', ar: 'مدير' },
    { en: 'Assistant Principal', ar: 'وكيل' },
    { en: 'Assistant Teacher', ar: 'معلم مساعد' },
    { en: 'Teacher A', ar: 'معلم أ' },
    { en: 'First Teacher A', ar: 'معلم اول أ' },
    { en: 'Expert Teacher', ar: 'معلم خبير' },
    { en: 'Head Teacher', ar: 'كبير معلمين' },
    { en: 'School Janitor', ar: 'عامل' },
    { en: 'Admin', ar: 'اداري' }
  ];

  maritalStatusOptions = [
    { en: 'Married', ar: 'متزوج' },
    { en: 'Single', ar: 'اعزب' },
    { en: 'Widowed', ar: 'ارمل' },
    { en: 'Divorced', ar: 'مطلق' }
  ];

  religionOptions = [
    { en: 'Muslim', ar: 'مسلم' },
    { en: 'Christian', ar: 'مسيحي' }
  ];

  constructor() {
    this.employeeId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: [''],
      code: [''],
      maritalStatus: [''],
      birthdate: [''],
      phone: [''],
      religion: [''],
      address: [''],
      job: [''],
      appointmentDate: [''],
      workReceiptDate: [''],
      schoolEntryDate: [''],
      currentDegree: [''],
      currentDegreeDate: [''],
      transferPlace: [''],
      insuranceNumber: ['']
    });

    this.loadEmployee();
  }

  // Helper method to get display value based on current language
  getDisplayValue(option: any): string {
    return this.currentLanguage === 'ar' ? option.ar : option.en;
  }

  // Helper method to get the value to be sent to backend
  getBackendValue(displayValue: string): string {
    if (this.currentLanguage === 'ar') {
      const option = [...this.jobOptions, ...this.maritalStatusOptions, ...this.religionOptions]
        .find(opt => opt.ar === displayValue);
      return option ? option.en : displayValue;
    }
    return displayValue;
  }

  // Update the convertBackendToDisplay method to handle undefined values
  convertBackendToDisplay(value: string | undefined): string | undefined {
    if (!value) return value;

    const allOptions = [...this.jobOptions, ...this.maritalStatusOptions, ...this.religionOptions];
    const option = allOptions.find(opt => opt.en === value);
    return option ? (this.currentLanguage === 'ar' ? option.ar : option.en) : value;
  }

  // Update the loadEmployee method to handle possible undefined values
  loadEmployee(): void {
    this.loading = true;
    this.employeeService.getById(this.employeeId).subscribe({
      next: (employee) => {
        // Convert backend values to display values
        const displayValues = {
          ...employee,
          job: this.convertBackendToDisplay(employee.job),
          maritalStatus: this.convertBackendToDisplay(employee.maritalStatus),
          religion: this.convertBackendToDisplay(employee.religion),
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
        this.snackBar.open('Failed to load employee', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
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

    // Convert display values to backend values (always English)
    const backendValues = {
      ...formValue,
      job: this.getBackendValue(formValue.job),
      maritalStatus: this.getBackendValue(formValue.maritalStatus),
      religion: this.getBackendValue(formValue.religion),
      birthdate: formValue.birthdate ? moment(formValue.birthdate).toISOString() : undefined,
      appointmentDate: formValue.appointmentDate ? moment(formValue.appointmentDate).toISOString() : undefined,
      workReceiptDate: formValue.workReceiptDate ? moment(formValue.workReceiptDate).toISOString() : undefined,
      schoolEntryDate: formValue.schoolEntryDate ? moment(formValue.schoolEntryDate).toISOString() : undefined,
      currentDegreeDate: formValue.currentDegreeDate ? moment(formValue.currentDegreeDate).toISOString() : undefined
    };

    this.employeeService.update(this.employeeId, backendValues).subscribe({
      next: () => {
        this.snackBar.open('Employee updated successfully', 'Close', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/employees']);
      },
      error: (error) => {
        this.snackBar.open(error.error?.message || 'Failed to update employee', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
