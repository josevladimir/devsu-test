import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatedTableComponent } from './paginated-table.component';
import { IconComponent } from '../icon/icon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ContextualMenuComponent } from '../contextual-menu/contextual-menu.component';
import { TableColumn } from '../../models/TableColumns';

describe('PaginatedTableComponent', () => {
  let fixture: ComponentFixture<PaginatedTableComponent>;
  let component: PaginatedTableComponent;

  const mockData: any[] = [
   {name: 'One', value: 1},
   {name: 'Two', value: 2},
   {name: 'Three', value: 3},
   {name: 'Four', value: 4},
   {name: 'Five', value: 5},
   {name: 'Six', value: 6},
   {name: 'Seven', value: 7},
   {name: 'Eight', value: 8},
  ];

  const columns: TableColumn[] = [
    {name: 'name', display: 'name'},
    {name: 'value', display: 'value'},
    {name: 'menu', display: '', type: 'menu', menuItems: []}
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [PaginatedTableComponent,IconComponent, ContextualMenuComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(PaginatedTableComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load source data', () => {
    component.source = mockData;
    component.ngOnChanges({});
    expect(component.totalRecords).toBe(mockData.length);
  });

  it('should verify if canGoToNext', () => {
    component.currentPage = 1;
    component.totalPages = 1;
    expect(component.canGoToNext()).toBe(false);
  });
  
  it('should verify if canGoToPrev', () => {
    component.currentPage = 1;
    expect(component.canGoToPrev()).toBe(false);
  });
  
  it('should goToNext increase currentPage', () => {
    component.currentPage = 1;
    component.source = mockData;
    component.ngOnChanges({});
    fixture.detectChanges();
    let nextBtn = fixture.nativeElement.querySelector('#pagination button.next-btn');
    nextBtn.click();
    expect(component.currentPage).toBe(2);
  });
  
  it('should goToNext decrease currentPage', () => {
    component.currentPage = 2;
    component.source = mockData;
    component.ngOnChanges({});
    fixture.detectChanges();
    let prevBtn = fixture.nativeElement.querySelector('#pagination button.back-btn');
    prevBtn.click();
    expect(component.currentPage).toBe(1);
  });
  
  it('should handle contextual menu selection', () => {
    let handleFunctionSpy = jest.spyOn(component, 'handleContextualMenuSelection');
    component.source = mockData;
    component.columns = columns;
    component.ngOnChanges({});
    fixture.detectChanges();
    let contextualMenu: ContextualMenuComponent = fixture.debugElement.query(By.directive(ContextualMenuComponent)).componentInstance;
    contextualMenu.onOptionSelected({value: 'edit', display: 'editar'});
    
    expect(handleFunctionSpy).toHaveBeenCalled();
  });
  
  it('should normalize currentPage', () => {
    component.totalRecords = 50;
    component.showedItems = 10;
    component.currentPage = 10;
    component.updateShowedItems();
    expect(component.currentPage).toBe(5);
  });
  
  it('should show all items if totalItems < showedItems', () => {
    component.source = mockData;
    component.showedItems = mockData.length + 10;
    component.ngOnChanges({});
    fixture.detectChanges();
    expect(component.data).toBe(mockData);
  });
  
  it('should show only paginate counter items', () => {
    component.source = mockData;
    component.showedItems = 5;
    component.ngOnChanges({});
    fixture.detectChanges();
    expect(component.data?.length).toBe(5);
  });

  it('should show correct paginated items', () => {
    component.source = mockData;
    component.showedItems = 3;
    component.currentPage = 2;
    component.ngOnChanges({});
    fixture.detectChanges();
    expect(component.data).toEqual(mockData.slice(3,6));
  });

});
