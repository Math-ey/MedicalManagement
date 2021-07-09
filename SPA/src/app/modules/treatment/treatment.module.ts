import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { TreatmentDetailComponent } from './page/treatment-detail/treatment-detail.component';
import { TreatmentListComponent } from './page/treatment-list/treatment-list.component';
import { TreatmentRoutingModule } from './treatment-routing.module';



@NgModule({
  declarations: [
    TreatmentListComponent,
    TreatmentDetailComponent
  ],
  imports: [
    TreatmentRoutingModule,
    SharedModule
  ]
})
export class TreatmentModule { }
