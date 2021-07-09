import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgProgressModule } from 'ngx-progressbar';

import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MaterialModule } from './material.module';
import { AgePipe } from './pipes/age.pipe';

const THIRD_MODULES = [
  MaterialModule,
  NgProgressModule
];

const COMPONENTS = [
  HeaderComponent,
  SidebarComponent
];

const PIPES = [
  AgePipe
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ...THIRD_MODULES
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ...THIRD_MODULES,
    ...COMPONENTS,
    ...PIPES
  ]
})
export class SharedModule { }
