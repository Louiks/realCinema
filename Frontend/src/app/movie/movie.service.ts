import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class MovieService {


  constructor(private http: HttpClient) { }

  index = 0;

  getMovieDetails(): any {
    return {
      cinemas: [
        'Bydgoszcz',
        'Radom',
        'Rzeszow',
        'Sosnowiec',
      ],
      premiere: Date(),
      duration: '2h 26m',
      prodution: 'USA, 2022',
      director: 'Colin Trevorow',
      cast: [
        'Chris Pratt',
        'Bryce Dallas Howard',
        'Sam Neill',
        'Laura Dern',
      ],
      title: 'SONIC THE HEDGEHOG 2',
      categories: [
        'Action',
        '|',
        'Animated',
        '|',
        'Fairy Tail',
        '|',
        'Super Heroes',
      ],
      description: `The world's favorite blue hedgehog is back for a next-level adventure in SONIC THE HEDGEHOG 2. After settling in Green Hills, Sonic is eager to prove he has what it takes to be a true hero. His test comes when Dr. Robotnik returns, this time with a new partner, Knuckles, in search for an emerald that has the power to destroy civilizations. Sonic teams up with his own sidekick, Tails, and together they embark on a globe-trotting journey to find the emerald before it falls into the wrong hands.`,
    };
  }
  getTimesMovieIsPlayed(cinema: string, date?: Date): any {
    this.index++;
    let retunValue;
    switch (this.index % 4) {
      case 0:
        retunValue = {
          times: [
            new Date(2020, 0O5, 0O5, 11, 30, 0, 0),
            new Date(2020, 0O5, 0O5, 12, 45, 0, 0),
            new Date(2020, 0O5, 0O5, 17, 30, 0, 0),
          ],
        };
        break;
      case 1:
        retunValue = {
          times: [
            new Date(2020, 0O5, 0O5, 8, 15, 0, 0),
            new Date(2020, 0O5, 0O5, 10, 45, 0, 0),
            new Date(2020, 0O5, 0O5, 18, 25, 0, 0),
            new Date(2020, 0O5, 0O5, 20, 15, 0, 0),
            new Date(2020, 0O5, 0O5, 21, 30, 0, 0),
          ],
        };
        break;
      case 2:
        retunValue = {
          times: [
            new Date(2020, 0O5, 0O5, 20, 15, 0, 0),
            new Date(2020, 0O5, 0O5, 21, 30, 0, 0),
          ],
        };
        break;
      case 3:
        retunValue = {
          times: [],
        };
        break;

    }
    return  retunValue;
  }

  getSeatsByMovieAndDate() {
    return this.http.get(`${baseUrl}/seats`);
  }
  makeArray(row: number, column: number, value: boolean) {
    var arr = ([] as unknown as [boolean[]]);
    row++;
    column++;
    for(let i = 0; i < row; i++) {
        arr[i] = ([] as boolean[]);
        for(let j = 0; j < column; j++) {
            arr[i][j] = value;
        }
    }
    return arr;
  }
   
  

  reserveSeats(data: boolean[][]) {
    let sth = Array();
    console.log(data);
    
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        let shouldReserve = !data[i][j];
         shouldReserve && sth.push({
          row: i,
          column: j
        });
      }
    }
    console.log(sth);
    return this.http.put(`${baseUrl}/seats`, sth);
  }

  submitUserData(data: any) {
    return this.http.put(`${baseUrl}/user_data`, data);
  }
}
