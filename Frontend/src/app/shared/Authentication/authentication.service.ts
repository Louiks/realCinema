import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { MsalService } from '@azure/msal-angular';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    static accountInfo: BehaviorSubject<any>;
    private currentUserSubject: BehaviorSubject<User| null>;
    public currentUser: Observable<User | null>;

    constructor(private http: HttpClient, private msalService: MsalService) {
        const currUser = localStorage.getItem('activeAcc');
        this.currentUserSubject = new BehaviorSubject<User | null>( currUser ? JSON.parse(currUser): null) ;
        AuthenticationService.accountInfo = new BehaviorSubject<User>( currUser ? JSON.parse(currUser): null) ;
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    login(email: any, password: any) {//TODO [KOKOT] types
        return this.http.post<any>(`http://localhost:3000/api/auth/signin`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('currentUser', JSON.stringify(user));
                //this.currentUserSubject.next(user);
                this.updateAccountInfo(user);
                return user;
            }));
    }

    getUser(email: any) {//TODO [KOKOT] types + maybe also an authorization key :)
        return this.http.post<any>(`http://localhost:3000/api/auth/getuser`, { email })
            .pipe(map(user => {
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('activeAcc');
        AuthenticationService.accountInfo.next(null);
        !!this.msalService.instance.getActiveAccount() && this.logout_msal();
    }

    register(firstName: any, lastName: any, email: any, username: any, password: any) {//TODO [KOKOT] types
        return this.http.post<any>(`http://localhost:3000/api/auth/signup`, { email, username, password, firstName, lastName })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                //localStorage.setItem('currentUser', JSON.stringify(user));
                //this.currentUserSubject.next(user);
                return user;
            }));
    }

    public getAccountInfo() {
        return AuthenticationService.accountInfo.asObservable();
    }

    public updateAccountInfo(accountInfo: any){
        if(!!accountInfo) {
            localStorage.setItem('activeAcc', JSON.stringify(accountInfo));
            AuthenticationService.accountInfo.next(accountInfo);
        }
    }

    public setActiveAccountAfterRedirect() {//todo [Kokot] change sequence or maybe not..
        this.msalService.instance.handleRedirectPromise()
        .then(
            res => {
            if (res !== null && res.account != null) {
                // this.getUser(res.account.name).subscribe (user => {
                //     console.log('test ',user);
                //     this.updateAccountInfo(user);
                // });
                const userNames = res.account.name?.split(' ');
                const firstName = userNames ? userNames[0] : '';
                const lastName = userNames ? userNames[1] : '';
                this.updateAccountInfo(
                    {
                        email: res.account.username,
                        username: res.account.name,
                        firstName: firstName,
                        lastName: lastName,
                    }
                );
                this.msalService.instance.setActiveAccount(res.account);
                // this.updateAccountInfo(
                //   {
                //     email: user.email ?? res.account?.name ?? res.account?.username ?? 'email_not_set',
                //     username: user.username ?? res.account?.username ?? 'username_not_set',
                //     firstName: user.firstName ?? 'firstName_not_set',
                //     lastName: user.lastName ?? 'lastName_not_set',
                //   }
                // );
                };
            }
        );
    }

    public async loginRedirect() {
        this.msalService.loginRedirect();
    }

  public logout_msal() {
    this.msalService.logout();
  }

    getUsername(): string {
        let JSONAccount = localStorage.getItem('activeAcc');
        let account = JSONAccount ? JSON.parse(JSONAccount) : undefined;
        return  account.name ?? account.username ?? account.email;
    }
}