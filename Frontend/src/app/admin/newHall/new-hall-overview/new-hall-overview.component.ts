import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Observable, reduce, Subscription } from 'rxjs';
import { NewHallService } from '../new-hall.service';

@Component({
  selector: 'app-new-hall-overview',
  templateUrl: './new-hall-overview.component.html',
  styleUrls: ['./new-hall-overview.component.scss']
})
export class NewHallOverviewComponent implements OnInit, AfterViewChecked{
  seatRowsCopy?: boolean[][];
  numberArray: number[] | undefined;
  selectedRows: number | undefined;
  selectedSeats: number | undefined;
  seatRows: boolean[][] | undefined;
  isOverflown = false;
  alphabet: string | undefined;
  resizeObservable$: Observable<Event> | undefined;
  resizeSubscription$: Subscription | undefined;
  isWaiting = false;
  responseAvailable = false;
  response = '';

  constructor(private newHallService: NewHallService,  protected readonly router: Router) { }

  ngAfterViewChecked(): void {
    this.updateOverflow();
  }

  ngOnInit(): void {
    this.seatRows = [
      [true,false,false,true,false,true,false,true,false,true,true,true,false,true,true,true,false],
      [true,false,true,false,false,true,false,true,false,true,false,true,false,true,false,true,false], 
      [true,true,false,false,false,true,false,true,false,true,true,true,false,true,true,true,false],
      [true,false,true,false,false,true,false,true,false,true,false,true,false,true,false,true,false],
      [true,false,false,true,false,true,true,true,false,true,true,true,false,true,false,true,false]];
  
    this.seatRowsCopy = JSON.parse(JSON.stringify(this.seatRows));
    this.numberArray = Array(100).fill(0).map((x,i)=>i);

    this.selectedRows = 5;
    this.selectedSeats = 17;
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
      console.log('event: ', evt)
      this.updateOverflow();
    })
  }

  getEquivalent(i: number, j: number): boolean | undefined {
    return this.seatRowsCopy?.[i][j];
  }

  switch(event: any): void {
    let buttonId = event.target.attributes.id;
    let nums = buttonId.value.toString().split("_");
    console.log(event);
    if (this.seatRowsCopy) {
      this.seatRowsCopy[nums[1]][nums[2]] = !this.seatRowsCopy?.[nums[1]][nums[2]];
    }
  }

  changeSelectedRowNo(event: any): void {
    this.selectedRows = event;
    this.generateHall();
  }

  changeSelectedSeatNo(event: any): void {
    this.selectedSeats = event;
    this.generateHall();
  }  

  generateHall(): void {
    this.seatRows = Array(this.selectedRows).fill([true]).map((x,i)=>Array(this.selectedSeats).fill(true));
    this.seatRowsCopy = JSON.parse(JSON.stringify(this.seatRows));
  }

  updateOverflow(): void {
    const element = document.getElementById('overflow');
    this.isOverflown = element? element.offsetWidth != element.scrollWidth : false;
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

  submitAddingNewHall() {
    this.isWaiting = true;
    this.seatRowsCopy && this.newHallService.addNewHall(this.seatRowsCopy).subscribe(response => {
      setTimeout(()=>{
        this.responseAvailable = true;
        if(response) {
          this.response = response;
        }
      },2000);
      setTimeout(()=>{
        this.isWaiting = false;
        this.router.navigate([`../dashboard`]);
      },4200);
    });
  }
}
