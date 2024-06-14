import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScreenWrapperComponent } from './screen-wrapper.component';
import { FormsModule } from '@angular/forms';

describe('ScreenWrapperComponent', () => {
  let fixture: ComponentFixture<ScreenWrapperComponent>;
  let component: ScreenWrapperComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ScreenWrapperComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ScreenWrapperComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

});
