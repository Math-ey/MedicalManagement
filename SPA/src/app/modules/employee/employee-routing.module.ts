import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeListComponent } from './page/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './page/employee-detail/employee-detail.component';
import { EmployeeExistsGuard } from '@core/guard/employee-exists.guard';

const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent
  },
  {
    path: ':id',
    canActivate: [EmployeeExistsGuard],
    component: EmployeeDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
