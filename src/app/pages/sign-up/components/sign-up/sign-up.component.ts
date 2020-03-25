import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { PasswordMatch } from '@pages/sign-up/validators/password-match/password-match.validator';


@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

    public signUpForm?: FormGroup;

    public get usernameControl(): FormControl {
        return this.personaForm.get('username') as FormControl;
    }

    public get firstNameControl(): FormControl {
        return this.personaForm.get('firstName') as FormControl;
    }

    public get lastNameControl(): FormControl {
        return this.personaForm.get('lastName') as FormControl;
    }

    public get confirmPasswordControl(): FormControl {
        return this.passwordForm.get('confirmPassword') as FormControl;
    }

    public get passwordControl(): FormControl {
        return this.passwordForm.get('password') as FormControl;
    }

    private readonly _destroy: Subject<void> = new Subject();
    private passwordForm?: FormGroup;
    private personaForm?: FormGroup;

    public constructor(
        private readonly formBuilder: FormBuilder,
    ) { }

    public get isFormValid(): boolean {
        const result: boolean =
            this.usernameControl.valid &&
            this.firstNameControl.valid &&
            this.lastNameControl.valid &&
            this.passwordControl.valid &&
            this.confirmPasswordControl.valid;

        return result;
    }

    public ngOnInit(): void {
        this.buildForm();
    }

    public ngOnDestroy(): void {
        this._destroy.next();
        this._destroy.complete();
    }

    public createAccount(): void {
        // TODO: Implement account creation
    }

    private buildForm(): void {
        this.personaForm = this.formBuilder.group({
            username: [
                null,
                [Validators.required, Validators.email],
            ],
            firstName: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
        });

        this.passwordForm = this.formBuilder.group({
            password: [null, [Validators.required]],
            confirmPassword: [null, [Validators.required]],
        }, {
            validators: [
                PasswordMatch('password', 'confirmPassword'),
            ],
        });

        this.signUpForm = this.formBuilder.group({
            passwordForm: this.passwordForm,
            personaForm: this.personaForm,
        });
    }
}
