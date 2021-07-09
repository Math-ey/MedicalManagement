import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guard/auth.guard';
import { CoreComponent } from './modules/core.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: CoreComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'department',
        loadChildren: () =>
          import('./modules/department/department.module').then(
            m => m.DepartmentModule
          )
      },
      {
        path: 'employee',
        loadChildren: () =>
          import('./modules/employee/employee.module').then(
            m => m.EmployeeModule
          )
      },
      {
        path: 'treatment',
        loadChildren: () =>
          import('./modules/treatment/treatment.module').then(
            m => m.TreatmentModule
          )
      }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
