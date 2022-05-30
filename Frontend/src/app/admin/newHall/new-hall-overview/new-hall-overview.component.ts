import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { reduce } from 'rxjs';

@Component({
  selector: 'app-new-hall-overview',
  templateUrl: './new-hall-overview.component.html',
  styleUrls: ['./new-hall-overview.component.scss']
})
export class NewHallOverviewComponent implements OnInit, AfterViewChecked{
  seatRowsCopy: any;
  numberArray: number[] | undefined;
  selectedRows: number | undefined;
  selectedSeats: number | undefined;
  seatRows: boolean[][] | undefined;
  isOverflown = false;
  alphabet: string | undefined;
  

  constructor() { }
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
  }

  getEquivalent(i: number, j: number): boolean {
    return this.seatRowsCopy[i][j];
  }

  switch(event: any): void {
    let buttonId = event.target.attributes.id;
    let nums = buttonId.value.toString().split("_");
    console.log(event);
    this.seatRowsCopy[nums[1]][nums[2]] = !this.seatRowsCopy[nums[1]][nums[2]]
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
    this.seatRows = Array(this.selectedRows).fill([true]).map((x,i)=>Array(this.selectedSeats).fill(true))
    //this.seatRowsCopy = JSON.parse(JSON.stringify(this.seatRows));
    this.seatRowsCopy = JSON.parse(JSON.stringify(this.seatRows));
  }

  updateOverflow(): void {
    const element = document.getElementById('overflow');
    this.isOverflown = element? element.offsetWidth != element.scrollWidth : false;
    console.log(this.isOverflown);
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