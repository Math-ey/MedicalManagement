import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TreatmentService } from '@core/services/treatment.service';
import { selectEmployeeEntities, selectEmployeeEnums } from '@core/store/employee-model/employee-model.selectors';
import { select, Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { State } from 'src/app/core/store';
import {
  addEmployeeModel,
  deleteEmployeeModel,
  updateEmployeeModel,
} from 'src/app/core/store/employee-model/employee-model.actions';
import { EmployeeModel } from 'src/app/core/store/employee-model/employee-model.model';
import { selectTreatmentEnums } from '@core/store/treatment-model/treatment-model.selectors';
import { EnumModel } from '@core/models/enum-model';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})

export class EmployeeDetailComponent implements OnInit, OnDestroy {
  public currentEmployee$: Observable<EmployeeModel>;
  public currentEmployeeSub: Subscription;

  public isCreateMode = false;
  public isEditMode = false;

  public pictureSrc = '';

  public employeeForm: FormGroup = this.fb.group({
    id: '',
    role: '',
    created: '',
    hireDate: '',
    personal: this.fb.group({
      gender: '',
      firstName: '',
      lastName: '',
      birthDate: undefined,
      birthPlace: '',
      citizenship: '',
      maritalStatus: '',
      picture: '',
      street: '',
      houseNumber: '',
      city: '',
      state: '',
      zipCode: '',
      email: '',
      phone: ''
    }),
    education: this.fb.group({
      highestEducationalLevelAttained: '',
      degree: '',
      schools: this.fb.array([
        this.fb.group(
          {
            schoolAddress: '',
            schoolName: '',
            attendFromYear: '',
            attendToYear: '',
            schoolSpecialisation: ''
          })
      ])
    }),
    workExperience: this.fb.group({
      jobs: this.fb.array([
        this.fb.group({
          companyName: '',
          companyAddress: '',
          companyPosition: '',
          workDescription: '',
          hiredInCompanyFromDate: '',
          hiredInCompanyToDate: ''
        })
      ])
    })
  });

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.currentEmployee$ = this.route.paramMap.pipe(
      map(params => params.get('id')),
      map(id => {
        this.setCreateMode(id);
        return id;
      }),
      switchMap(id =>
        (id === 'new')
          ? of(this.employeeForm.value)
          : this.store.pipe(
            select(selectEmployeeEntities),
            select(entities => entities[id])
          )
      )
    );

    this.currentEmployeeSub = this.currentEmployee$.subscribe(data => {
      if (data && !this.isCreateMode) {
        this.setPicture(data);
        this.employeeForm.patchValue(data);

        // temporary code to convert mocked data into correct Date format
        this.employeeForm.get(['personal', 'birthDate']).setValue(
          new Date(this.employeeForm.get(['personal', 'birthDate']).value));

        (this.employeeForm.get(['workExperience', 'jobs']) as FormArray)
          .controls[0].get('hiredInCompanyFromDate').setValue(new Date((this.employeeForm
            .get(['workExperience', 'jobs']) as FormArray).controls[0].get('hiredInCompanyFromDate').value));

        (this.employeeForm.get(['workExperience', 'jobs']) as FormArray)
          .controls[0].get('hiredInCompanyToDate').setValue(new Date((this.employeeForm
            .get(['workExperience', 'jobs']) as FormArray).controls[0].get('hiredInCompanyToDate').value));
      }
    });
  }

  ngOnDestroy(): void {
    this.currentEmployeeSub.unsubscribe();
    this.currentEmployee$ = null;
  }

  setCreateMode(id): void {
    if (id === 'new') {
      this.isCreateMode = true;
      this.employeeForm.disable();
      setTimeout(() => { this.employeeForm.enable(); }, 100);

    } else {
      this.isCreateMode = false;
      this.employeeForm.disable();
    }
  }

  setEditMode(cond: boolean): void {
    this.isEditMode = cond;
    this.isEditMode ? this.employeeForm.enable() : this.employeeForm.disable();
  }

  setPicture(data: EmployeeModel) {
    if (data?.personal?.picture !== '') {
      this.pictureSrc = data?.personal?.picture;
    } else {
      if (data?.personal?.gender === 'male') {
        this.pictureSrc = 'assets/user-male-avatar.png';
      } else if (data?.personal?.gender === 'female') {
        this.pictureSrc = 'assets/user-female-avatar.png';
      }
    }
  }

  changePicture() {
    this.pictureSrc = this.employeeForm.get(['personal', 'picture']).value;
  }

  // error handler, when incorrect image url is provided for img src
  errorHandler(event) {
    event.target.src = 'assets/user-male-avatar.png';
    this.employeeForm.get(['personal', 'picture']).setValue('');
  }

  saveButtonClicked() {
    this.store.dispatch(updateEmployeeModel({ employee: this.employeeForm.value }));
    this.setEditMode(false);
  }

  deleteButtonClicked() {
    this.store.dispatch(deleteEmployeeModel({ id: this.employeeForm.get('id').value}));
  }

  createButtonClicked() {
    this.store.dispatch(addEmployeeModel({ employee: this.employeeForm.value }));
  }
}
