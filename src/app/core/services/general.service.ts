import { EventEmitter, Injectable } from '@angular/core';
import { DialogOptions, LoadingState, ToastDefinition } from '../models/AppEvents';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  public loadingScreenState: EventEmitter<LoadingState> = new EventEmitter<LoadingState>();
  public dialogsState: EventEmitter<DialogOptions> = new EventEmitter<DialogOptions>();
  public toastState: EventEmitter<ToastDefinition> = new EventEmitter<ToastDefinition>();

  startLoading(loadingText: string) {
    this.loadingScreenState.emit({state: true, loadingText});
  }

  openConfirmDialog(dialogText: string, onConfirm: () => void) {
    this.dialogsState.emit({dialogText, onConfirm, isVisible: true})
  }
  
  showErrorToast(text: string) {
    this.toastState.emit({text, type: 'error'});
  }
  
  showSuccessToast(text: string) {
    this.toastState.emit({text, type: 'success'});
  }

  stopLoading() {
    this.loadingScreenState.emit({state: false});
  }

}


