import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { State } from '@core/store';
import { EmployeeModel } from '@core/store/employee-model/employee-model.model';
import { Store } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { EMPTY, of } from 'rxjs';

import { EmployeeDetailComponent } from './employee-detail.component';
import { EmployeeEducationTabComponent } from './employee-education-tab/employee-education-tab.component';
import { EmployeePersonalTabComponent } from './employee-personal-tab/employee-personal-tab.component';
import { EmployeeWorkTabComponent } from './employee-work-tab/employee-work-tab.component';

describe('EmployeeDetailComponent', () => {
  let component: EmployeeDetailComponent;
  let fixture: ComponentFixture<EmployeeDetailComponent>;

  const storeStub: Partial<Store<State>> = {
    pipe: () => EMPTY,
    select: () => EMPTY,
    dispatch: () => EMPTY
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeeDetailComponent,
        EmployeeEducationTabComponent,
        EmployeeWorkTabComponent,
        EmployeePersonalTabComponent
      ],
      imports: [RouterTestingModule, BrowserAnimationsModule, SharedModule],
      providers: [{ provide: Store, useValue: storeStub }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDetailComponent);
    component = fixture.componentInstance;
    component.currentEmployee$ = of({
      id: 1,
      personal: {
        gender: 'male',
        firstName: 'Romero',
        lastName: 'Woodward',
        birthPlace: 'Turah',
        birthDate: new Date(),
        citizenShip: 'USA',
        maritalStatus: 'separated',
        picture: 'https://randomuser.me/api/portraits/men/65.jpg',
        street: 'Dekoven Court',
        houseNumber: '829',
        city: 'Fannett',
        state: 'New Hampshire',
        zipCode: '6766',
        email: 'romero.woodward@hospital.com}',
        phone: '+1 (811) 449-3225'
      },
      education: {
        highestEducationalLevelAttained: '2',
        degree: 'MUDr',
        schools: [
          {
            schoolAddress: 'Bratislava, Slovakia',
            schoolName: 'FIIT STU',
            attendedSchoolFromYear: '2015',
            attendedSchoolToYear: '2020',
            schoolSpecialisation: 'IT'
          }
        ]
      },
      workExperience: {
        jobs: [
          {
            companyName: 'SIEMENS',
            companyAddress: 'Bratislava',
            companyPosition: 'kooooder',
            workDescription: 'kodil som vela',
            hiredInCompanyFromDate: new Date(),
            hiredInCompanyToDate: new Date()
          }
        ]
      },
      role: 'Surgeon',
      created: new Date(),
      hireDate: new Date()
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should activate editable mode', () => {
    // given
    component.isEditMode = false;
    component.employeeForm.disable();

    // when
    component.setEditMode(true);

    // then
    expect(component.isEditMode).toBe(true);
    expect(component.employeeForm.disabled).toBe(false);
  });

  it('should deactive editable mode', () => {
    // given
    component.isEditMode = true;
    component.employeeForm.enable();

    // when
    component.setEditMode(false);

    // then
    expect(component.isEditMode).toBe(false);
    expect(component.employeeForm.disabled).toBe(true);
  });

  it('should activate create mode if new record is being created"', fakeAsync(() => {
    // given
    component.isCreateMode = false;
    component.employeeForm.disable();

    // when
    component.setCreateMode('new');
    tick(500);
    fixture.detectChanges();

    // then
    fixture.whenStable().then(() => {
      expect(component.isCreateMode).toBe(true);
      expect(component.employeeForm.disabled).toBe(false);
    });
  }));

  it('should deactivate create mode if existing record has been loaded"', () => {
    // given
    component.isCreateMode = false;
    component.employeeForm.disable();

    // when
    component.setCreateMode(5);

    // then
    expect(component.isCreateMode).toBe(false);
    expect(component.employeeForm.disabled).toBe(true);
  });

  it('should set employee picture', () => {
    // given
    const currentEmployee: EmployeeModel = {
      id: 1,
      personal: {
        gender: 'male',
        firstName: 'Romero',
        lastName: 'Woodward',
        birthPlace: 'Turah',
        birthDate: new Date(),
        citizenShip: 'USA',
        maritalStatus: 'separated',
        picture: 'https://randomuser.me/api/portraits/men/65.jpg',
        street: 'Dekoven Court',
        houseNumber: '829',
        city: 'Fannett',
        state: 'New Hampshire',
        zipCode: '6766',
        email: 'romero.woodward@hospital.com}',
        phone: '+1 (811) 449-3225'
      },
      education: {
        highestEducationalLevelAttained: '2',
        degree: 'MUDr',
        schools: [
          {
            schoolAddress: 'Bratislava, Slovakia',
            schoolName: 'FIIT STU',
            attendedSchoolFromYear: '2015',
            attendedSchoolToYear: '2020',
            schoolSpecialisation: 'IT'
          }
        ]
      },
      workExperience: {
        jobs: [
          {
            companyName: 'SIEMENS',
            companyAddress: 'Bratislava',
            companyPosition: 'kooooder',
            workDescription: 'kodil som vela',
            hiredInCompanyFromDate: new Date(),
            hiredInCompanyToDate: new Date()
          }
        ]
      },
      role: 'Surgeon',
      created: new Date(),
      hireDate: new Date()
    };

    // when
    component.setPicture(currentEmployee);

    // then
    expect(component.pictureSrc).toBe(currentEmployee.personal.picture);
  });

  it('should set male avatar if an employee has no picture yet', () => {
    // given
    const currentEmployee: EmployeeModel = {
      id: 1,
      personal: {
        gender: 'male',
        firstName: 'Romero',
        lastName: 'Woodward',
        birthPlace: 'Turah',
        birthDate: new Date(),
        citizenShip: 'USA',
        maritalStatus: 'separated',
        picture: '',
        street: 'Dekoven Court',
        houseNumber: '829',
        city: 'Fannett',
        state: 'New Hampshire',
        zipCode: '6766',
        email: 'romero.woodward@hospital.com}',
        phone: '+1 (811) 449-3225'
      },
      education: {
        highestEducationalLevelAttained: '2',
        degree: 'MUDr',
        schools: [
          {
            schoolAddress: 'Bratislava, Slovakia',
            schoolName: 'FIIT STU',
            attendedSchoolFromYear: '2015',
            attendedSchoolToYear: '2020',
            schoolSpecialisation: 'IT'
          }
        ]
      },
      workExperience: {
        jobs: [
          {
            companyName: 'SIEMENS',
            companyAddress: 'Bratislava',
            companyPosition: 'kooooder',
            workDescription: 'kodil som vela',
            hiredInCompanyFromDate: new Date(),
            hiredInCompanyToDate: new Date()
          }
        ]
      },
      role: 'Surgeon',
      created: new Date(),
      hireDate: new Date()
    };

    // when
    component.setPicture(currentEmployee);

    // // then
    expect(component.pictureSrc).toBe('assets/user-male-avatar.png');
  });
});
