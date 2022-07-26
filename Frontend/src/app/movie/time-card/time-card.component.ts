import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-time-card',
  templateUrl: './time-card.component.html',
  styleUrls: ['./time-card.component.scss'],
})
export class TimeCardComponent implements OnInit {

  @Input()
  time?: Date[];

  @Input()
  other?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
