import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { PasswordMatch } from '@pages/sign-up/validators/password-match/password-match.validator';
import { ActivatedRoute } from '@angular/router';
import { IInvitation } from '@features/company/interfaces/invitation.interface';


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
        private readonly _formBuilder: FormBuilder,
        private readonly _route: ActivatedRoute,
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
        const invitationDetails: IInvitation = this._route.snapshot.data.invitationDetails;

        this.personaForm = this._formBuilder.group({
            username: [
                invitationDetails.email,
                [Validators.required, Validators.email],
            ],
            firstName: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
        });

        this.passwordForm = this._formBuilder.group({
            password: [null, [Validators.required]],
            confirmPassword: [null, [Validators.required]],
        }, {
            validators: [
                PasswordMatch('password', 'confirmPassword'),
            ],
        });

        this.signUpForm = this._formBuilder.group({
            passwordForm: this.passwordForm,
            personaForm: this.personaForm,
        });
    }
}
