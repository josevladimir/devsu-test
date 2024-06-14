import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Product, ProductBackendResponse } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  checkByID = (id: string): Observable<boolean> => {
    return this.http.get<boolean>(`${environment.backendUrl}/bp/products/verification/${id}`);
  }

  createProduct(data: Product): Observable<ProductBackendResponse> {
    return this.http.post<ProductBackendResponse>(`${environment.backendUrl}/bp/products`, data);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<boolean>(`${environment.backendUrl}/bp/products/${id}`);
  }
  
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.backendUrl}/bp/products`)
      .pipe(
        map((response: any) => response.data)
      );
  }
  
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product|undefined>(`${environment.backendUrl}/bp/products`)
      .pipe(
        map((response: any) => {
          return response.data.find((product: Product) => product.id == id);
        })
      )
  }

  updateProduct(data: Product): Observable<ProductBackendResponse> {
    let id: string = data.id!;
    delete data.id;
    return this.http.put<ProductBackendResponse>(`${environment.backendUrl}/bp/products/${id}`, data);
  }

}
