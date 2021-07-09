import { Injectable } from '@angular/core';
import { NgProgressRef } from 'ngx-progressbar';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  public progressRef: NgProgressRef;

  constructor() { }

  public startLoadning() {
    this.progressRef.start();
  }

  public completeLoading() {
    this.progressRef.complete();
  }
}
