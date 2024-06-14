import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { GeneralService } from '../core/services/general.service';
import { ProductsService } from './services/products.service';
import { of } from 'rxjs';
import { Product } from './models/Product';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PaginatedTableComponent } from '../core/components/paginated-table/paginated-table.component';
import { By } from '@angular/platform-browser';
import { NgZone } from '@angular/core';


describe('ProductsComponent', () => {
  let fixture: ComponentFixture<ProductsComponent>;
  let component: ProductsComponent;
  let generalService: GeneralService;
  let ngZone: NgZone;
  
  let productMockup: Product = {
    id: '123',
    logo: 'Logo',
    name: 'name',
    date_release: '2024-07-07',
    date_revision: '2024-07-07',
    description: 'Description'
  }

  let productsList: Product[] = new Array(10).fill(1);
  productsList = productsList.map((_, i) => ({...productMockup, name: productMockup.name + i, logoObject: {logo: productMockup.logo, name: productMockup.name + i}}));

  let productsServiceMockup = {
    deleteProduct: jest.fn().mockReturnValue(of({message: 'Product removed successfully'})),
    getProducts: jest.fn().mockReturnValue(of(productsList))
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreModule, FormsModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [ProductsComponent],
      providers: [
        {provide: GeneralService},
        {provide: ProductsService, useValue: productsServiceMockup }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ProductsComponent);
    ngZone = TestBed.inject(NgZone);
    generalService = TestBed.inject(GeneralService);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  
  it('should correctly load products', () => {
    expect(component.filteredProducts).toEqual(productsList);
  });
  
  it('should correctly valueChanges subscribe', () => {
    expect(component.subscription).not.toBeNull();
  });

  it('should correctly trigger filter function', (done) => {
    let filterProductsMethod = jest.spyOn(component, 'filterProducts');
    component.searchTermControl.setValue('Descr');
    setTimeout(() => {
      expect(filterProductsMethod).toHaveBeenCalled();
      done();
    }, 700);
  });
  
  it('should correctly filter products function', () => {  
    component.filterProducts('1');
    expect(component.filteredProducts).toEqual([{
      ...productMockup,
      name: productMockup.name+'1',
      logoObject: {
        logo: productMockup.logo,
        name: productMockup.name+'1'
      }
    }]);
  });

  it('should correctly return all products on filter if searchTerm is blank', () => {
    component.filterProducts(' ');
    expect(component.filteredProducts).toEqual(productsList);
  });
  
  it('should correctly handle contextualMenu', () => {
    ngZone.run(() => {
      let handleContextualMenuMethod = jest.spyOn(component, 'handleContextualMenu');
      let paginatedTable: PaginatedTableComponent = fixture.debugElement.query(By.directive(PaginatedTableComponent)).componentInstance;
      paginatedTable.onContextualMenuSelected.emit({action: 'edit', record: productMockup});
      expect(handleContextualMenuMethod).toHaveBeenCalled();
    });
  });

  it('should correctly handle contextualMenu delete option', () => {
    let openConfirmMethod = jest.spyOn(generalService, 'openConfirmDialog');
    let paginatedTable: PaginatedTableComponent = fixture.debugElement.query(By.directive(PaginatedTableComponent)).componentInstance;
    paginatedTable.onContextualMenuSelected.emit({action: 'delete', record: productMockup});
    expect(openConfirmMethod).toHaveBeenCalled();
  });
  
  it('should correctly handle contextualMenu nothing selected', () => {
    let paginatedTable: PaginatedTableComponent = fixture.debugElement.query(By.directive(PaginatedTableComponent)).componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    paginatedTable.onContextualMenuSelected.emit({action: '', record: productMockup});
    expect(fixture).toMatchSnapshot();
  });

});
