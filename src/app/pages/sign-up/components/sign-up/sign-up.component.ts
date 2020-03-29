import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { PasswordMatch } from '@pages/sign-up/validators/password-match/password-match.validator';
import { ActivatedRoute } from '@angular/router';
import { IInvitation } from '@features/company/interfaces/invitation.interface';
import { usernameAvailabilityAsyncValidator } from '@pages/sign-up/validators/username-availability/username-availability.validator';
import { UserFacadeService } from '@features/user/services/user-facade/user-facade.service';
import { ICreateUserDto } from '@features/user/interfaces/create-user-dto.interface';


@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

    public signUpForm?: FormGroup;

    private readonly _destroy: Subject<void> = new Subject();

    private _passwordForm?: FormGroup;
    private _personaForm?: FormGroup;

    public get usernameControl(): FormControl {
        return this._personaForm.get('username') as FormControl;
    }

    public get firstNameControl(): FormControl {
        return this._personaForm.get('firstName') as FormControl;
    }

    public get lastNameControl(): FormControl {
        return this._personaForm.get('lastName') as FormControl;
    }

    public get confirmPasswordControl(): FormControl {
        return this._passwordForm.get('confirmPassword') as FormControl;
    }

    public get passwordControl(): FormControl {
        return this._passwordForm.get('password') as FormControl;
    }

    public constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _route: ActivatedRoute,
        private readonly _userFacade: UserFacadeService,
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
        this.prefillForm();
    }

    public ngOnDestroy(): void {
        this._destroy.next();
        this._destroy.complete();
    }

    public createAccount(): void {
        const invitationDetails: IInvitation = this._route.snapshot.data.invitationDetails;

        const data: ICreateUserDto = {
            invitationId: invitationDetails._id,
            companyId: invitationDetails.companyId,
            email: this.usernameControl.value,
            password: this.passwordControl.value,
            firstName: this.firstNameControl.value,
            lastName: this.lastNameControl.value,
        };

        this._userFacade.createAccount(data);
    }

    private buildForm(): void {
        this._personaForm = this._formBuilder.group({
            username: [
                null,
                {
                    validators: [Validators.required, Validators.email],
                    asyncValidators: [usernameAvailabilityAsyncValidator(this._userFacade)],
                }
            ],
            firstName: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
        });

        this._passwordForm = this._formBuilder.group({
            password: [null, [Validators.required]],
            confirmPassword: [null, [Validators.required]],
        }, {
            validators: [
                PasswordMatch('password', 'confirmPassword'),
            ],
        });

        this.signUpForm = this._formBuilder.group({
            passwordForm: this._passwordForm,
            personaForm: this._personaForm,
        });
    }

    private prefillForm(): void {
        const invitationDetails: IInvitation = this._route.snapshot.data.invitationDetails;
        this.usernameControl.setValue(invitationDetails.email);
        this.usernameControl.markAsTouched();
    }
}
