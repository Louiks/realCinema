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
<<<<<<< HEAD
        seats.push({
          row: i,
          column: j,
          isReseverd: !!data[i][j]
        });
      }
   }
    return this.http.post(`${baseUrl}/seats`, seats, { responseType: 'text'});
=======
        const newSeat = new Seat();
        newSeat.row = i.toString();
        newSeat.column = j.toString();
        newSeat.isReserved = !data[i][j];
        seats.push(newSeat);
      }
   }
    return this.http.post(`${baseUrl}/seats`, seats, { responseType: 'text', headers: {'Content-type': 'application/json'}});
>>>>>>> 16f620997da27eee4f3895decc8bef3cbc7efa8f
  }
}

export class Seat {
  row?: string;
  column?: string;
  isReserved?: boolean
}
