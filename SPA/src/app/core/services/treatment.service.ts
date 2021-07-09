import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { TreatmentListMock } from '@modules/treatment/page/treatment-list/treatment-list-mock';

import { TreatmentModel } from '../store/treatment-model/treatment-model.model';
import { EmployeeModel } from '@core/store/employee-model/employee-model.model';
import { EmployeeListMock } from '@modules/employee/page/employee-list/employee-list-mock';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
  private treatments: TreatmentModel[] = Object.assign([], TreatmentListMock.treatments);
  private employees: EmployeeModel[] = Object.assign([], EmployeeListMock.employees);

  public get baseUrl() {
    const baseUrl = (window as any)?.MedicalManagementConfig?.apiBaseUrl || environment.apiBaseUrl || '/api';
    return `${baseUrl}`;
  }

  constructor(private httpClient: HttpClient) { }

  public getTreatments(): Observable<TreatmentModel[]> {
    return this.httpClient.get(`${this.baseUrl}/treatment-list`)
      .pipe(map(response => (response as any) as Array<TreatmentModel>));
  }

  public getTreatmentEnums(): Observable<any[]> {
    return this.httpClient.get(`${this.baseUrl}/treatment-enums`)
      .pipe(map(response => (response as any) as Array<any>));
  }

  public getTreatmentById(id: number): Observable<TreatmentModel> {
    return this.httpClient.get(`${this.baseUrl}/treatment/${id}`)
      .pipe(map(response => response as TreatmentModel));
  }

  public updateTreatment(treatment: TreatmentModel): Observable<TreatmentModel> {

    treatment = Object.assign({}, treatment);
    return this.httpClient.put(`${this.baseUrl}/treatment`, treatment)
      .pipe(map(response => (response as any) as TreatmentModel));
  }

  public addTreatment(treatment: TreatmentModel): Observable<TreatmentModel> {
    const id = 0;
    const newTreatment = Object.assign({ ...treatment, id });

    return this.httpClient.post(`${this.baseUrl}/treatment`, newTreatment)
      .pipe(map(response => (response as any) as TreatmentModel));
  }

  public deleteTreatment(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/treatment/${id}`)
      .pipe(
        map(_ => true),
        catchError(err => {
          if (err.error instanceof Error) {
            console.error(`Error deleting treatment ${id}: ${err.error.message}`);
          } else {
            console.error(`Error deleting treatment ${id}: ${err.status}: ${err.error}`);
          }
          return of(false);
        })
      );
  }
}
