import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, tap, take, switchMap, mergeMap, catchError } from 'rxjs/operators';

import { EmployeeService } from '../services/employee.service';
import { loadEmployeeModelSuccess } from '../store/employee-model/employee-model.actions';
import { State } from '../store/employee-model/employee-model.reducer';
import { selectEmployeeEntities } from '../store/employee-model/employee-model.selectors';

@Injectable({ providedIn: 'root' })
export class EmployeeExistsGuard implements CanActivate {
  constructor(
    private store: Store<State>,
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  isEmployeeInStore(id: number): Observable<boolean> {
    return this.store.pipe(
      select(selectEmployeeEntities),
      map(entities => !!entities[id]),
      take(1)
    );
  }

  /**
   * This method loads an employee with the given id from the API and caches
   * it in the store, returning `true` or `false` if it was found.
   */
  isEmployeeInApi(id:  number): Observable<boolean> {
    return this.employeeService.getEmployeeById(id).pipe(
      map(employee => {
        if (!employee) {
          this.router.navigate(['employee']);
          return false;
        }

        this.store.dispatch(loadEmployeeModelSuccess({ employee }));
        return true;
      }),
      catchError(err => {
        this.router.navigate(['employee']);
        return of(true);
      })
    );
  }

  /**
   * It first checks if an employee is in the store, and if not it then
   * checks if it is available via API
   */
  isEmployeeAvailable(id: number): Observable<boolean> {
    return this.isEmployeeInStore(id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return this.isEmployeeInApi(id);
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    if (route.params.id === 'new') {
      return of(true);
    }
    return this.isEmployeeAvailable(route.params.id);
  }
}
