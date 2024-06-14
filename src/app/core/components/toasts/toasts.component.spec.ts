import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastsComponent } from './toasts.component';
import { FormsModule } from '@angular/forms';
import { GeneralService } from '../../services/general.service';

describe('ToastsComponent', () => {
  let fixture: ComponentFixture<ToastsComponent>;
  let component: ToastsComponent;
  let generalService: GeneralService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ToastsComponent],
      providers: [{ provide: GeneralService }]
    }).compileComponents();
    fixture = TestBed.createComponent(ToastsComponent);
    component = fixture.componentInstance;
    generalService = TestBed.inject(GeneralService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly show error toast', () => {
    generalService.showErrorToast('Texto Error');
    expect(
      component.type == 'error' &&
      component.isVisible &&
      component.text == 'Texto Error'
    ).toBeTruthy();
  });

  
  it('should correctly show success toast', () => {
    generalService.showSuccessToast('Texto Success');
    expect(
      component.type == 'success' &&
      component.isVisible &&
      component.text == 'Texto Success'
    ).toBeTruthy();
  });
  
  it('should correctly show info toast', () => {
    generalService.showInfoToast('Texto info');
    expect(
      component.type == 'info' &&
      component.isVisible &&
      component.text == 'Texto info'
    ).toBeTruthy();
  });
  
  it('should correctly hide toast', () => {

    component.isVisible = true;

    component.hideToast();

    expect(component.isVisible).toBe(false);
  });
  
  it('should correctly hide toast after 5s', () => {
    jest.useFakeTimers();
    const hideToastMethod = jest.spyOn(component, 'hideToast');

    generalService.showSuccessToast('Texto Success');

    jest.runAllTimers();

    expect(hideToastMethod).toHaveBeenCalled();
  });

});
