import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeDetailComponent } from './page/employee-detail/employee-detail.component';
import { EmployeeListComponent } from './page/employee-list/employee-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeEducationTabComponent } from './page/employee-detail/employee-education-tab/employee-education-tab.component';
import { EmployeeWorkTabComponent } from './page/employee-detail/employee-work-tab/employee-work-tab.component';
import { EmployeePersonalTabComponent } from './page/employee-detail/employee-personal-tab/employee-personal-tab.component';

@NgModule({
  imports: [
    EmployeeRoutingModule,
    SharedModule
  ],
  declarations: [
    EmployeeListComponent,
    EmployeeDetailComponent,
    EmployeeEducationTabComponent,
    EmployeeWorkTabComponent,
    EmployeePersonalTabComponent
  ]
})
export class EmployeeModule { }
