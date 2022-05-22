import { Injectable, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../shared/Authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SsoDataService {

  constructor(private msalService: MsalService, private testService: AuthenticationService) { }


  // private accountInfo:BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  // public getAccountInfo(){
  //   return this.accountInfo.asObservable();
  // }

  // public updateAccountInfo(accountInfo: any){
  //   if(!!accountInfo)
  //     this.accountInfo.next(accountInfo);
  // }

  // public setActiveAccountAfterRedirect() {//todo [Kokot] change sequence or maybe not..
  //   this.msalService.instance.handleRedirectPromise()
  //   .then(
  //     res => {
  //       if (res !== null && res.account != null) {
  //         this.testService.getUser(res.account.name).subscribe (user => {
  //           if (!user.firstName || !user.lastName || !user.username) {
  //             //MAYBE redirect to registration with user data filled in
  //           }
  //           this.msalService.instance.setActiveAccount(res.account);
  //           this.updateAccountInfo(
  //             {
  //               email: user.email ?? res.account?.name ?? res.account?.username ?? 'email_not_set',
  //               username: user.username ?? res.account?.username ?? 'username_not_set',
  //               firstName: user.firstName ?? 'firstName_not_set',
  //               lastName: user.lastName ?? 'lastName_not_set',
  //             }
  //           );
  //         });
  //       }
  //     }
  //   );
  // }

  // public loginRedirect() {
  //   this.msalService.loginRedirect();
  // }

  // public logout() {
  //   this.msalService.logout();
  // }

  // getUsername(): string {
  //   let JSONAccount = localStorage.getItem('activeAcc');
  //   let account = JSONAccount ? JSON.parse(JSONAccount) : undefined;
  //   return  account.name ?? account.username;
  // }
}
