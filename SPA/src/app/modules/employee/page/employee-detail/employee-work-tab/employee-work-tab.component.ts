import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-employee-work-tab',
  templateUrl: './employee-work-tab.component.html',
  styleUrls: ['./employee-work-tab.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeWorkTabComponent {
  @Input()
  public form: FormGroup;

  jobs(): FormArray {
    return this.form.get(['workExperience', 'jobs']) as FormArray;
  }
}
