import { FormGroup } from '@angular/forms';

export function PasswordMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }

        if (control.value !== matchingControl.value) {
            control.setErrors({ 'no-match': true });
            matchingControl.setErrors({ 'no-match': true });
        } else {
            control.setErrors(null);
            matchingControl.setErrors(null);
        }
    };
}
