import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { State } from '@core/store';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';

import { EmployeeEducationTabComponent } from './employee-education-tab.component';

describe('EmployeeEducationTabComponent', () => {
  let component: EmployeeEducationTabComponent;
  let fixture: ComponentFixture<EmployeeEducationTabComponent>;

  const storeStub: Partial<Store<State>> = {
    select: () => EMPTY,
    pipe: () => EMPTY,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, SharedModule],
      declarations: [EmployeeEducationTabComponent],
      providers: [{ provide: Store, useValue: storeStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEducationTabComponent);
    component = fixture.componentInstance;

    const formBuilder = TestBed.inject(FormBuilder);

    component.form = formBuilder.group({
      education: formBuilder.group({
        highestEducationalLevelAttained: '',
        degree: '',
        schools: formBuilder.array([
          formBuilder.group(
            {
              schoolAddress: '',
              schoolName: '',
              attendFromYear: '',
              attendToYear: '',
              schoolSpecialisation: ''
            })
        ])
      })
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
