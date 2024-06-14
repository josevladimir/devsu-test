import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ContextualMenuItem } from '../../models/ContextualMenuItem';

@Component({
  selector: 'devsu-contextual-menu',
  templateUrl: './contextual-menu.component.html',
  styleUrls: ['./contextual-menu.component.css']
})
export class ContextualMenuComponent {

  @Input() menuItems: ContextualMenuItem[];
  
  @Output() optionSelected: EventEmitter<any> = new EventEmitter<any>();

  public isOpen: boolean = false;
  public posX: number;
  public posY: number;

  constructor(private eRef: ElementRef) {}

  triggerContextualMenu(event: any): void{
    this.isOpen = true;
    this.posX = event.clientX;
    this.posY = event.clientY;
  }
  
  onOptionSelected(menuItem: ContextualMenuItem): void {
    this.optionSelected.emit(menuItem.value);
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

}
