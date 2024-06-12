import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

export declare type InputType = 'text' | 'date';

@Component({
  selector: 'devsu-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent implements OnChanges {
  
  @Input() public control: FormControl|null;
  @Input() public label: string = '';
  @Input() public type: InputType = 'text';

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  
  ngOnChanges(changes: SimpleChanges): void {
    if(!this.control) throw new Error('Form field must have a control');
  }

  emitChange(event: any){
    this.onChange.emit(event.target.value);
  }

  parseError(): string{
    let errors: any = this.control?.errors;
    let error: string = `${this.label} no válido!`;
    if(errors){
      if(errors.hasOwnProperty('required')) error = 'Este campo es requerido';
      else if(errors.hasOwnProperty('minlength')) error = `Mínimo ${errors.minlength.requiredLength} caracteres.`;
      else if(errors.hasOwnProperty('maxlength')) error = `Máximo ${errors.maxlength.requiredLength} caracteres.`;
      else if(errors.hasOwnProperty('isBefore')) error = `No puede ser una fecha anterior a la actual.`;
    }
    return error;
  }

}
