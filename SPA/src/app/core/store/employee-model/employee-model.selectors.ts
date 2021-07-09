import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from '..';
import * as fromEmployee from './employee-model.reducer';
import { EmployeeListMock } from 'src/app/modules/employee/page/employee-list/employee-list-mock';

const selectEmployeeState = createFeatureSelector<fromEmployee.State>('employeeModels');

export const selectEmployeeEntities = createSelector(
  selectEmployeeState,
  (state: fromEmployee.State) => state.entities
);

export const selectEmployeeList = createSelector(
  selectEmployeeState,
  fromEmployee.adapter.getSelectors().selectAll
);

export const selectEmployeeTotal = createSelector(
  selectEmployeeState,
  (state: fromEmployee.State) => state.total
);

export const selectEmployeeLoading = createSelector(
  selectEmployeeState,
  (state: fromEmployee.State) => state.loading
);

export const selectEmployeeById = createSelector(
  selectEmployeeEntities,
  fromStore.selectRouteParam('id'),
  (entities, id) => Object.assign({}, EmployeeListMock.employees[0])
);

export const selectEmployeeEnums = createSelector(
  selectEmployeeState,
  (state: fromEmployee.State) => ({enums: state.enums})
);
