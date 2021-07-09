/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { State } from '@core/store';
import { Store } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { EMPTY } from 'rxjs';

import { TreatmentListComponent } from './treatment-list.component';

describe('TreatmentListComponent', () => {
  let component: TreatmentListComponent;
  let fixture: ComponentFixture<TreatmentListComponent>;

  const storeStub: Partial<Store<State>> = {
    pipe: () => EMPTY,
    dispatch: () => EMPTY,
    select: () => EMPTY
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule, BrowserAnimationsModule],
      declarations: [TreatmentListComponent],
      providers: [{ provide: Store, useValue: storeStub }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
