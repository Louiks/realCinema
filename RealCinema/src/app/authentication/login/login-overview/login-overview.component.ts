import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationService } from 'src/app/shared/Navigation/navigation.service';
import { SsoDataService } from '../../sso-data.service';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/Authentication/authentication.service';
import { HttpHandler } from '@angular/common/http';

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
  constructor(private ssoDataService: SsoDataService, private navigation: NavigationService, private testService: AuthenticationService) { 
    this.loginForm = new FormGroup({
      username: new FormControl(this.username),
      password: new FormControl(this.password),
    });
  }

  
  ngOnInit(): void {
    this.redirectIfLogged();
    this.ssoDataService.setActiveAccountAfterRedirect();
    
  }
  
  login() {
    this.ssoDataService.loginRedirect();
  }

  redirectIfLogged() {
    this.ssoDataService.getAccountInfo().subscribe(sta =>{
      if(!!sta)
        this.navigation.back();
    });
  }

  tryLogin() {
    return this.testService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(user =>{
      this.ssoDataService.updateAccountInfo(user);
      console.log('should redirect here :)');
    });
  }

  isLoginButtonDisabled() {
    return false;
  }
}
