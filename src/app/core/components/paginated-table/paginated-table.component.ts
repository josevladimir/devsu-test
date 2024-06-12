import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TableColumn } from '../../models/TableColumns';
import { nextInteger } from '../../utils/NumbersUtils';

@Component({
  selector: 'devsu-paginated-table',
  templateUrl: './paginated-table.component.html',
  styleUrls: ['./paginated-table.component.css']
})
export class PaginatedTableComponent implements OnChanges {
  
  @Input() public columns: TableColumn[];
  @Input() public source: any[]|undefined;

  @Output() public onContextualMenuSelected: EventEmitter<any> = new EventEmitter<any>();
  
  public data: any[]|undefined;
  public totalRecords: number = 0;
  public showedItems: number = 5;

  public currentPage: number = 1;
  public totalPages: number = 1;
  
  ngOnChanges(changes: SimpleChanges): void {
    this.totalRecords = this.source?.length || 0;
    if(this.totalRecords) this.updateShowedItems();
  }

  canGoToNext(): boolean {
    return this.currentPage < this.totalPages;
  }
  
  canGoToPrev(): boolean {
    return this.currentPage != 1;
  }
  
  goToNext() {
    this.currentPage++;
    this.updateShowedItems();
  }

  goToPrev() {
    this.currentPage--;
    this.updateShowedItems();
  }

  handleContextualMenuSelection(event: any, record: any) {
    this.onContextualMenuSelected.emit({action: event, record});
  }

  updateShowedItems(){
    this.totalPages = nextInteger(this.totalRecords / this.showedItems);
    console.log(this.totalPages);
    if(this.currentPage > this.totalPages) this.currentPage = this.totalPages;

    if(this.totalRecords > this.showedItems) this.data = this.source?.slice(this.showedItems * (this.currentPage-1), this.showedItems * this.currentPage);
    else this.data = this.source;
  }

}
