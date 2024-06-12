import { Component, inject } from '@angular/core';
import { ProductsService } from './services/products.service';
import { TableColumn } from '../core/models/TableColumns';
import { Product } from './models/Product';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ContextualMenuItem } from '../core/models/ContextualMenuItem';
import { Router } from '@angular/router';
import { GeneralService } from '../core/services/general.service';
import { TitleCasePipe } from '@angular/common';
import { normalizeToSearch } from '../core/utils/StringUtils';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  private productsService: ProductsService = inject(ProductsService);
  private generalService: GeneralService = inject(GeneralService);
  private router: Router = inject(Router);

  private contextualMenuItems: ContextualMenuItem[] = [
    {value: 'edit', display: 'Editar' },
    {value: 'delete', display: 'Eliminar' }
  ];
  
  public productsColumns: TableColumn[] = [
    { name: 'logo', display: 'Logo', centered: true },
    { name: 'name', display: 'Nombre del producto' },
    { name: 'description', display: 'Descripción' },
    { name: 'date_release', display: 'Fecha de Liberación' },
    { name: 'date_revision', display: 'Fecha de reestructuración' },
    { name: 'menu', display: '', type: 'menu', menuItems: this.contextualMenuItems },
  ];

  private products: Product[] | undefined;
  public filteredProducts: Product[] | undefined;
  public searchTermControl: FormControl = new FormControl('');

  constructor () {
    this.loadProducts();
    this.searchTermControl.valueChanges.pipe(
      debounceTime(500)
    ).subscribe({
      next: (value: string) => this.filterProducts(value)
    })
  }

  handleContextualMenu = (value: any) => {
    switch(value.action){
      case 'edit':
        this.router.navigate(['products', value.record.id]);
        break;
      case 'delete':
        let deleteLegend: string = `¿Estás seguro de eliminar el producto ${new TitleCasePipe().transform(value.record.name.trim())}?`
        this.generalService.openConfirmDialog(deleteLegend, () => {
          this.generalService.startLoading('Eliminando producto...');
          this.productsService.deleteProduct(value.record.id).subscribe({
            next: (response: any) => {
              this.generalService.showSuccessToast('Producto eliminado correctamente');
              this.loadProducts();
            }
          })
        }); 
        break;
      default:
        break;
    }
  }

  loadProducts(){
    this.products = undefined;
    this.filteredProducts = undefined;
    this.productsService.getProducts().subscribe({
      next: (productsResponse: Product[]) => {
        this.products = productsResponse;
        this.filteredProducts = productsResponse;
      }
    });
  }

  filterProducts(value: string) {
    if(!value.trim()) return this.filteredProducts = this.products;
    
    value = normalizeToSearch(value);

    this.filteredProducts = this.products?.filter((product: Product) => {
      return normalizeToSearch(product.name).includes(value) || normalizeToSearch(product.description).includes(value);
    });
  }

}
