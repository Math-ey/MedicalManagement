import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { TreatmentModel } from './treatment-model.model';
import * as TreatmentModelActions from './treatment-model.actions';
import { TreatmentEnums } from '../../models/enum-model';

export const treatmentModelsFeatureKey = 'treatmentModels';

export interface State extends EntityState<TreatmentModel> {
  loading: boolean;
  currentPage: number;
  total: number;
  enums: TreatmentEnums;
}

export const adapter: EntityAdapter<TreatmentModel> = createEntityAdapter<TreatmentModel>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  currentPage: 0,
  total: 0,
  enums: undefined
});

const treatmentModelReducer = createReducer(
  initialState,

  on(TreatmentModelActions.addTreatmentModel,
    state => ({ ...state, loading: true })
  ),
  on(TreatmentModelActions.addTreatmentModelSuccess,
    (state, action) => {
      state = { ...state, loading: false }
      return adapter.addOne(action.treatmentModel, state);
    }
  ),
  on(TreatmentModelActions.updateTreatmentModel,
    state => ({ ...state, loading: true })
  ),
  on(TreatmentModelActions.updateTreatmentModelSuccess,
    (state, action) => {
      state = { ...state, loading: false };
      return adapter.upsertOne(action.treatmentModel, state);
    }
  ),
  on(TreatmentModelActions.deleteTreatmentModel,
    state => ({ ...state, loading: true })
  ),
  on(TreatmentModelActions.deleteTreatmentModelSuccess,
    (state, action) => {
      state = { ...state, loading: false };
      return adapter.removeOne(action.id, state);
    }
  ),
  on(TreatmentModelActions.loadTreatmentModels,
    state => ({ ...state, loading: true })
  ),
  on(TreatmentModelActions.loadTreatmentEnums,
    (state, action) => {
      state = {
        ...state,
        enums: {
          treatmentTypes: action.enums.treatmentTypes,
          treatmentStatus: action.enums.treatmentStatus
        }
      };
      return state;
    }
  ),
  on(TreatmentModelActions.loadTreatmentModelsSuccess,
    (state, action) => {
      state = {
        ...state,
        loading: false
      };
      return adapter.setAll(action.treatmentModels, state);
    }
  ),
  on(TreatmentModelActions.loadTreatmentModel,
    state => ({ ...state, loading: true })
  ),
  on(TreatmentModelActions.loadTreatmentModelSuccess,
    (state, action) => {
      state = { ...state, loading: false };

      return adapter.setOne(action.treatmentModel, state);
    }
  ),
  on(TreatmentModelActions.clearTreatmentModels,
    state => adapter.removeAll(state)
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return treatmentModelReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
