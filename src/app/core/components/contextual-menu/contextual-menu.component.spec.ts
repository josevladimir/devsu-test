import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ContextualMenuComponent } from './contextual-menu.component';
import { IconComponent } from '../icon/icon.component';

describe('ContextualMenuComponent', () => {
  let fixture: ComponentFixture<ContextualMenuComponent>;
  let component: ContextualMenuComponent;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ContextualMenuComponent, IconComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(ContextualMenuComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  
  it('should correctly render from menuItems definition', () => {
    component.menuItems = [{ value: 'edit', display: 'editar'}];
    component.isOpen = true;
    fixture.detectChanges();
    const elementText = fixture.nativeElement.querySelector('li.menu-link')?.textContent;
    expect(elementText).toContain(component.menuItems[0].display);
  });

  it('should correctly trigger menu', () => {
    component.isOpen = false;
    component.triggerContextualMenu({clientX: 12, clientY: 12});
    expect(component.isOpen).toBe(true);
  });
  
  it('should trigger menu from html', () => {
    const button = fixture.nativeElement.querySelector('button.menu-trigger');
    button.click();
    fixture.detectChanges();
    expect(component.isOpen).toBe(true);
  });
  
  it('should close menu when an option has been selected', () => {
    component.menuItems = [{ value: 'edit', display: 'editar'}];
    component.isOpen = true;
    fixture.detectChanges();

    const optionElement = fixture.nativeElement.querySelector('li.menu-link');
    optionElement.click();
    expect(component.isOpen).toBe(false);
  });

  it('should emit selectedOption', () => {
    component.menuItems = [{ value: 'edit', display: 'editar'}];
    component.isOpen = true;
    fixture.detectChanges();

    component.optionSelected.subscribe({
      next: (value: any) => {
        expect(value).toBe(component.menuItems[0].value);
      }
    });
    const optionElement = fixture.nativeElement.querySelector('li.menu-link');
    optionElement.click();
    
  });

  it('should close menu when click outside', () => {
    component.isOpen = true;
    
    const event = new MouseEvent('click', { bubbles: true });
    document.dispatchEvent(event);

    expect(component.isOpen).toBe(false);
    
  });

});
