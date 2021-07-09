import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as EmployeeModelActions from './employee-model.actions';
import { EmployeeModel } from './employee-model.model';
import { EmployeeEnums } from '../../models/enum-model';

export const employeeModelsFeatureKey = 'employeeModels';

export interface State extends EntityState<EmployeeModel> {
  loading: boolean;
  enums: EmployeeEnums;
  currentPage: number;
  total: number;
}

export const adapter: EntityAdapter<EmployeeModel> = createEntityAdapter<EmployeeModel>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  enums: undefined,
  currentPage: 0,
  total: 0
});

const employeeModelReducer = createReducer(
  initialState,
  on(EmployeeModelActions.loadEmployeeModel,
    state => ({
      ...state,
      loading: true
    })
  ),
  on(EmployeeModelActions.loadEmployeeModelSuccess,
    (state, action) => {
      state = {
        ...state,
        loading: false,
        total: state.total + 1
      };
      return adapter.addOne(action.employee, state);
    }),
  on(EmployeeModelActions.loadEmployeeModels,
    (state, action) => ({
      ...state,
      currentPage: action.loadListParams.page,
      loading: true
    })
  ),
  on(EmployeeModelActions.loadEmployeeEnums,
    (state, action) => {
      state = {
        ...state,
        enums: {
          maritalStatus: action.enums.maritalStatus,
          roles: action.enums.roles,
          educationalLevels: action.enums.educationalLevels,
          genders: action.enums.genders
        }
      };
      return state;
    }
  ),
  on(EmployeeModelActions.loadEmployeeModelsSuccess,
    (state, action) => {
      state = {
        ...state,
        loading: false,
        total: action.employeeListResponse.total
      };
      return adapter.setAll(action.employeeListResponse.list, state);
    }),
  on(EmployeeModelActions.clearEmployeeModels,
    state => adapter.removeAll(state)
  ),
  on(EmployeeModelActions.addEmployeeModel,
    state => ({
      ...state,
      loading: true
    })
  ),
  on(EmployeeModelActions.addEmployeeModelSuccess,
    (state, action) => {
      state = { ...state, loading: false };
      return adapter.addOne(action.employee, state);
    }
  ),
  on(EmployeeModelActions.deleteEmployeeModel,
    state => ({
      ...state,
      loading: true
    })
  ),
  on(EmployeeModelActions.deleteEmployeeModelSuccess,
    (state, action) => {
      state = { ...state, loading: false };
      return adapter.removeOne(action.id, state);
    }
  ),
  on(EmployeeModelActions.deleteEmployeeModelError,
    state => ({ ...state, loading: false })
  ),
  on(EmployeeModelActions.updateEmployeeModel,
    state => ({
      ...state,
      loading: true
    })
  ),
  on(EmployeeModelActions.updateEmployeeModel,
    (state, action) => {
      state = { ...state, loading: false };
      return adapter.upsertOne(action.employee, state);
    }
  )
);

export function reducer(state: State | undefined, action: Action) {
  return employeeModelReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
