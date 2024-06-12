export interface LoadingState {
    state: boolean,
    loadingText?: string
}

export interface DialogOptions {
    dialogText: string,
    isVisible: boolean,
    onConfirm?: () => void,
}

export interface ToastDefinition {
    text: string,
    type: ToastType
}

export declare type ToastType = 'success' | 'info' | 'error';