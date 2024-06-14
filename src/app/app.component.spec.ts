import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LoadingScreenComponent } from './core/components/loading-screen/loading-screen.component';
import { DialogComponent } from './core/components/dialog/dialog.component';
import { ToastsComponent } from './core/components/toasts/toasts.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent,LoadingScreenComponent,DialogComponent,ToastsComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
