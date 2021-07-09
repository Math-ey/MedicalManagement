import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { State } from '@core/store';
import { Store } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { EMPTY } from 'rxjs';

import { EmployeeListComponent } from './employee-list.component';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;

  const storeStub: Partial<Store<State>> = {
    pipe: () => EMPTY,
    dispatch: () => EMPTY,
    select: () => EMPTY
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        BrowserAnimationsModule
      ],
      declarations: [EmployeeListComponent],
      providers: [{ provide: Store, useValue: storeStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
