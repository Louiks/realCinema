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
        const newSeat = new Seat();
        newSeat.row = i.toString();
        newSeat.column = j.toString();
        newSeat.isReserved = !data[i][j];
        seats.push(newSeat);
      }
   }
    return this.http.post(`${baseUrl}/seats`, seats, { responseType: 'text', headers: {'Content-type': 'application/json'}});
  }
}

export class Seat {
  row?: string;
  column?: string;
  isReserved?: boolean
}
