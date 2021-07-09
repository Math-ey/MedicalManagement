import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TreatmentService } from '@core/services/treatment.service';
import {
  loadTreatmentModels,
  loadTreatmentModelsSuccess,
  updateTreatmentModel,
  updateTreatmentModelSuccess,
  loadTreatmentEnums,
} from '@core/store/treatment-model/treatment-model.actions';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { map, switchMap, take, tap, mergeMap } from 'rxjs/operators';

import {
  addTreatmentModel,
  addTreatmentModelSuccess,
  deleteTreatmentModel,
  deleteTreatmentModelSuccess,
} from '../store/treatment-model/treatment-model.actions';

@Injectable()
export class TreatmentEffects {



  loadTreatments$ = createEffect(() => this.actions$.pipe(
    ofType(loadTreatmentModels),
    // take(1), // load only first time
    switchMap(() =>
      this.treatmentService.getTreatments().pipe(
        map(treatmentModels => loadTreatmentModelsSuccess({treatmentModels}))
      )
    )
  ));

  addEmployee$ = createEffect(() => this.actions$.pipe(
    ofType(addTreatmentModel),
    map(action => action.treatmentModel),
    switchMap(treatment =>
      this.treatmentService.addTreatment(treatment).pipe(
        tap(treatmentResponse => this.router.navigate(['/treatment', treatmentResponse.id])),
        map(treatmentResponse => addTreatmentModelSuccess({ treatmentModel: treatmentResponse }))
      )
    )
  ));

  deleteEmployee$ = createEffect(() => this.actions$.pipe(
    ofType(deleteTreatmentModel),
    map(action => action.id),
    switchMap(id =>
      this.treatmentService.deleteTreatment(id).pipe(
        tap(() => this.router.navigate(['/treatment'])),
        map(() => deleteTreatmentModelSuccess({ id }))
      )
    )
  ));

  updateTreatments$ = createEffect(() => this.actions$.pipe(
    ofType(updateTreatmentModel),
    map(action => action.treatmentModel),
    switchMap((treatment) =>
      this.treatmentService.updateTreatment(treatment).pipe(
        tap(treatmentResponse => this.router.navigate(['/treatment', treatmentResponse.id])),
        map(treatmentResponse => updateTreatmentModelSuccess({ treatmentModel: treatmentResponse }))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private treatmentService: TreatmentService,
    private router: Router
  ) { }
}

