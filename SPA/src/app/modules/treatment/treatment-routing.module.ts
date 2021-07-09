import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreatmentExistsGuard } from '@core/guard/treatment-exists.guard';

import { TreatmentDetailComponent } from './page/treatment-detail/treatment-detail.component';
import { TreatmentListComponent } from './page/treatment-list/treatment-list.component';

const routes: Routes = [
  {
    path: '',
    component: TreatmentListComponent
  },
  {
    path: ':id',
    canActivate: [TreatmentExistsGuard],
    component: TreatmentDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreatmentRoutingModule { }
