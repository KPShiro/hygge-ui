import { InjectionToken } from '@angular/core';

export interface SnackbarConfig {
    timeout: number;
    snackbarClass?: string;
}

export const defaultSnacbarConfig: SnackbarConfig = {
    timeout: 3000,
};

export const SNACKBAR_CONFIG = new InjectionToken<SnackbarConfig>('SNACKBAR_CONFIG');
