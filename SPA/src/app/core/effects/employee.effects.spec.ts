import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { SharedModule } from '@shared/shared.module';
import { Observable } from 'rxjs';

import { EmployeeEffects } from './employee.effects';

describe('EmployeeEffects', () => {
  let actions$: Observable<any>;
  let effects: EmployeeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule],
      providers: [
        EmployeeEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<EmployeeEffects>(EmployeeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
