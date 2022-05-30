import { Injectable, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SsoDataService {

  constructor(private msalService: MsalService) { }


  private accountInfo:BehaviorSubject<AccountInfo | undefined> = new BehaviorSubject<AccountInfo | undefined>(undefined);

  public getAccountInfo(){
    return this.accountInfo.asObservable();
  }

  public updateAccountInfo(accountInfo: AccountInfo | null){
    if(!!accountInfo)
      this.accountInfo.next(accountInfo);
  }

  public setActiveAccountAfterRedirect() {
    this.msalService.instance.handleRedirectPromise()
    .then(
      res => {
        if (res !== null && res.account != null) {
          this.msalService.instance.setActiveAccount(res.account);
          this.updateAccountInfo(this.msalService.instance.getActiveAccount())
        }
      }
    );
  }

  public loginRedirect() {
    this.msalService.loginRedirect();
  }

  public logout() {
    this.msalService.logout();
  }
}
