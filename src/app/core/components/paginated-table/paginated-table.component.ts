import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TableColumn } from '../../models/TableColumns';

@Component({
  selector: 'devsu-paginated-table',
  templateUrl: './paginated-table.component.html',
  styleUrls: ['./paginated-table.component.css']
})
export class PaginatedTableComponent implements OnChanges {
  
  @Input() public columns: TableColumn[];
  @Input() public source: any[];
  
  public data: any[];
  public totalRecords: number = 0;
  public showedItems: number = 5;
  
  ngOnChanges(changes: SimpleChanges): void {
    this.totalRecords = this.source?.length || 0;
    if(this.totalRecords > this.showedItems) this.data = this.source.slice(0, this.showedItems);
    else this.data = this.source;
  }

  updateShowedItems(){
    if(this.totalRecords > this.showedItems) this.data = this.source.slice(0, this.showedItems);
    else this.data = this.source;
  }

}
