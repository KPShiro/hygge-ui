import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Observer, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


declare var FB: any;

@Injectable()
export class FacebookSdkService {

  public init(): void {
    // tslint:disable-next-line: no-string-literal
    window['fbAsyncInit'] = () => {
      FB.init({
        appId: environment.integrations.facebook.sdk.appId,
        version: environment.integrations.facebook.sdk.apiVersion,
      });
    };

    const fbSdkScript: HTMLScriptElement = document.createElement('script');
    fbSdkScript.async = true;
    fbSdkScript.defer = true;
    fbSdkScript.innerHTML = `
      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "${environment.integrations.facebook.sdk.src}";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    `;

    document.body.prepend(fbSdkScript);
  }

  public loginToFacebook(): Observable<any> {
    return this.getLoginStatus().pipe(
      switchMap((response: any) => {
        if (response.status === 'connected') {
          return of(response);
        }

        return this.login();
      }),
    );
  }

  public logoutFromFacebook(): Observable<any> {
    return this.getLoginStatus().pipe(
      switchMap((response: any) => {
        if (response.status !== 'unknown' && FB.getAccessToken()) {
          return this.logout();
        }

        return of(response);
      }),
    );
  }

  private login(): Observable<any> {
    return new Observable((observer: Observer<any>) => FB.login((response: any) => observer.next(response), {
      scope: 'instagram_basic,instagram_manage_insights,instagram_manage_comments',
      return_scopes: true,
    }));
  }

  private logout(): Observable<any> {
    return new Observable((observer: Observer<any>) => FB.logout((response: any) => observer.next(response)));
  }

  private getLoginStatus(): Observable<boolean> {
    return new Observable((observer: Observer<any>) => FB.getLoginStatus((response: any) => observer.next(response)));
  }
}
