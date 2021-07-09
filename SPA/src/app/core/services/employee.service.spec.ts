/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';
import { SharedModule } from '@shared/shared.module';

describe('Service: Employees', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule],
      providers: [EmployeeService]
    });
  });

  it('should ...', inject([EmployeeService], (service: EmployeeService) => {
    expect(service).toBeTruthy();
  }));
});
