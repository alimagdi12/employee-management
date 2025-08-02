import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { authGuard } from '../../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent,
    canActivate: [authGuard],
    data: { title: 'Employees List' }
  },
  {
    path: 'add',
    component: EmployeeAddComponent,
    canActivate: [authGuard],
    data: { title: 'Add Employee' }
  },
  {
    path: 'edit/:id',
    component: EmployeeEditComponent,
    canActivate: [authGuard],
    data: { title: 'Edit Employee' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
