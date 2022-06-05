import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
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
  movie = '';

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

  constructor(private movieService: MovieService) { }

  ngAfterViewInit(): void {
    this.updateOverflow();
  }

  ngOnInit(): void {
    this.movieObject =  this.movieService.getSeatsByMovieAndDate(this.movie, this.date);
    this.seatRows = this.movieObject.seats;
    this.disabledSeats = this.movieObject.seats;
  
    this.seatRowsCopy = JSON.parse(JSON.stringify(this.seatRows));
    this.numberArray = Array(100).fill(0).map((x,i)=>i);

    this.selectedRows = 5;
    this.selectedSeats = 17;
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe( (evt: any) => {
      this.updateOverflow();
    });
    this.formattedPrice = `Total: ` + this.price + `zł`;
    this.formattedSeatPrice = `Price for a single seat: ` + this.movieObject.singleSeatPrice + 'zł';
    this.formattedSelectedCount = `Selected seats: ` + this.selected;
  }
  
  switch(event: any): void {
    let buttonId = event.target.attributes.id;
    let nums = buttonId.value.toString().split("_");
    this.seatRowsCopy[nums[1]][nums[2]]? this.selected++ : this.selected--;
    this.price = this.selected * 19.50;
    this.formattedPrice = `Total: ` + this.price + `zł`;
    this.formattedSelectedCount = `Selected seats: ` + this.selected;
    this.seatRowsCopy[nums[1]][nums[2]] = !this.seatRowsCopy[nums[1]][nums[2]]
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

  submit(): void {
    
  }
}
