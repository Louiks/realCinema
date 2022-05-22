import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationService } from 'src/app/shared/Navigation/navigation.service';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/Authentication/authentication.service';
@Component({
  selector: 'app-login-overview',
  templateUrl: './login-overview.component.html',
  styleUrls: ['./login-overview.component.scss'],
  providers: [AuthenticationService],
})
export class LoginOverviewComponent implements OnInit {
  @ViewChild('formGroupDirective')
  loginFormDirective: FormGroupDirective | undefined;
  username = 'Kuba@wp.pl';
  password = '123';

  readonly loginForm: FormGroup;
  public displayButtons = false;

  constructor(private navigation: NavigationService, private authenticationService: AuthenticationService) { 
    this.loginForm = new FormGroup({
      username: new FormControl(this.username),
      password: new FormControl(this.password),
    });
  }

  
  ngOnInit(): void {
    this.redirectIfLogged();
   this.authenticationService.setActiveAccountAfterRedirect();
  }
  
  login() {
    this.authenticationService.loginRedirect();
  }

  redirectIfLogged() {
    this.authenticationService.getAccountInfo().subscribe(sta =>{
      if(!!sta)
        this.navigation.back();
    });
  }

  tryLogin() {
    return this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(user =>{
      this.authenticationService.updateAccountInfo(
      {
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    });
  }

  isLoginButtonDisabled() {
    return false;
  }
}
