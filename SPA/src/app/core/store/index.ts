import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import * as fromEmployeeModel from './employee-model/employee-model.reducer';
import * as fromTreatmentModel from './treatment-model/treatment-model.reducer';


export interface State {
  router: RouterReducerState;
  [fromEmployeeModel.employeeModelsFeatureKey]: fromEmployeeModel.State;  [fromTreatmentModel.treatmentModelsFeatureKey]: fromTreatmentModel.State;

}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  [fromEmployeeModel.employeeModelsFeatureKey]: fromEmployeeModel.reducer,
  [fromTreatmentModel.treatmentModelsFeatureKey]: fromTreatmentModel.reducer,
};

const selectRouterState = createFeatureSelector<fromRouter.RouterReducerState>('router');
export const {
  selectCurrentRoute,   // select the current route
  selectQueryParams,    // select the current route query params
  selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = fromRouter.getSelectors(selectRouterState);


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
