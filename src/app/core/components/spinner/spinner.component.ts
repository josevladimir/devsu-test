import { Component, Input } from '@angular/core';

@Component({
  selector: 'devsu-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {

  @Input() public height: number = 50;
  @Input() public width: number = 50;

}
