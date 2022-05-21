import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from 'src/app/_models/user';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.baseUrl}/users`);
    }

    register(user: User) {
        return this.http.post(`${environment.baseUrl}/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.baseUrl}/users/${id}`);
    }
}