import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '@core/services/employee.service';
import { TreatmentService } from '@core/services/treatment.service';
import {
  addEmployeeModelSuccess,
  deleteEmployeeModelSuccess,
  loadEmployeeModelsSuccess,
  loadEmployeeModelSuccess,
  updateEmployeeModelSuccess,
} from '@core/store/employee-model/employee-model.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, catchError } from 'rxjs/operators';

import * as EmployeeModelActions from '../store/employee-model/employee-model.actions';
import { deleteEmployeeModelError } from '../store/employee-model/employee-model.actions';
import { of } from 'rxjs';

@Injectable()
export class EmployeeEffects {

  loadEmployee$ = createEffect(() => this.actions$.pipe(
    ofType(EmployeeModelActions.loadEmployeeModel),
    map(action => action.id),
    switchMap(id =>
      this.employeeService.getEmployeeById(id).pipe(
        map(employee => loadEmployeeModelSuccess({ employee }))
      )
    )
  ));

  loadEmployees$ = createEffect(() => this.actions$.pipe(
    ofType(EmployeeModelActions.loadEmployeeModels),
    map(action => action.loadListParams),
    switchMap(params =>
      this.employeeService.getEmployees(params).pipe(
        map(employeeListResponse => loadEmployeeModelsSuccess({ employeeListResponse }))
      )
    )
  ));

  addEmployee$ = createEffect(() => this.actions$.pipe(
    ofType(EmployeeModelActions.addEmployeeModel),
    map(action => action.employee),
    switchMap(employee =>
      this.employeeService.addEmployee(employee).pipe(
        tap(employeeResponse => this.router.navigate(['/employee', employeeResponse.id])),
        map(employeeResponse => addEmployeeModelSuccess({ employee: employeeResponse }))
      )
    )
  ));

  deleteEmployee$ = createEffect(() => this.actions$.pipe(
    ofType(EmployeeModelActions.deleteEmployeeModel),
    map(action => action.id),
    switchMap(id =>
      this.employeeService.deleteEmployee(id).pipe(
        map(isDeleted => {
          console.log('Hopla')
          if (!isDeleted) {
            return deleteEmployeeModelError();
          }

          this.router.navigate(['/employee']);
          return deleteEmployeeModelSuccess({ id });
        })
      )
    )
  ));

  updateEmployee$ = createEffect(() => this.actions$.pipe(
    ofType(EmployeeModelActions.updateEmployeeModel),
    map(action => action.employee),
    switchMap(employee =>
      this.employeeService.updateEmployee(employee).pipe(
        tap(employeeResponse => {
          this.router.navigate(['/employee', employeeResponse.id]);
        }),
        map(employeeResponse => updateEmployeeModelSuccess({ employee: employeeResponse }))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private router: Router,
    private employeeService: EmployeeService,
  ) { }

}
