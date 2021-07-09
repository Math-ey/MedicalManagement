import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TreatmentService } from '@core/services/treatment.service';
import { State } from '@core/store';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { selectTreatmentEntities } from '../store/treatment-model/treatment-model.selectors';
import { loadTreatmentModelSuccess } from '../store/treatment-model/treatment-model.actions';

@Injectable({ providedIn: 'root' })
export class TreatmentExistsGuard implements CanActivate {
  constructor(
    private store: Store<State>,
    private treatmentService: TreatmentService,
    private router: Router
  ) { }

  isTreatmentInStore(id: string): Observable<boolean> {
    return this.store.pipe(
      select(selectTreatmentEntities),
      map(entities => !!entities[id]),
      take(1)
    );
  }

  /**
   * This method loads a treatment with the given id from the API and caches
   * it in the store, returning `true` or `false` if it was found.
   */
  isTreatmentInApi(id: string): Observable<boolean> {
    return this.treatmentService.getTreatmentById(+id).pipe(
      map(treatmentModel => {
        if (!treatmentModel) {
          this.router.navigate(['treatment']);
          return false;
        }

        this.store.dispatch(loadTreatmentModelSuccess({ treatmentModel }));
        return true;
      }),
      catchError(err => {
        this.router.navigate(['treatment']);
        return of(true);
      })
    );
  }


  /**
   * It first checks if a treatment is in the store, and if not it then
   * checks if it is available via API
   */
  isTreatmentAvailable(id: string): Observable<boolean> {
    return this.isTreatmentInStore(id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return this.isTreatmentInApi(id);
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.params.id === 'new') {
      return of(true);
    }

    return this.isTreatmentAvailable(route.params.id);
  }
}
