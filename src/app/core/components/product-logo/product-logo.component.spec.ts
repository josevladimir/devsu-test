import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductLogoComponent } from './product-logo.component';
import { FormsModule } from '@angular/forms';

describe('ProductLogoComponent', () => {
  let fixture: ComponentFixture<ProductLogoComponent>;
  let component: ProductLogoComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ProductLogoComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductLogoComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  
  it('should correctly get nameLetters', () => {
    component.productName = 'Tarjetas de Crédito';
    component.ngOnInit();
    expect(component.nameLetters).toBe('TD');
  });
  
  it('should show letters when no has logo', () => {
    component.productName = 'Tarjetas de Crédito';
    component.ngOnInit();
    fixture.detectChanges();
    let element = fixture.nativeElement.querySelector('.product-logo');
    expect(element.textContent).toContain('TD');
  });
  
  it('should show logo if logo is passed', () => {
    component.productLogo = 'http://logo.com';
    fixture.detectChanges();
    let element = fixture.nativeElement.querySelector('.product-logo img');
    expect(element?.src).toContain(component.productLogo);
  });

});
