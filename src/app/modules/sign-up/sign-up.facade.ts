import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VerificationService } from './services/verification/verification.service';


@Injectable()
export class SignUpFacade {
    public constructor(
        private readonly verificationService: VerificationService,
    ) { }

    public verifyUsername(username: string): Observable<boolean> {
        return this.verificationService.verifyUsername(username);
    }

    public verifyCompanyName(username: string): Observable<boolean> {
        return this.verificationService.verifyCompanyName(username);
    }
}
