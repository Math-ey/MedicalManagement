import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EmployeeService } from '@core/services/employee.service';
import { State } from '@core/store';
import { EmployeeModel } from '@core/store/employee-model/employee-model.model';
import { updateTreatmentModel } from '@core/store/treatment-model/treatment-model.actions';
import { TreatmentModel } from '@core/store/treatment-model/treatment-model.model';
import { selectTreatmentEntities, selectTreatmentEnums } from '@core/store/treatment-model/treatment-model.selectors';
import { select, Store } from '@ngrx/store';
import { Observable, of} from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

import { addTreatmentModel, deleteTreatmentModel } from '@core/store/treatment-model/treatment-model.actions';
import { EnumModel } from '../../../../core/models/enum-model';
import { LoadListParams } from '@core/models/load-list-params';
import { SimpleEmployee } from '@core/models/simple-employee';

const maxOtherDoctorCount = 5;

@Component({
  selector: 'app-treatment-detail',
  templateUrl: './treatment-detail.component.html',
  styleUrls: ['./treatment-detail.component.css']
})

export class TreatmentDetailComponent implements OnInit {

  public currentTreatment$: Observable<TreatmentModel>;

  public isCreateMode = false;
  public isEditMode = false;

  public treatmentTypes: EnumModel[] = [];
  public treatmentStatus: EnumModel[] = [];

  public employees$: Observable<EmployeeModel[]>;
  public filteredEmployees$: Observable<EmployeeModel[]>;
  public filteredEmployeesOther$: Observable<EmployeeModel[]>;

  public viewLoaded = false;


  public treatmentForm: FormGroup = this.fb.group({
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

  public validMainDoctorChipList = false;
  public validOtherDoctorsChipList = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>,
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.treatmentForm.get('otherDoctorsObject').setValue([]);
    this.currentTreatment$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      map(id => {
        this.isCreateMode = id === 'new';
        return id;
      }),
      switchMap(id =>
        (id === 'new')
          ? of(this.treatmentForm.value)
          : this.store.pipe(
            select(selectTreatmentEntities),
            select(entities => entities[id]),
          )
      )
    );

    this.store.pipe(select(selectTreatmentEnums)).subscribe((data) => {
      this.treatmentTypes = data.enums.treatmentTypes;
      this.treatmentStatus = data.enums.treatmentStatus;
    });


    this.employees$ = this.employeeService.getEmployeeList();

    this.currentTreatment$.subscribe(treatment => {
      this.initializeForm(treatment);
    });

    this.filteredEmployees$ = this.treatmentForm.get('mainDoctorInput').valueChanges.pipe(
      startWith(''),
      switchMap((value) =>
        this.employees$ = this.employeeService.getEmployeeList({ query: value } as LoadListParams)
      ),
      switchMap(() => this.employees$.pipe(
        map(employees => employees.filter(emp => emp.id !== this.treatmentForm.get('mainDoctorObject').value?.id)),
        map(employees => employees.filter(emp => !this.treatmentForm.get('otherDoctorsObject').value.map(a => a.id)?.includes(emp.id))),
      ))
    );

    this.filteredEmployeesOther$ = this.treatmentForm.get('otherDoctorsInput').valueChanges.pipe(
      startWith(''),
      switchMap((value) =>
        this.employees$ = this.employeeService.getEmployeeList({ query: value } as LoadListParams)
      ),
      switchMap(() => this.employees$.pipe(
        map(employees => employees.filter(emp => emp.id !== this.treatmentForm.get('mainDoctorObject').value?.id)),
        map(employees => employees.filter(emp => !this.treatmentForm.get('otherDoctorsObject').value.map(a => a.id)?.includes(emp.id))),
      ))
    );
  }


  public initializeForm(treatment: TreatmentModel) {
    this.treatmentForm.patchValue({
      ...treatment,
      date: new Date(this.treatmentForm.get('date').value),
    });

    this.lockFormIfNotCreateMode();
    this.employees$.subscribe(data => {
      if (data) {
        this.updateOtherDoctorsChipListValid();
        this.updateMainDoctorChipListValid();
      }
      this.viewLoaded = true;
    });
  }

