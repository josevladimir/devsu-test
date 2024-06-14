import { Component, OnDestroy } from '@angular/core';
import { ToastDefinition, ToastType } from '../../models/AppEvents';
import { GeneralService } from '../../services/general.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'devsu-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.css']
})
export class ToastsComponent implements OnDestroy {

  public type: ToastType;
  public text: string;
  public isVisible: boolean = false;

  private subscription: Subscription;

  constructor(private generalService: GeneralService) {
    this.subscription = this.generalService.toastState.subscribe({
      next: (definition: ToastDefinition) => {
        this.type = definition.type;
        this.text = definition.text;
        this.isVisible = true;
        setTimeout(() => {
          this.hideToast();
        }, 5000);
      }
    });
  }

  hideToast() {
    this.isVisible = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
