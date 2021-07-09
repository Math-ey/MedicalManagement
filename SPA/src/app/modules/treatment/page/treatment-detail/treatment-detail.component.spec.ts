/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { State } from '@core/store';
import { Store } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { EMPTY, of } from 'rxjs';

import { TreatmentDetailComponent } from './treatment-detail.component';
import { TreatmentModel } from '@core/store/treatment-model/treatment-model.model';
import { FormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

describe('TreatmentDetailComponent', () => {
  let component: TreatmentDetailComponent;
  let fixture: ComponentFixture<TreatmentDetailComponent>;

  const storeStub: Partial<Store<State>> = {
    pipe: () => EMPTY,
    select: () => EMPTY,
    dispatch: () => EMPTY
  };

  const currentTreatment: TreatmentModel = {
    id: 1,
    title: 'ACL Surgery',
    roomNumber: 'K55',
    date: new Date(),
    status: 1,
    type: 1,
    mainDoctorObject: {
      id: 12,
      firstName: 'name',
      lastName: 'surname',
      degree: 'test'
    },
    otherDoctorsObject: [
      { id: 2, firstName: 'Prince', lastName: 'Strong', degree: 'MUDr' },
      { id: 3, firstName: 'Barnett', lastName: 'Cannon', degree: 'MUDr' }
    ],
    description: 'Ta dobre to dopadlo, pacient prisiel o nohu'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule, RouterTestingModule, SharedModule],
      declarations: [TreatmentDetailComponent],
      providers: [{ provide: Store, useValue: storeStub }, FormBuilder]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentDetailComponent);
    component = fixture.componentInstance;
    component.currentTreatment$ = of(Object.assign({}, currentTreatment));
    const formBuilder = TestBed.inject(FormBuilder);
    component.treatmentForm = formBuilder.group({
      id: 0,
      title: '',
      roomNumber: '',
      date: new Date(),
      status: '',
      type: '',
      description: '',
      mainDoctorInput: '',
      otherDoctorsInput: '',
      mainDoctorObject: undefined,
      otherDoctorsObject: []
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should activate editable mode', () => {
    // given
    component.isEditMode = false;
    component.treatmentForm.disable();

    // when
    component.setEditMode(true);

    // then
    expect(component.isEditMode).toBe(true);
    expect(component.treatmentForm.disabled).toBe(false);
  });

  it('should deactivate editable mode', () => {
    // given
    component.isEditMode = true;
    component.treatmentForm.enable();

    // when
    component.setEditMode(false);

    // then
    expect(component.isEditMode).toBe(false);
    expect(component.treatmentForm.disabled).toBe(true);
  });

  it('should validate treatmentForm and mat-chipl-lists to be valid', () => {
    // given
    component.validMainDoctorChipList = true;
    component.validOtherDoctorsChipList = true;

    // when
    const response = component.isFormValid();

    // then
    expect(response).toBe(true);
  });

  it('should delete other doctor', () => {
    // given
    component.treatmentForm.patchValue(currentTreatment);

    // when
    component.removeOtherDoctor(2);

    // then
    expect(component.treatmentForm.get('otherDoctorsObject').value.length).toBe(1);
  });

  it('should delete main doctor', () => {
    // given
    component.treatmentForm.patchValue(currentTreatment);

    // when
    component.removeMainDoctor();

    // then
    expect(component.treatmentForm.get('mainDoctorObject').value).toBe(undefined);
  });

  it('should add main doctor into form', () => {
    // given
    component.treatmentForm.patchValue(currentTreatment);
    component.treatmentForm.get('mainDoctorObject').setValue(undefined);

    const matSelObj = {
      option: {
        value: {
          id: 1,
          personal: {
            firstName: 'Haynes',
            lastName: 'Barlow'
          },
          education: {
            degree: 'Mudr'
          }
        }
      }
    } as MatAutocompleteSelectedEvent;

    // when
    component.mainDoctorSelected(matSelObj);

    // then
    expect(component.treatmentForm.get('mainDoctorObject').value).not.toBe(undefined);
  });

  it('should add other doctor into form', () => {
    // given
    component.treatmentForm.patchValue(currentTreatment);

    const matSelObj = {
      option: {
        value: {
          id: 1,
          personal: {
            firstName: 'Haynes',
            lastName: 'Barlow'
          },
          education: {
            degree: 'Mudr'
          }
        }
      }
    } as MatAutocompleteSelectedEvent;

    // when
    component.otherDoctorSelected(matSelObj);

    // then
    expect(component.treatmentForm.get('otherDoctorsObject').value.length).toBe(3);
  });


});
