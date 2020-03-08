import { FormControl, AsyncValidatorFn } from '@angular/forms';
import { map, first, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SignUpFacade } from '@modules/sign-up/sign-up.facade';

export class AvailabilityValidators {
    private static readonly _debounceTime: number = 700;

    static IsUsernameAvailable(signUpFacade: SignUpFacade): AsyncValidatorFn {
        return (control: FormControl) => control.valueChanges.pipe(
            debounceTime(this._debounceTime),
            distinctUntilChanged(),
            switchMap((value) => signUpFacade.verifyUsername(value)),
            map((available) => available ? null : { isTaken: true }),
            first(),
        );
    }

    static IsCompanyNameAvailable(signUpFacade: SignUpFacade) {
        return (control: FormControl) => control.valueChanges.pipe(
            debounceTime(this._debounceTime),
            distinctUntilChanged(),
            switchMap(() => signUpFacade.verifyCompanyName(control.value)),
            map((available) => available ? null : { isTaken: true }),
            first(),
        );
    }
}
