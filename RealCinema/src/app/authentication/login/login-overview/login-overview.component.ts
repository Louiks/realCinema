import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/shared/Navigation/navigation.service';
import { SsoDataService } from '../../sso-data.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-overview',
  templateUrl: './login-overview.component.html',
  styleUrls: ['./login-overview.component.scss']
})
export class LoginOverviewComponent implements OnInit {
  name = new FormControl('');
  password = new FormControl('');
  public displayButtons = false;
  constructor(private ssoDataService: SsoDataService,private navigation: NavigationService) { }

  
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
    console.log("LOGIN PRESSED");
  }
}
