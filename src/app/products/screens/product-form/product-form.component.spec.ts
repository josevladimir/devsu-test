import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
import { GeneralService } from '../../../core/services/general.service';
import { ProductsService } from '../../services/products.service';
import { BehaviorSubject, of } from 'rxjs';
import { Product } from '../../models/Product';
import { CoreModule } from '../../../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormFieldComponent } from 'src/app/core/components/form-field/form-field.component';
import { By } from '@angular/platform-browser';


describe('ProductFormComponent', () => {
  let fixture: ComponentFixture<ProductFormComponent>;
  let component: ProductFormComponent;
  let generalService: GeneralService;
  let productsService: ProductsService;
  let ngZone: NgZone;
  let paramsSubject: BehaviorSubject<any>;
  
  let productMockup: Product = {
    id: '123',
    logo: 'Logo',
    name: 'name example',
    date_release: '2024-07-07',
    date_revision: '2024-07-07',
    description: 'Description'
  }

  let productsList: Product[] = new Array(10).fill(1);
  productsList = productsList.map((_, i) => ({...productMockup, name: productMockup.name + i, logoObject: {logo: productMockup.logo, name: productMockup.name + i}}));

  let productsServiceMockup = {
    deleteProduct: jest.fn().mockReturnValue(of({message: 'Product removed successfully'})),
    getProducts: jest.fn().mockReturnValue(of(productsList)),
    getProductById: jest.fn().mockReturnValue(of(productMockup)),
    checkByID: jest.fn().mockReturnValue(of(false)),
    createProduct: jest.fn().mockReturnValue(of({message: 'Product created successfully', data: productMockup})),
    updateProduct: jest.fn().mockReturnValue(of({message: 'Product updated successfully', data: productMockup})),
  }

  let generalServiceMockup = {
    startLoading: jest.fn(),
    showErrorToast: jest.fn(),
    showInfoToast: jest.fn()
  }

  beforeEach(async () => {
    paramsSubject = new BehaviorSubject({ });
    await TestBed.configureTestingModule({
      imports: [CoreModule, FormsModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [ProductFormComponent],
      providers: [
        {provide: GeneralService, useValue: generalServiceMockup },
        {provide: ProductsService, useValue: productsServiceMockup },
        {
          provide: ActivatedRoute, 
          useValue: { params: paramsSubject.asObservable() }
        },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ProductFormComponent);
    ngZone = TestBed.inject(NgZone);
    generalService = TestBed.inject(GeneralService);
    productsService = TestBed.inject(ProductsService);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  
  it('should disable id Control if exist a product', () => {
    component.product = productMockup;
    component.generateProductForm();
    expect(component.productForm.get('id')?.disabled).toBeTruthy();
  });
  
  it('should reset form on edition', () => {
    component.product = productMockup;
    component.generateProductForm();
    let initFormValue = component.productForm.value;
    component.resetForm();
    component.productForm.enable();
    let lastFormValue = component.productForm.value;
    expect(
      initFormValue != lastFormValue &&
      lastFormValue.id == component.product.id &&
      lastFormValue.name == null &&
      lastFormValue.description == null &&
      lastFormValue.logo == null &&
      lastFormValue.date_release == null &&
      lastFormValue.date_revision == null
    ).toBeTruthy();
  });

  it('should initialize product for creation', () => {
    let generateFormMethod = jest.spyOn(component, 'generateProductForm');
    fixture.detectChanges();
    expect(generalService.startLoading).not.toHaveBeenCalled();
    expect(productsService.getProductById).not.toHaveBeenCalled();
    expect(generateFormMethod).toHaveBeenCalled();
  });
  
  it('should initialize product for edition', () => {
    paramsSubject.next({id: '123'});
    fixture.detectChanges();
    expect(generalService.startLoading).toHaveBeenCalled();
    expect(productsService.getProductById).toHaveBeenCalledWith('123');
  });

  it('should not initialize when product no exists', () => {
    productsServiceMockup.getProductById.mockReturnValue(of(undefined));
    paramsSubject.next({id: '123'});
    fixture.detectChanges();
    expect(generalService.showErrorToast).toHaveBeenCalled();
  });

  it('should set revision date onReleaseDateChange', () => {
    component.generateProductForm();
    fixture.detectChanges();
    let formFields: DebugElement[] = fixture.debugElement.queryAll(By.directive(FormFieldComponent));
    let dateReleaseInput = formFields.find((formField: DebugElement) => formField.attributes['label'] == 'Fecha Liberación');
    if(dateReleaseInput){
      (dateReleaseInput.componentInstance as FormFieldComponent).emitChange({target: { value: '2024-05-06'} });
      expect(component.productForm.get('date_revision')?.value).toBe('2025-05-05');
    }else{
      fail('No se ha renderizado el componente de input para la fecha de liberación');
    }
  });

  it('should return a formControl', () => {
    component.generateProductForm();
    
    expect(component.getControl('id')).toEqual(component.productForm.get('id'));
  });

  it('should correctly save Product', () => {
    const createProductSpy = jest.spyOn(productsService, 'createProduct').mockClear();
    const updateProductSpy = jest.spyOn(productsService, 'updateProduct').mockClear();

    ngZone.run(() => {
      component.generateProductForm();
      component.productForm.get('id')?.setValue('abc-123');
      component.productForm.get('name')?.setValue('Nombre del producto');
      component.productForm.get('description')?.setValue('Description');
      component.productForm.get('logo')?.setValue('Logo');
      component.productForm.get('date_release')?.setValue('2024-07-06');
      component.productForm.get('date_revision')?.setValue('2025-07-05');

      component.saveProduct();
      
      expect(generalService.startLoading).toHaveBeenCalledWith('Creando producto...');
      expect(createProductSpy).toHaveBeenCalled();
      expect(updateProductSpy).not.toHaveBeenCalled();
    });
  });
  
  it('should correctly update Product', () => {
    const createProductSpy = jest.spyOn(productsService, 'createProduct').mockClear();
    const updateProductSpy = jest.spyOn(productsService, 'updateProduct').mockClear();
    
    ngZone.run(() => {
      component.product = productMockup;
      component.generateProductForm();
      fixture.detectChanges();
  
      component.saveProduct();
      
      expect(generalService.startLoading).toHaveBeenCalledWith('Actualizando producto...');
      expect(updateProductSpy).toHaveBeenCalled();
      expect(createProductSpy).not.toHaveBeenCalled();
    });
  });

  
  it('should correctly handle invalid ProductForm', () => {
    const createProductSpy = jest.spyOn(productsService, 'createProduct').mockClear();
    const updateProductSpy = jest.spyOn(productsService, 'updateProduct').mockClear();
    
    ngZone.run(() => {
      component.generateProductForm();
      fixture.detectChanges();
  
      component.saveProduct();

      expect(generalService.showInfoToast).toHaveBeenCalledWith('Por favor complete el formulario correctamente');
      expect(updateProductSpy).not.toHaveBeenCalled();
      expect(createProductSpy).not.toHaveBeenCalled();
    });
  });
});
