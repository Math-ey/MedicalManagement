import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GroupBy } from '@core/models/group-by';
import { loadTreatmentModels } from '@core/store/treatment-model/treatment-model.actions';
import { TreatmentModel } from '@core/store/treatment-model/treatment-model.model';
import { selectTreatmentList, selectTreatmentEnums, selectTreatmentLoading } from '@core/store/treatment-model/treatment-model.selectors';
import { select, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { ProgressBarService } from '@shared/services/progress-bar.service';

@Component({
  selector: 'app-treatment-list',
  templateUrl: './treatment-list.component.html',
  styleUrls: ['./treatment-list.component.css']
})
export class TreatmentListComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = ['id', 'title', 'type', 'mainDoctorName', 'date', 'status'];
  public dataSource: MatTableDataSource<TreatmentModel | GroupBy>;
  public noData: any[] = [];
  public employeeTotal: number;
  public treatments: TreatmentModel[];
  public treatmentTypes: { [id: number]: string; } = {};
  public treatmentStatus: { [id: number]: string; } = {};

  public color: ThemePalette = 'accent';
  public statusViewChecked = false;
  public disabled = false;
  public isLoading = false;

  private subscription: Subscription = new Subscription();

  constructor(
    private store: Store,
    private progressBar: ProgressBarService
  ) { }

  ngOnInit() {
    this.store.pipe(select(selectTreatmentEnums)).subscribe((data) => {
      this.treatmentTypes = Object.assign({}, ...data.enums.treatmentTypes.map(x => ({ [x.id]: x.value })));
      this.treatmentStatus = Object.assign({}, ...data.enums.treatmentStatus.map(x => ({ [x.id]: x.value })));
    });

    this.store.pipe(select(selectTreatmentList)).subscribe(treatments => {
      this.treatments = treatments;
      this.initializeData(treatments);
    });

    this.subscription.add(this.store.select(selectTreatmentLoading)
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
  }

  ngAfterViewInit(): void {
    this.store.dispatch(loadTreatmentModels());
  }

  public changeView(change: MatSlideToggleChange) {
    this.statusViewChecked = change.checked;
    this.initializeData(this.treatments);
  }

  public initializeData(treatments: TreatmentModel[]) {
    let treatmentsDataView: (TreatmentModel | GroupBy)[] = treatments;

    if (this.statusViewChecked) {
      treatmentsDataView = this.grouByStatus(treatments);
    }

    this.dataSource = new MatTableDataSource(treatmentsDataView.length ? treatmentsDataView : this.noData);
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public sortData(sort: Sort) {
    const data = this.treatments.slice();
    if (!sort.active || sort.direction === '') {
      this.initializeData(data);
      return;
    }

    const sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        case 'type': return compare(a.type, b.type, isAsc);
        case 'date': return compareDates(a.date, b.date, isAsc);
        default: return 0;
      }
    });

    this.initializeData(sortedData);
  }

  public isGroup(index: number, item: GroupBy): boolean {
    return item.isGroupBy;
  }

  private grouByStatus(treatments: TreatmentModel[]): (TreatmentModel | GroupBy)[] {
    const treatmentsGrouped: (TreatmentModel | GroupBy)[] = [];

    const treatmentGroups = _.groupBy(treatments, 'status');
    for (const [status, treatmentGroup] of Object.entries(treatmentGroups)) {
      treatmentsGrouped.push({
        initial:  this.treatmentStatus[status] || status,
        isGroupBy: true
      });

      treatmentsGrouped.push(...treatmentGroup);
    }

    return treatmentsGrouped;
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function compareDates(a: Date | string, b: Date | string, isAsc: boolean) {
  const dateA = new Date(a); const dateB = new Date(b);
  return (dateA.getTime() < dateB.getTime() ? -1 : 1) * (isAsc ? 1 : -1);
}
