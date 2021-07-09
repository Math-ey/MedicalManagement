import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeListMock } from '@modules/employee/page/employee-list/employee-list-mock';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { LoadListParams } from '../models/load-list-params';
import { LoadListResponse } from '../models/load-list-response';
import { EmployeeModel } from '../store/employee-model/employee-model.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: EmployeeModel[] = Object.assign([], EmployeeListMock.employees);

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) { }

  private get baseUrl() {
    const baseUrl = (window as any)?.MedicalManagementConfig?.apiBaseUrl || environment.apiBaseUrl || '/api';
    return `${baseUrl}`;
  }

  public getEmployees(listParams?: LoadListParams): Observable<LoadListResponse<EmployeeModel>> {
    const apiParams = listParams || {};
    return this.httpClient.get(`${this.baseUrl}/employee-list`, {
      params: apiParams as any
    })
      .pipe(map(response => (response as any) as LoadListResponse<EmployeeModel>));

  }
  public getEmployeeList(listParams?: LoadListParams): Observable<EmployeeModel[]> {
    const apiParams = listParams || {};
    return this.httpClient.get(`${this.baseUrl}/employee-list`, {
      params: apiParams as any
    })
      .pipe(map(response => (response as any).list as EmployeeModel[]));

  }


  public getEmployeeEnums(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/employee-enums`)
      .pipe(map(response => response as any));
  }

  public getAllEmployees(): Observable<EmployeeModel[]> {
    return of(this.employees).pipe(delay(500)); // simulated delay over network
  }

  public getEmployeeById(id: number): Observable<EmployeeModel> {
    return this.httpClient.get(`${this.baseUrl}/employee/${id}`)
      .pipe(map(response => response as EmployeeModel));
  }

  // private getFakeEmployees(params: LoadListParams): LoadListResponse<EmployeeModel> {
  //   const data = this.employees.filter(e => (e.personal.firstName.toLocaleLowerCase()).indexOf(params.filter) > -1
  //     || (e.personal.lastName.toLocaleLowerCase()).indexOf(params.filter) > -1
  //   );

  //   return {
  //     total: data.length,
  //     list: data.slice(params.pageIndex * params.pageSize, (params.pageIndex + 1) * params.pageSize)
  //   };
  // }

  public addEmployee(employee: EmployeeModel): Observable<EmployeeModel> {
    const id = 0;
    const newEmployee = Object.assign({ ...employee, id });

    return this.httpClient.post(`${this.baseUrl}/employee`, newEmployee)
      .pipe(map(response => (response as any) as EmployeeModel));
  }

  public updateEmployee(employee: EmployeeModel): Observable<EmployeeModel> {
    return this.httpClient.put(`${this.baseUrl}/employee`, employee)
      .pipe(map(response => response as EmployeeModel));
  }

  public deleteEmployee(id: number): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/employee/${id}`)
      .pipe(
        map(_ => true),
        catchError(err => {
          if (err.error instanceof Error) {
            console.error(`Error deleting employee ${id}: ${err.error.message}`);
            this.snackBar.open(err.error.message, 'Ok', {
              duration: 2000,
            });
          } else {
            console.error(`Error deleting employee ${id}: ${err.status}: ${err.error}`);
            console.error(`Error deleting employee ${id}: ${err.error.message}`);
            this.snackBar.open(err.error, 'Ok', {
              duration: 2000,
            });
          }
          return of(false);
        })
      );
  }
}
