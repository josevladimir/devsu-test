import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { NewProductComponent } from './screens/new-product/new-product.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'new', component: NewProductComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
