import { createAction, props } from '@ngrx/store';

import { TreatmentModel } from './treatment-model.model';
import { LoadListResponse } from '@core/models/load-list-response';
import { TreatmentEnums } from '@core/models/enum-model';

export const loadTreatmentEnums = createAction(
  '[TreatmentModel/API] Load Treatment enums',
  props<{ enums: any }>()
);

export const loadTreatmentModels = createAction(
  '[TreatmentModel/API] Load TreatmentModels'
);

export const loadTreatmentModelsSuccess = createAction(
  '[TreatmentModel/API] Load TreatmentModels Success',
  props<{ treatmentModels: TreatmentModel[]}>()
);

export const loadTreatmentModel = createAction(
  '[TreatmentModel/API] Load TreatmentModel',
  props<{ id: number }>()
);

export const loadTreatmentModelSuccess = createAction(
  '[TreatmentModel/API] Load TreatmentModel Success',
  props<{ treatmentModel: TreatmentModel }>()
);

export const addTreatmentModel = createAction(
  '[TreatmentModel/API] Add TreatmentModel',
  props<{ treatmentModel: TreatmentModel }>()
);

export const addTreatmentModelSuccess = createAction(
  '[TreatmentModel/API] Add TreatmentModel Success',
  props<{ treatmentModel: TreatmentModel }>()
);

export const updateTreatmentModel = createAction(
  '[TreatmentModel/API] Update TreatmentModel',
  props<{ treatmentModel: TreatmentModel }>()
);

export const updateTreatmentModelSuccess = createAction(
  '[TreatmentModel/API] Update TreatmentModel Success',
  props<{ treatmentModel: TreatmentModel }>()
);

export const deleteTreatmentModel = createAction(
  '[TreatmentModel/API] Delete TreatmentModel',
  props<{ id: number }>()
);

export const deleteTreatmentModelSuccess = createAction(
  '[TreatmentModel/API] Delete TreatmentModel Success',
  props<{ id: number }>()
);

export const clearTreatmentModels = createAction(
  '[TreatmentModel/API] Clear TreatmentModels'
);
