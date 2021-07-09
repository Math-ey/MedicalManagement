import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AppEffects } from './app.effects';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared/shared.module';

describe('AppEffects', () => {
  let actions$: Observable<any>;
  let effects: AppEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule],
      providers: [
        AppEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(AppEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
