import { Component, Input, OnDestroy } from '@angular/core';
import { LoadingState } from '../../models/AppEvents';
import { GeneralService } from '../../services/general.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'devsu-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnDestroy {

  public loadingText: string;
  public isLoading: boolean;

  private subscription: Subscription;

  constructor(private generalService: GeneralService) {
    this.subscription = this.generalService.loadingScreenState.subscribe({
      next: (state: LoadingState) => {
        this.loadingText = state.loadingText || '';
        this.isLoading = state.state;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