  public removeMainDoctor() {
    this.treatmentForm.get('mainDoctorObject').setValue(undefined);
    this.treatmentForm.get('otherDoctorsInput').setValue('');
    this.treatmentForm.get('mainDoctorInput').setValue('');
    this.deselectField('mainDoctorInput');
    this.treatmentForm.markAsDirty();
    this.updateMainDoctorChipListValid();
  }

  public removeOtherDoctor(id: any): void {
    this.treatmentForm.get('otherDoctorsObject').setValue(this.treatmentForm.get('otherDoctorsObject').value.filter(obj => obj.id !== id));
    this.treatmentForm.get('otherDoctorsInput').setValue('');
    this.treatmentForm.get('mainDoctorInput').setValue('');

    if (this.treatmentForm.get('otherDoctorsObject').value.length < maxOtherDoctorCount
      && this.treatmentForm.get('otherDoctorsInput').disabled) {
      this.treatmentForm.get('otherDoctorsInput').enable();
    }
    this.deselectField('otherDoctorsInput');
    this.treatmentForm.markAsDirty();
    this.updateOtherDoctorsChipListValid();
  }

  public otherDoctorSelected(event: MatAutocompleteSelectedEvent): void {
    this.treatmentForm.get('otherDoctorsObject').setValue([
      ...this.treatmentForm.get('otherDoctorsObject').value,
      {
        id: event.option.value.id,
        firstName: event.option.value.personal.firstName,
        lastName: event.option.value.personal.lastName,
        degree: event.option.value.education.degree
      } as SimpleEmployee
    ]);

    this.treatmentForm.get('mainDoctorInput').setValue('');
    this.treatmentForm.get('otherDoctorsInput').setValue('');

    if (this.treatmentForm.get('otherDoctorsObject').value.length >= maxOtherDoctorCount) {
      this.treatmentForm.get('otherDoctorsInput').disable();
    } else {
      this.deselectField('otherDoctorsInput');
    }

    this.treatmentForm.markAsDirty();
    this.updateOtherDoctorsChipListValid();
  }

  public mainDoctorSelected(event: MatAutocompleteSelectedEvent): void {

    this.treatmentForm.get('mainDoctorObject').setValue({
      id: event.option.value.id,
      firstName: event.option.value.personal.firstName,
      lastName: event.option.value.personal.lastName,
      degree: event.option.value.education.degree
    } as SimpleEmployee);

    this.treatmentForm.get('mainDoctorInput').setValue('');
    this.treatmentForm.get('otherDoctorsInput').setValue('');
    this.treatmentForm.get('mainDoctorInput').disable();
    this.treatmentForm.markAsDirty();
    this.updateMainDoctorChipListValid();
  }

  public displayNull(value) {
    return null;
  }

  public isFormValid(): boolean {
    return this.treatmentForm.valid && this.validMainDoctorChipList && this.validOtherDoctorsChipList;
  }

  public setEditMode(cond: boolean): void {
    this.isEditMode = cond;
    this.isEditMode ? this.treatmentForm.enable() : this.treatmentForm.disable();

    if (this.treatmentForm.get('mainDoctorObject').value) {
      this.treatmentForm.get('mainDoctorInput').disable();
    }
  }

  public deleteButtonClicked(): void {
    this.store.dispatch(deleteTreatmentModel({ id: this.treatmentForm.value.id }));
  }

  public createButtonClicked(): void {
    this.store.dispatch(addTreatmentModel({ treatmentModel: this.treatmentForm.value }));
    this.setEditMode(false);
  }

  public saveButtonClicked(): void {
    this.store.dispatch(updateTreatmentModel({ treatmentModel: this.treatmentForm.value }));
    this.setEditMode(false);
  }

  private lockFormIfNotCreateMode(): void {
    if (this.isCreateMode) {
      this.treatmentForm.enable();
    } else {
      this.treatmentForm.disable();
    }
  }

  private deselectField(field: string) {
    setTimeout(() => this.treatmentForm.get(field).disable());
    setTimeout(() => this.treatmentForm.get(field).enable());
  }

  private updateOtherDoctorsChipListValid(): void {
    this.validOtherDoctorsChipList = this.treatmentForm.get('otherDoctorsObject').value.length === 0 ? false : true;
  }

  private updateMainDoctorChipListValid(): void {
    this.validMainDoctorChipList = this.treatmentForm.get('mainDoctorObject').value ? true : false;
  }
}
