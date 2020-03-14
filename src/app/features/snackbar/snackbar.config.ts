import { InjectionToken } from '@angular/core';


export interface ISnackbarTimeoutConfig {
    default?: number;
    warning?: number;
    error?: number;
}

export interface ISnackbarConfig {
    timeout: ISnackbarTimeoutConfig;
    maxCount?: number;
    snackbarClass?: string;
}

export const defaultSnacbarConfig: ISnackbarConfig = {
    timeout: {
        default: 3000,
        warning: 5000,
        error: 8000,
    },
    maxCount: 1,
};

export const SNACKBAR_CONFIG = new InjectionToken<ISnackbarConfig>('SNACKBAR_CONFIG');
