import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingScreenComponent } from './loading-screen.component';
import { GeneralService } from '../../services/general.service';

describe('LoadingScreenComponent', () => {
  let fixture: ComponentFixture<LoadingScreenComponent>;
  let component: LoadingScreenComponent;
  let generalService: GeneralService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingScreenComponent],
      providers: [{ provide: GeneralService }]
    }).compileComponents();
    fixture = TestBed.createComponent(LoadingScreenComponent);
    component = fixture.componentInstance;
    generalService = TestBed.inject(GeneralService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should start spinner', () => {
    let loadingText: string = 'loading...';
    generalService.startLoading(loadingText);
    expect(
      component.isLoading &&
      component.loadingText == loadingText 
    ).toBe(true);
  });
  
  it('should hide spinner', () => {
    component.isLoading = true;
    generalService.stopLoading();
    expect(component.isLoading).toBe(false);
  });

});
