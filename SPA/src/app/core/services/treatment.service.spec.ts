/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TreatmentService } from './treatment.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TreatmentModel } from '@core/store/treatment-model/treatment-model.model';
import { SimpleEmployee } from '@core/models/simple-employee';
import { HttpResponse, HttpHeaders } from '@angular/common/http';

describe('Service: Treatment.service.ts', () => {
  let httpTestingController: HttpTestingController;
  let treatmentService: TreatmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TreatmentService]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    treatmentService = TestBed.inject(TreatmentService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(treatmentService).toBeTruthy();
  });

  it('should return right data after addTreatment method call', () => {
    const treatment: TreatmentModel = {
      id: 0,
      description: 'asdf',
      roomNumber: 'ABC',
      date: new Date(Date.now()),
      type: 1,
      title: 'Left knee surgery',
      status: 2,
      mainDoctorObject: {
        id: 1,
        firstName: 'William',
        lastName: 'Robins',
        degree: 'Mudr'
      } as SimpleEmployee,
      otherDoctorsObject: [
        {
          id: 2,
          firstName: 'Palo',
          lastName: 'Habera',
          degree: 'Mudr'
        } as SimpleEmployee
      ]
    } as TreatmentModel;

    treatmentService.addTreatment(treatment)
      .subscribe(data => {
        expect(data).toBe(treatment);
      });

    const req = httpTestingController.expectOne(`${treatmentService.baseUrl}/treatment`);

    expect(req.request.method).toEqual('POST');

    req.flush(treatment);
  });

  it('should get all treatments', () => {

    const treatments = [
      {
        id: 1,
        description: 'asdf',
        roomNumber: 'ABC',
        date: new Date(Date.now()),
        type: 1,
        title: 'Left knee surgery',
        status: 2,
        mainDoctorObject: {
          id: 1,
          firstName: 'William',
          lastName: 'Robins',
          degree: 'Mudr'
        } as SimpleEmployee,
        otherDoctorsObject: [
          {
            id: 2,
            firstName: 'Palo',
            lastName: 'Habera',
            degree: 'Mudr'
          } as SimpleEmployee
        ]
      } as TreatmentModel,
      {
        id: 2,
        description: 'asdf',
        roomNumber: 'ABC',
        date: new Date(Date.now()),
        type: 1,
        title: 'Left knee surgery',
        status: 2,
        mainDoctorObject: {
          id: 1,
          firstName: 'William',
          lastName: 'Robins',
          degree: 'Mudr'
        } as SimpleEmployee,
        otherDoctorsObject: [
          {
            id: 2,
            firstName: 'Palo',
            lastName: 'Habera',
            degree: 'Mudr'
          } as SimpleEmployee
        ]
      } as TreatmentModel
    ];

    treatmentService.getTreatments()
      .subscribe(response => {
        expect(response[0].id).toBe(1);
        expect(response[1].id).toBe(2);
      });

    const req = httpTestingController.expectOne(`${treatmentService.baseUrl}/treatment-list`);

    expect(req.request.method).toEqual('GET');

    req.flush(treatments);
  });
});
