import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLogoComponent } from './product-logo.component';

describe('ProductLogoComponent', () => {
  let component: ProductLogoComponent;
  let fixture: ComponentFixture<ProductLogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductLogoComponent]
    });
    fixture = TestBed.createComponent(ProductLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
