import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationService } from 'src/app/shared/Navigation/navigation.service';
import { SsoDataService } from '../../sso-data.service';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/Authentication/authentication.service';

@Component({
  selector: 'app-registration-overview',
  templateUrl: './registration-overview.component.html',
  styleUrls: ['./registration-overview.component.scss']
})
export class RegistrationOverviewComponent implements OnInit {
  @ViewChild('formGroupDirective')
  registrationFormDirective: FormGroupDirective | undefined;
  email = 'Kuba@wp.pl';
  username = 'Kuba';
  password = '123';
  password_repeat = '123';

  readonly registrationForm: FormGroup;
  public displayButtons = false;
  constructor(private ssoDataService: SsoDataService, private navigation: NavigationService, private testService: AuthenticationService) { 
    this.registrationForm = new FormGroup({
      email: new FormControl(this.email),
      username: new FormControl(this.username),
      password: new FormControl(this.password),
      password_repeat: new FormControl(this.password_repeat),
    });
  }

  
  ngOnInit(): void {
    this.redirectIfRegistered();
    this.ssoDataService.setActiveAccountAfterRedirect();  
  }

  register () {
    this.ssoDataService.loginRedirect();
  }

  redirectIfRegistered() {
    this.ssoDataService.getAccountInfo().subscribe(sta =>{
      if(!!sta)
        this.navigation.back();
    });
  }

  tryRegister() {
    if ( this.registrationForm.value.password === this.registrationForm.value.password_repeat )
      return this.testService.register(this.registrationForm.value.email, this.registrationForm.value.username, this.registrationForm.value.password).subscribe(user =>{
        this.ssoDataService.updateAccountInfo(user);
        console.log('should redirect here :)');
      });
      return; // TODO [KOKOT] handle 
  }

  isRegisterButtonDisabled() {
    return false;
  }
}