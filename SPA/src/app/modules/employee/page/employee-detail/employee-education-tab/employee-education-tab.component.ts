import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { EnumModel } from '@core/models/enum-model';
import { Store, select } from '@ngrx/store';
import { selectEmployeeEnums } from '@core/store/employee-model/employee-model.selectors';

@Component({
  selector: 'app-employee-education-tab',
  templateUrl: './employee-education-tab.component.html',
  styleUrls: ['./employee-education-tab.component.css']
})
export class EmployeeEducationTabComponent implements OnInit {

  @Input()
  public form: FormGroup;
  public educationalLevels: EnumModel[] = [];

  constructor(private store: Store) { }

  public ngOnInit(): void {
    this.store.pipe(select(selectEmployeeEnums)).subscribe((data) => {
      this.educationalLevels = data.enums.educationalLevels;
    });
  }

  public schools(): FormArray {
    return this.form.get(['education', 'schools']) as FormArray;
  }
}
