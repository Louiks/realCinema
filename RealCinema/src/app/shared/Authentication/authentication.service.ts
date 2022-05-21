import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from 'src/app/_models/user';
import { environment } from 'src/environments/environment';
import { SsoDataService } from 'src/app/authentication/sso-data.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User| null>;
    public currentUser: Observable<User | null>;

    constructor(private http: HttpClient) {
        const currUser = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<User | null>( currUser ? JSON.parse(currUser): null) ;
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    login(email: any, password: any) {//TODO [KOKOT] types
        return this.http.post<any>(`http://localhost:3000/api/auth/signin`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    register(email: any, username: any, password: any) {//TODO [KOKOT] types
        return this.http.post<any>(`http://localhost:3000/api/auth/signup`, { email, username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                //localStorage.setItem('currentUser', JSON.stringify(user));
                //this.currentUserSubject.next(user);
                console.log(user);
                return user;
            }));
    }
}