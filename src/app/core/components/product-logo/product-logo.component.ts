import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'devsu-product-logo',
  templateUrl: './product-logo.component.html',
  styleUrls: ['./product-logo.component.css']
})
export class ProductLogoComponent implements OnInit {

  @Input() public productName: string;
  @Input() public productLogo: string|null;
  
  public nameLetters: string;

  ngOnInit(): void {
    let nameSections: string[] = this.productName?.split(' ', 2) || [];
    this.nameLetters = `${nameSections.map((section: string) => section[0].toUpperCase()).join('')}`;
  }

}
