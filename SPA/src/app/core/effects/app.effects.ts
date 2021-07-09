import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { map, switchMap, tap, mergeMap } from 'rxjs/operators';

import * as EmployeeModelActions from '../store/employee-model/employee-model.actions';
import { EmployeeService } from '../services/employee.service';
import {
  loadEmployeeModelsSuccess,
  loadEmployeeModelSuccess,
  addEmployeeModelSuccess,
  deleteEmployeeModelSuccess,
  updateEmployeeModelSuccess
} from '../store/employee-model/employee-model.actions';
import { Router } from '@angular/router';
import { TreatmentService } from '@core/services/treatment.service';
import { loadTreatmentEnums } from '@core/store/treatment-model/treatment-model.actions';
import { loadEmployeeEnums } from '../store/employee-model/employee-model.actions';

@Injectable()
export class AppEffects {

  initTreatmentEnums$ = createEffect(() => this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    mergeMap(() => this.treatmentService.getTreatmentEnums().pipe(
      map(treatmentEnums => loadTreatmentEnums({ enums: treatmentEnums })),
    )),
  ));

  initEmployeeEnums$ = createEffect(() => this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    mergeMap(() => this.employeeService.getEmployeeEnums().pipe(
      map(employeeEnums => loadEmployeeEnums({ enums: employeeEnums })),
    ))
  ));

  constructor(
    private actions$: Actions,
    private router: Router,
    private employeeService: EmployeeService,
    private treatmentService: TreatmentService
  ) { }
}
