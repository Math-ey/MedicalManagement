import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';





@NgModule({
  exports: [
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSnackBarModule
  ]
})
export class MaterialModule { }
