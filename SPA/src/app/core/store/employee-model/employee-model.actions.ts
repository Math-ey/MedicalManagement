import { createAction, props } from '@ngrx/store';

import { EmployeeModel } from './employee-model.model';
import { LoadListParams } from '../../models/load-list-params';
import { LoadListResponse } from '../../models/load-list-response';

export const loadEmployeeModel = createAction(
  '[EmployeeModel/API] Load EmployeeModel',
  props<{ id: number }>()
);

export const loadEmployeeEnums = createAction(
  '[EmployeeModel/API] Load Employee enums',
  props<{ enums: any }>()
);

export const loadEmployeeModelSuccess = createAction(
  '[EmployeeModel/API] Load EmployeeModel Success',
  props<{ employee: EmployeeModel }>()
);

export const loadEmployeeModels = createAction(
  '[EmployeeModel/API] Load EmployeeModels',
  props<{ loadListParams: LoadListParams }>()
);

export const loadEmployeeModelsSuccess = createAction(
  '[EmployeeModel/API] Load EmployeeModels Success',
  props<{ employeeListResponse: LoadListResponse<EmployeeModel> }>()
);

export const addEmployeeModel = createAction(
  '[EmployeeModel/API] Add EmployeeModel',
  props<{ employee: EmployeeModel }>()
);

export const addEmployeeModelSuccess = createAction(
  '[EmployeeModel/API] Add EmployeeModel Success',
  props<{ employee: EmployeeModel }>()
);

export const deleteEmployeeModel = createAction(
  '[EmployeeModel/API] Delete EmployeeModel',
  props<{ id: number }>()
);

export const deleteEmployeeModelSuccess = createAction(
  '[EmployeeModel/API] Delete EmployeeModel Success',
  props<{ id: number }>()
);

export const deleteEmployeeModelError = createAction(
  '[EmployeeModel/API] Delete EmployeeModel Error'
);

export const updateEmployeeModel = createAction(
  '[EmployeeModel/API] Update EmployeeModel',
  props<{ employee: EmployeeModel }>()
);

export const updateEmployeeModelSuccess = createAction(
  '[EmployeeModel/API] Update EmployeeModel Success',
  props<{ employee: EmployeeModel }>()
);

export const clearEmployeeModels = createAction(
  '[EmployeeModel/API] Clear EmployeeModels'
);
