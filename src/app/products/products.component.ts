import { Component, inject } from '@angular/core';
import { ProductsService } from './services/products.service';
import { TableColumn } from '../core/models/TableColumns';
import { Product } from './models/Product';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  private productsService: ProductsService = inject(ProductsService);

  public productsColumns: TableColumn[] = [
    { name: 'logo', display: 'Logo', centered: true },
    { name: 'name', display: 'Nombre del producto' },
    { name: 'description', display: 'Descripción' },
    { name: 'date_release', display: 'Fecha de Liberación' },
    { name: 'date_revision', display: 'Fecha de reestructuración' },
  ];

  private products: Product[];
  public filteredProducts: Product[];
  public searchTermControl: FormControl = new FormControl('');

  constructor () {
    this.loadProducts();
    this.searchTermControl.valueChanges.pipe(
      debounceTime(500)
    ).subscribe({
      next: (value: string) => this.filterProducts(value)
    })
  }

  loadProducts(){
    this.productsService.getProducts().subscribe({
      next: (productsResponse: Product[]) => {
        this.products = productsResponse;
        this.filteredProducts = productsResponse;
      }
    });
  }

  filterProducts(value: string) {
    if(!value.trim()) return this.filteredProducts = this.products;
    
    this.filteredProducts = this.products.filter((product: Product) => {
      return product.name.includes(value) || product.description.includes(value);
    });
  }

}
