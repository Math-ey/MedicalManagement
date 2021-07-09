import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { EnumModel } from '@core/models/enum-model';
import { selectEmployeeEnums } from '@core/store/employee-model/employee-model.selectors';

@Component({
  selector: 'app-employee-personal-tab',
  templateUrl: './employee-personal-tab.component.html',
  styleUrls: ['./employee-personal-tab.component.css']
})
export class EmployeePersonalTabComponent implements OnInit {

  @Input()
  public form: FormGroup;

  public maritalStatus: EnumModel[] = [];
  public roles: EnumModel[] = [];
  public genders: EnumModel[] = [];

  constructor(private store: Store) { }

  public ngOnInit(): void {
    this.store.pipe(select(selectEmployeeEnums)).subscribe((data) => {
      this.maritalStatus = data.enums.maritalStatus;
      this.roles = data.enums.roles;
      this.genders = data.enums.genders;
    });
  }
}
