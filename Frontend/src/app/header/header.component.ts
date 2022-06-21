import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/Authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  constructor(private authenticationService: AuthenticationService,
    protected readonly router: Router) {
    
  }

  public loggedIn = false;
  public username: string = 'User';

  @Input()
  displayButtons = true;

  keepLoggedInStatusUpdated(): void {
    AuthenticationService.accountInfo.subscribe(accountInfo =>{
      console.log(accountInfo);
      this.loggedIn = !!accountInfo;
    });
  }

  ngOnInit(): void {
    this.authenticationService.setActiveAccountAfterRedirect();
    this.keepLoggedInStatusUpdated();
  }

  goToLoginPage(): void {
    this.router.navigate([`../login`]);
  }

  goToRegistrationPage(): void {
    this.router.navigate([`../register`]);
  }
  
  goToDashboard(): void {
    this.router.navigate([``]);
  }

  getUsername(): string {
    return this.authenticationService.getUsername();
  }
  goToNewHall(): void {
    this.router.navigate([`../newhall`]);
  }

  logOut(): void {
    this.authenticationService.logout();
  }
}
