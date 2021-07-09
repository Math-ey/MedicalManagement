import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { State } from '@core/store';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';

import { EmployeePersonalTabComponent } from './employee-personal-tab.component';

describe('EmployeePersonalTabComponent', () => {
  let component: EmployeePersonalTabComponent;
  let fixture: ComponentFixture<EmployeePersonalTabComponent>;

  const storeStub: Partial<Store<State>> = {
    select: () => EMPTY,
    pipe: () => EMPTY,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, SharedModule],
      declarations: [EmployeePersonalTabComponent],
      providers: [{ provide: Store, useValue: storeStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePersonalTabComponent);
    component = fixture.componentInstance;

    const formBuilder = TestBed.inject(FormBuilder);
    component.form = formBuilder.group({
      id: '',
      role: '',
      created: '',
      hireDate: '',
      personal: formBuilder.group({
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
      })
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
