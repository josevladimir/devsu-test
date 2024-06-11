import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenWrapperComponent } from './components/screen-wrapper/screen-wrapper.component';
import { ProductLogoComponent } from './components/product-logo/product-logo.component';
import { PaginatedTableComponent } from './components/paginated-table/paginated-table.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ScreenWrapperComponent,
    ProductLogoComponent,
    PaginatedTableComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ScreenWrapperComponent,
    ProductLogoComponent,
    PaginatedTableComponent
  ]
})
export class CoreModule { }
