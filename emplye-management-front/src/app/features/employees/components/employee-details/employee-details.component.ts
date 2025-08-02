import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../../../core/models/employee.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
  providers: [DatePipe]
})
export class EmployeeDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee },
    private datePipe: DatePipe
  ) {}

  formatDate(date: string | Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }
}
