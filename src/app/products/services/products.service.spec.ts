import { TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment.development';
import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product } from '../models/Product';

describe('ProductsService', () => {
  let service: ProductsService;
  
  let httpMock: HttpTestingController;

  let productMockup: Product = {
    id: '123',
    logo: 'Logo',
    name: 'name',
    date_release: '2024-07-07',
    date_revision: '2024-07-07',
    description: 'Description'
  }

  let productsList: Product[] = new Array(10).fill(productMockup);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get true/false for checkProductByID', (done) => {

    service.checkByID('123').subscribe(data => {
      expect(data).toBeTruthy();
      done();
    });

    const req = httpMock.expectOne(`${environment.backendUrl}/bp/products/verification/123`);
    
    req.flush(true);
  });

  it('should correctly create a product', (done) => {

    service.createProduct(productMockup).subscribe(data => {
      expect(data).toEqual({message: 'Correct', data: productMockup});
      done();
    });

    const req = httpMock.expectOne(`${environment.backendUrl}/bp/products`);
    
    req.flush({message: 'Correct', data: productMockup});
  });

  it('should correctly delete a product', (done) => {

    service.deleteProduct('123').subscribe(data => {
      expect(data).toEqual({message: 'Product removed successfully'});
      done();
    });

    const req = httpMock.expectOne(`${environment.backendUrl}/bp/products/123`);
    
    req.flush({message: 'Product removed successfully'});
  });
  
  it('should correctly get products', (done) => {

    service.getProducts().subscribe(data => {
      expect(data).toEqual(productsList);
      done();
    });

    const req = httpMock.expectOne(`${environment.backendUrl}/bp/products`);
    
    req.flush({data: productsList});
  });

  it('should correctly get one product by id', (done) => {

    service.getProductById('123').subscribe(data => {
      expect(data).toEqual(productsList[0]);
      done();
    });

    const req = httpMock.expectOne(`${environment.backendUrl}/bp/products`);
    
    req.flush({data: productsList});
  });
  
  it('should correctly return undefined if product does not exist', (done) => {

    service.getProductById('456').subscribe(data => {
      expect(data).toBeUndefined();
      done();
    });

    const req = httpMock.expectOne(`${environment.backendUrl}/bp/products`);
    
    req.flush({data: productsList});
  });

  it('should correctly update the product', (done) => {

    service.updateProduct(productMockup).subscribe(data => {
      expect(data).toEqual({message: 'Product updated successfully', data: productMockup});
      done();
    });

    const req = httpMock.expectOne(`${environment.backendUrl}/bp/products/123`);
    
    req.flush({message: 'Product updated successfully', data: productMockup});
  });

});
