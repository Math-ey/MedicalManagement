import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromTreatment from './treatment-model.reducer';
import { adapter } from './treatment-model.reducer';

const selectTreatmentState = createFeatureSelector<fromTreatment.State>(fromTreatment.treatmentModelsFeatureKey);

export const selectTreatmentEntities = createSelector(
  selectTreatmentState,
  (state: fromTreatment.State) => state.entities
);

export const selectTreatmentList = createSelector(
  selectTreatmentState,
  adapter.getSelectors().selectAll
);

export const selectTreatmentLoading = createSelector(
  selectTreatmentState,
  (state: fromTreatment.State) => state.loading
);

export const selectTreatmentEnums = createSelector(
  selectTreatmentState,
  (state: fromTreatment.State) => ({enums: state.enums})
);
