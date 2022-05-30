import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountInfo } from '@azure/msal-browser';
import { SsoDataService } from '../authentication/sso-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  constructor(private ssoDataService: SsoDataService,
    protected readonly router: Router) {
    
  }

  public loggedIn = false;
  public username: string = 'User';

  @Input()
  displayButtons = true;

  keepLoggedInStatusUpdated(): void {
    this.ssoDataService.getAccountInfo().subscribe(accountInfo =>{
      if(!!accountInfo) {
        this.loggedIn = true;
        let account = {
          homeAccountId: accountInfo.homeAccountId,
          environment: accountInfo.environment,
          tenantId: accountInfo.tenantId,
          username: accountInfo.username,
          localAccountId: accountInfo.localAccountId,
          name: accountInfo.name,
          idTokenClaims: accountInfo.idTokenClaims,
        }
        localStorage.setItem('activeAcc', JSON.stringify(account));
      }else {
        this.loggedIn = false;
        localStorage.removeItem('activeAcc');
      }
    });
  }

  ngOnInit(): void {
    this.ssoDataService.setActiveAccountAfterRedirect();
    this.keepLoggedInStatusUpdated();
  }

  goToLoginPage(): void {
    this.router.navigate([`../login`]);
  }

  goToDashboard(): void {
    this.router.navigate([``]);
  }

  getUsername(): string {
    if(this.loggedIn) {
      let JSONAccount = localStorage.getItem('activeAcc');
      let account = JSONAccount ? JSON.parse(JSONAccount) : undefined;
      return  account.name ?? account.username;
    }
    return 'User';
  }

  logOut(): void {
    this.ssoDataService.logout();
  }
}
