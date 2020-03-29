import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { UserFacadeService } from '@features/user/services/user-facade/user-facade.service';


export function usernameAvailabilityAsyncValidator(facade: UserFacadeService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return timer(700).pipe(
            flatMap(() => facade.checkUsernameAvailability(control.value)),
            map((available) => available ? null : { 'not-available': true }),
        );
    };
}
