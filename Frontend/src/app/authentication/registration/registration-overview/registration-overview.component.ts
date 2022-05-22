import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationService } from 'src/app/shared/Navigation/navigation.service';
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
  firstName = "Jakub";
  lastName = "Kokot";
  email = 'Kuba@wp.pl';
  username = 'Kuba';
  password = '123';
  password_repeat = '123';

  readonly registrationForm: FormGroup;
  public displayButtons = false;
  constructor( private navigation: NavigationService, private authenticationService: AuthenticationService) { 
    this.registrationForm = new FormGroup({
      firstName: new FormControl(this.firstName),
      lastName: new FormControl(this.lastName),
      email: new FormControl(this.email),
      username: new FormControl(this.username),
      password: new FormControl(this.password),
      password_repeat: new FormControl(this.password_repeat),
    });
  }

  
  ngOnInit(): void {
    this.redirectIfRegistered();
    this.authenticationService.setActiveAccountAfterRedirect();  
  }

  register () {
    this.authenticationService.loginRedirect();
  }

  redirectIfRegistered() {
    this.authenticationService.getAccountInfo().subscribe(sta =>{
      if(!!sta)
        this.navigation.back();
    });
  }

  tryRegister() {//TODO [KOKOT] Add validation to controls
    if ( this.registrationForm.value.password === this.registrationForm.value.password_repeat )
      return this.authenticationService.register(this.registrationForm.value.firstName, this.registrationForm.value.lastName, this.registrationForm.value.email, 
        this.registrationForm.value.username, this.registrationForm.value.password).subscribe(() =>{
          this.authenticationService.login(this.registrationForm.value.email, this.registrationForm.value.password).subscribe(user =>{
            this.authenticationService.updateAccountInfo(
              {
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
              }
            );
          });
      });
      this.navigation.back();
      return; // TODO [KOKOT] handle 
  }

  isRegisterButtonDisabled() {
    return false;
  }
}