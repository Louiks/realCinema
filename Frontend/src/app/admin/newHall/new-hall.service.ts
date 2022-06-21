import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class NewHallService {

  constructor(private http: HttpClient) { }

  addNewHall(data: boolean[][]) {
    const seats = Array<Seat>();
    for(let i = 0; i < data.length; i++) {
      for(let j = 0; j < data[i].length; j++) {
        seats.push({
          row: i,
          column: j,
          isReseverd: !!data[i][j]
        });
      }
   }
    return this.http.post(`${baseUrl}/seats`, seats, { responseType: 'text'});
  }
}

export class Seat {
  row?: string;
  column?: string;
  isReserved?: boolean
}
