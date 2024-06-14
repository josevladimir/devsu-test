import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogComponent } from './dialog.component';
import { IconComponent } from '../icon/icon.component';
import { GeneralService } from '../../services/general.service';

describe('DialogComponent', () => {
  let fixture: ComponentFixture<DialogComponent>;
  let component: DialogComponent;
  let generalService: GeneralService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DialogComponent,IconComponent],
      providers: [{ provide: GeneralService }]
    }).compileComponents();
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    generalService = TestBed.inject(GeneralService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show correctly dialogText', () => {
    let dialogText = 'Este es un ejemplo de mensaje de diálogo';
    component.isVisible = true;
    component.dialogText = dialogText;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('p')?.textContent).toContain(dialogText);
  });
  
  it('should correctly hideDialog', () => {
    component.isVisible = true;
    fixture.detectChanges();
    let closeButton = fixture.nativeElement.querySelector('button.close-button');
    closeButton.click();
    expect(component.isVisible).toBe(false);
  });

  
  it('should susbcribe to DialogsTrigger', () => {
    let dialogText: string = 'Texto de prueba';
    const onConfirm = () => {} 

    generalService.openConfirmDialog(dialogText, onConfirm);

    expect(
      component.isVisible &&
      component.dialogText == dialogText &&
      component.onConfirm == onConfirm
    ).toBe(true);
  });

  it('confirm button should close dialog and execute onConfirm()', () => {
    let confirmExecuted: boolean = false;
    component.isVisible = true;
    component.onConfirm = () => {confirmExecuted = true};
    fixture.detectChanges();

    let confirmButton = fixture.nativeElement.querySelector('button.main');
    confirmButton.click();

    expect(
      confirmExecuted &&
      !component.isVisible
    ).toBe(true);
  });

});
