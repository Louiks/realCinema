import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MovieService } from '../../movie.service';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/Authentication/authentication.service';

@Component({
  selector: 'app-user-data-form',
  templateUrl: './user-data-form.component.html',
  styleUrls: ['./user-data-form.component.scss']
})
export class UserDataFormComponent implements OnInit {

  @Input()
  expirationTime?: Date = new Date();
  
  constructor(private movieService: MovieService, protected readonly router: Router, private authenticationService: AuthenticationService, private route: ActivatedRoute) { }
 
  movie = {
    title: '',
    date: '',
    price: '',
    hall: '',
    seats: '',
  }
  movie_error_c = '';
  pipe = new DatePipe('en-US');
  formattedExpirationDate: any;
  hasBeenSumbitted = false;
  isWaiting = false;
  reservationDataForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/^[a-z ,.'-]+$/i)
    ]),
    lastName: new FormControl('lastname', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/^[a-z ,.'-]+$/i)
    ]),
    phoneNo: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.pattern("[0-9 ]{9}")
    ]),
  })

  ngOnInit(): void {
    this.expirationTime?.setMinutes(this.expirationTime?.getMinutes() + 20);
    this.formattedExpirationDate = this.pipe.transform(this.expirationTime, 'M/d/yy, HH:mm:ss');
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      this.reservationDataForm.patchValue({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName
      })
    }
    this.movie = {
      title: this.route.snapshot.paramMap.get('movie_title') ?? '',
      date: this.route.snapshot.paramMap.get('movie_date') ?? '',
      price: this.route.snapshot.paramMap.get('movie_price') ?? '',
      hall: this.route.snapshot.paramMap.get('movie_hall') ?? '',
      seats: this.route.snapshot.paramMap.get('movie_seats') ?? '',
    }
    this.movie_error_c = this.route.snapshot.paramMap.get('movie_error_c') ?? this.movie_error_c;
    this.movie_error_c !== '' && 
      setTimeout(() => {
        this.goBackToMovie()
      }, 2000
    )
  }

  submit() {
    this.isWaiting = true;
    setTimeout(()=> {
      this.hasBeenSumbitted = true;
      this.isWaiting = false;
    }, 3000);
    const userData = {
      firstName: this.reservationDataForm.get('firstName')?.value,
      lastName: this.reservationDataForm.get('lastName')?.value,
      phoneNo: this.reservationDataForm.get('phoneNo')?.value
    };
    return this.movieService.submitUserData(userData);
  }

  submitDisabled(): boolean {
    const firstName = this.reservationDataForm.get('firstName')?.errors;
    const lastName = this.reservationDataForm.get('lastName')?.errors;
    const phoneNo = this.reservationDataForm.get('phoneNo')?.errors;
    return !!firstName || !!lastName || !!phoneNo || this.isWaiting;
  }

  goToDashboard(): void {
    this.router.navigate([`../dashboard`]);
  }

  goBackToMovie(): void {
    this.router.navigate([`../movie`]);
  }

  shouldWait(): boolean {
    return this.isWaiting || this.movie_error_c !== '';
  }
}
