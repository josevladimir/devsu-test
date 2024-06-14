import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormFieldComponent } from './form-field.component';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DevsuFormValidators } from '../../utils/FormsUtils';
import { parseDate } from '../../utils/DateUtils';
import { Observable, of } from 'rxjs';

describe('FormFieldComponent', () => {
  let fixture: ComponentFixture<FormFieldComponent>;
  let component: FormFieldComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [FormFieldComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('');
    component.label = 'Email';
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle error initialization without control input', () => {
    component.control = null;
    fixture.detectChanges();
    expect(() => {
      component.ngOnChanges({});
    }).toThrow('Form field must have a control');
  });

  it('should correctly initialization', () => {

    let label = fixture.nativeElement.querySelector('label')?.textContent;

    expect(label).toContain(component.label);
  });
  
  it('should correctly link the input with emitChanges Method', () => {
    const emitChangeMethod = jest.spyOn(component, 'emitChange');
    let input = fixture.nativeElement.querySelector('input');
    input.value = 'other';
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    
    expect(emitChangeMethod).toHaveBeenCalled();
    
  });

  it('should emit changes', () => {
    let input = fixture.nativeElement.querySelector('input');
    input.value = 'newValue';
    component.onChange.subscribe({
      next: (value: any) => expect(value).toContain('newValue')
    });
  });

  
  it('should parse correctly required errors on form', () => {
    component.control = new FormControl('', Validators.required);
    expect(component.parseError()).toBe('Este campo es requerido');
  });

  it('should parse correctly minLength errors on form', () => {
    component.control = new FormControl('12', Validators.minLength(3));
    expect(component.parseError()).toBe('Mínimo 3 caracteres.');
  });

  it('should parse correctly maxLength errors on form', () => {
    component.control = new FormControl('123456', Validators.maxLength(5));
    expect(component.parseError()).toBe('Máximo 5 caracteres.');
  });
  
  it('should parse correctly todayOrAfter errors on form', () => {
    let today: Date = new Date();
    let yesterday: Date = new Date(today.getFullYear(),today.getMonth(),today.getDate()-1);
    component.control = new FormControl(parseDate(yesterday), DevsuFormValidators.todayOrAfter);
    expect(component.parseError()).toBe('No puede ser una fecha anterior a la actual.');
  });
  
  it('should parse correctly uniqueID errors on form', () => {
    component.control = new FormControl('123', [], DevsuFormValidators.uniqueID((value: string): Observable<boolean> => of(true)));
    expect(component.parseError()).toBe('El id ingresado ya existe.');
  });

});
