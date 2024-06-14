import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { parseDate } from 'src/app/core/utils/DateUtils';
import { DevsuFormValidators, getControl } from 'src/app/core/utils/FormsUtils';
import { ProductsService } from '../../services/products.service';
import { Product, ProductBackendResponse } from '../../models/Product';
import { GeneralService } from 'src/app/core/services/general.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-new-product',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{

  public productForm: FormGroup;
  public product: Product;
  
  private generalService: GeneralService = inject(GeneralService);
  private productsService: ProductsService = inject(ProductsService);
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {

    this.activatedRoute.params.subscribe({
      next: ({id}: any) => {
        if(id) {
          this.generalService.startLoading('Cargando');
          this.productsService.getProductById(id).subscribe({
            next: (product: Product) => {
              if(product) {
                this.product = product;
                this.generateProductForm();
              } else {
                this.generalService.showErrorToast('No se encontró el producto seleccionado.')
                this.router.navigate(['/products']);
              }
            }
          });
        }
        else this.generateProductForm();
      }
    });

  }

  generateProductForm(){
    this.productForm = new FormGroup({
      id: new FormControl(this.product?.id ||'', [Validators.required, Validators.minLength(3), Validators.maxLength(10)], DevsuFormValidators.uniqueID(this.productsService.checkByID)),
      name: new FormControl(this.product?.name ||'', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      description: new FormControl(this.product?.description ||'', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      logo: new FormControl(this.product?.logo ||'', Validators.required),
      date_release: new FormControl(this.product?.date_release ||'', [Validators.required, DevsuFormValidators.todayOrAfter]),
      date_revision: new FormControl(this.product?.date_revision ||'', [Validators.required])
    });
    if(this.product) this.productForm.get('id')?.disable();
    this.productForm.get('date_revision')?.disable();
  }
  
  getControl(formControlName: string) {
    return getControl(formControlName, this.productForm);
  }

  onDateReleaseChange(date: any) {
    if(date){
      let releaseDate: Date = new Date(date);
      let fullYear: number = releaseDate.getFullYear();
      releaseDate.setFullYear(fullYear + 1);
      this.productForm.get('date_revision')?.setValue(parseDate(releaseDate));
    }
  }
  
  resetForm() {
    this.productForm.reset();
    if(this.product) this.productForm.get('id')?.setValue(this.product?.id);
  }

  saveProduct() {
    this.productForm.enable();
    
    if(this.productForm.invalid){
      this.productForm.markAllAsTouched();
      return this.generalService.showInfoToast('Por favor complete el formulario correctamente');
    }

    this.generalService.startLoading(this.product ? 'Actualizando producto...' : 'Creando producto...');
    if(this.product){
      this.productsService.updateProduct(this.productForm.value).subscribe({
        next: (response: ProductBackendResponse) => {
          this.router.navigate(['/all']);
          this.generalService.showSuccessToast('Producto actualizado correctamente.')
        },
        complete: () => {
          this.productForm.get('date_revision')?.disable();
          this.productForm.get('id')?.disable();
        }
      });
    }else{
      this.productsService.createProduct(this.productForm.value).subscribe({
        next: (response: ProductBackendResponse) => {
          this.router.navigate(['/all']);
          this.generalService.showSuccessToast('Producto creado correctamente.')
        },
        complete: () => {
          this.productForm.get('date_revision')?.disable();
        }
      });
    }
  }

}
