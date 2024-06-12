import { Component, Input } from '@angular/core';

@Component({
  selector: 'devsu-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {

  @Input() public diameter: number = 50;

}
