import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenWrapperComponent } from './components/screen-wrapper/screen-wrapper.component';
import { ProductLogoComponent } from './components/product-logo/product-logo.component';
import { PaginatedTableComponent } from './components/paginated-table/paginated-table.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { IconComponent } from './components/icon/icon.component';
import { ContextualMenuComponent } from './components/contextual-menu/contextual-menu.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ToastsComponent } from './components/toasts/toasts.component';

@NgModule({
  declarations: [
    ScreenWrapperComponent,
    ProductLogoComponent,
    PaginatedTableComponent,
    SpinnerComponent,
    FormFieldComponent,
    LoadingScreenComponent,
    IconComponent,
    ContextualMenuComponent,
    DialogComponent,
    ToastsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ScreenWrapperComponent,
    ProductLogoComponent,
    PaginatedTableComponent,
    FormFieldComponent,
    LoadingScreenComponent,
    IconComponent,
    ContextualMenuComponent,
    DialogComponent,
    ToastsComponent
  ]
})
export class CoreModule { }
