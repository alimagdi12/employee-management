import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('./features/employees/employees.module').then((m) => m.EmployeesModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
