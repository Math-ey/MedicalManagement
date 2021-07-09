import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TreatmentEffects } from './treatment.effects';

describe('TreatmentEffects', () => {
  let actions$: Observable<any>;
  let effects: TreatmentEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        TreatmentEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<TreatmentEffects>(TreatmentEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
