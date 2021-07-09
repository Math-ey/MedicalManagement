import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { State } from '@core/store';
import { loadEmployeeModels } from '@core/store/employee-model/employee-model.actions';
import { EmployeeModel } from '@core/store/employee-model/employee-model.model';
import { selectEmployeeList, selectEmployeeLoading, selectEmployeeTotal } from '@core/store/employee-model/employee-model.selectors';
import { select, Store } from '@ngrx/store';
import { ProgressBarService } from '@shared/services/progress-bar.service';
import { Subject, Subscription, merge } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { selectEmployeeEnums } from '../../../../core/store/employee-model/employee-model.selectors';
import { EnumModel } from '@core/models/enum-model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public displayedColumns: string[] = ['photo', 'fullname', 'role', 'clinic', 'birthDate'];
  public dataSource: MatTableDataSource<EmployeeModel>;

  public noData: EmployeeModel[] = [];
  public employeeTotal: number;
  public isLoading = false;

  public pageSize = 5;
  public pageSizeOptions: number[] = [5, 10, 20];

  public filterValue = '';
  public filterSubject = new Subject<string>();

  private subscription: Subscription = new Subscription();

  public roles: EnumModel[] = [];

  constructor(
    private store: Store<State>,
    private router: Router,
    private progressBar: ProgressBarService
  ) { }

  public ngOnInit(): void {
    this.store.pipe(select(selectEmployeeList)).subscribe(employees => this.initializeData(employees));
    this.store.pipe(select(selectEmployeeTotal)).subscribe(total => this.employeeTotal = total);
    this.subscription.add(this.store.select(selectEmployeeLoading)
      .subscribe(loading => {
        this.isLoading = loading;

        if (loading) {
          this.progressBar.startLoadning();
          this.dataSource = new MatTableDataSource(this.noData);
        } else {
          this.progressBar.completeLoading();
        }
      })
    );

    this.store.pipe(select(selectEmployeeEnums)).subscribe((data) => {
      if (data.enums) {
        this.roles = Object.assign({}, ...data.enums.roles.map(x => ({ [x.id]: x.value })));
      }
    });
  }

  public ngAfterViewInit(): void {
    this.loadEmployees();

    const filter$ = this.filterSubject.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      tap((value: string) => {
        this.paginator.pageIndex = 0;
        this.filterValue = value;
      })
    );

    this.subscription.add(merge(filter$, this.paginator.page).pipe(
      tap(() => this.loadEmployees())
    ).subscribe());
  }

  public initializeData(employees: EmployeeModel[]) {
    this.dataSource = new MatTableDataSource(employees.length ? employees : this.noData);
  }

  private loadEmployees() {
    this.store.dispatch(loadEmployeeModels({
      loadListParams: {
        query: this.filterValue.toLocaleLowerCase(),
        page: this.paginator.pageIndex,
        limit: this.paginator.pageSize || this.pageSize
      }
    }));
  }

  getRecord(employee): void {
    this.router.navigate(['/employee', employee.id]);
  }
}
