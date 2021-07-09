import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../../../../../shared/shared.module';
import { EmployeeWorkTabComponent } from './employee-work-tab.component';

describe('EmployeeWorkTabComponent', () => {
  let component: EmployeeWorkTabComponent;
  let fixture: ComponentFixture<EmployeeWorkTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, SharedModule],
      declarations: [EmployeeWorkTabComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWorkTabComponent);
    component = fixture.componentInstance;

    const formBuilder = TestBed.inject(FormBuilder);

    component.form = formBuilder.group({
      workExperience: formBuilder.group({
        jobs: formBuilder.array([
          formBuilder.group({
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

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
