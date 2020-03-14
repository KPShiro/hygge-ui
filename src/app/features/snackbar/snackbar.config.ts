import { InjectionToken } from '@angular/core';

export interface SnackbarTimeoutConfig {
    default?: number;
    warning?: number;
    error?: number;
}

export interface SnackbarConfig {
    timeout: SnackbarTimeoutConfig;
    maxCount?: number;
    snackbarClass?: string;
}

export const defaultSnacbarConfig: SnackbarConfig = {
    timeout: {
        default: 3000,
        warning: 5000,
        error: 8000,
    },
    maxCount: 1,
};

export const SNACKBAR_CONFIG = new InjectionToken<SnackbarConfig>('SNACKBAR_CONFIG');
