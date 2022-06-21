import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss']
})
export class SeatSelectionComponent implements OnInit, AfterViewInit {
  @Input()
  date = Date();

  @Input()
  time = '';

  @Input()
  movie = {
    title: 'Sonic the hedgehog 2',
    date: '6/22/22, ',
    hall: '1',
    seats: '0',
    price: '10.00 zl',
  };

  @Input()
  public modal: any;

  buttonContent?: string = 'Reserve';
  seatRows?: boolean[][];
  seatRowsCopy: any;
  numberArray?: number[];
  selectedRows?: number;
  selectedSeats?: number;
  alphabet?: string;
  resizeObservable$: any;
  resizeSubscription$: any;
  isOverflown= false;
  disabledSeats: boolean[][] = [[]];
  selected = 0;
  price = 0;
  formattedPrice: string = '';
  title = 'Select your seats:';
  formattedSelectedCount = '';
  movieObject: any;
  formattedSeatPrice: string | undefined;
  isWaiting = false;
  private element: any;
  constructor(private movieService: MovieService, protected readonly router: Router, private el: ElementRef) { 
    this.element = el.nativeElement;
  }

  ngAfterViewInit(): void {
    this.updateOverflow();
  }

  ngOnInit(): void {
    this.movieService.getSeatsByMovieAndDate().subscribe(response =>{
      const anyResponse = (response as any)
      const lastEL = anyResponse[anyResponse.length-1];
      var arr = this.movieService.makeArray((lastEL.row as number), (lastEL.column as number), false);
      anyResponse.forEach((element: { row: number; column: number; isReserved: boolean; }) => {
        arr[(element.row as number)][(element.column as number)] = !element.isReserved;
      });
      this.movieObject = { seats: arr, singleSeatPrice: 19.5 };
      this.seatRows = this.movieObject.seats;
      this.disabledSeats = this.movieObject.seats;
    
      this.seatRowsCopy = JSON.parse(JSON.stringify(this.seatRows));
      this.numberArray = Array(100).fill(0).map((x,i)=>i);
      this.selectedRows = 5;
      this.selectedSeats = 17;
      this.resizeObservable$ = fromEvent(window, 'resize')
      this.resizeSubscription$ = this.resizeObservable$.subscribe( (evt: any) => {
        this.updateOverflow();
      });
      this.formattedPrice = `Total: ` + this.price + `zł`;
      this.formattedSeatPrice = `Price for a single seat: ` + this.movieObject.singleSeatPrice + 'zł';
      this.formattedSelectedCount = `Selected seats: ` + this.selected;
      setTimeout(()=>{
        this.updateOverflow();
      });
    });
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }
  
  switch(event: any): void {
    let buttonId = event.target.attributes.id;
    if (buttonId){

      let nums = buttonId.value.toString().split("_");
      this.seatRowsCopy[nums[1]][nums[2]]? this.selected++ : this.selected--;
      this.price = this.selected * 19.50;
      this.formattedPrice = `Total: ` + this.price + `zł`;
      this.formattedSelectedCount = `Selected seats: ` + this.selected;
      this.seatRowsCopy[nums[1]][nums[2]] = !this.seatRowsCopy[nums[1]][nums[2]]
    }
  }
  
  getEquivalent(i: number, j: number): boolean {
    return this.seatRowsCopy[i][j];
  }

  updateOverflow(): void {
    const element = document.getElementById('overflow');
    this.isOverflown = element? element.offsetWidth != element.scrollWidth : false;
  }

  isDisabled(i: number, j: number) {
    return !this.disabledSeats[i][j];
  }

  isReserveButtonDisabled(): boolean {
    return this.selected === 0 || this.isWaiting;
  }
  
  submit() {
    this.movie = {...this.movie, date: this.movie.date + this.time, seats: this.selected.toString(), price: this.price + `zł`}
    this.isWaiting = true;
    setTimeout(() => {
      return this.movieService.reserveSeats(this.seatRowsCopy)
        .subscribe(response=>{
          if(response) {
            this.modal.close();
            this.router.navigate([`../reservation-form`, 
            {
              movie_title: this.movie.title,
              movie_date: this.movie.date,
              movie_price: this.movie.price,
              movie_hall: this.movie.hall,
              movie_seats: this.movie.seats,
            }]);
          }}
        );
    }, 1000);
  }

  getAplhabetLetter(index: number): string {
    const rest = index % 25;
    const main = Math.floor(index / 25) +1;
    let finalString = '';
    for(var i = 0; i < main; i++) {
      finalString += this.alphabet?.[rest];
    }
    return finalString;
  }
}
