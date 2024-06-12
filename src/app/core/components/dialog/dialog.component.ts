import { Component, OnDestroy } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { Subscription } from 'rxjs';
import { DialogOptions } from '../../models/AppEvents';

@Component({
  selector: 'devsu-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnDestroy {

  public isVisible: boolean = false;
  public dialogText: string = '';
  public onConfirm: () => void;
  
  private subscription: Subscription;

  constructor(private generalService: GeneralService) {
    this.subscription = this.generalService.dialogsState.subscribe({
      next: (options: DialogOptions) => {
        this.dialogText = options.dialogText;
        this.isVisible = options.isVisible;
        this.onConfirm = options.onConfirm!;
      }
    });
  }
  
  close() {
    this.isVisible = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  confirm(){
    this.close();
    this.onConfirm();
  }

}
