import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DepartmentListComponent } from './page/department-list/department-list.component';
import { DepartmentRoutingModule } from './department-routing.module';

@NgModule({
  imports: [CommonModule, DepartmentRoutingModule],
  declarations: [DepartmentListComponent]
})
export class DepartmentModule {}
