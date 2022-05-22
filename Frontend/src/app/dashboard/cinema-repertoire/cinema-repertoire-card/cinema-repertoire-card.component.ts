import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cinema-repertoire-card',
  templateUrl: './cinema-repertoire-card.component.html',
  styleUrls: ['./cinema-repertoire-card.component.scss']
})
export class CinemaRepertoireCardComponent implements OnInit {

  @Input()
  imgSrc?: string = '../../../../assets/slider/1.jpg';
  
  @Input()
  cardTitle?: string;

  @Input()
  cardDesc?: string;

  @Input()
  cardButtonText: string = 'details';

  @Input()
  cardButtonLink?: string = 'details';

  constructor() { }

  ngOnInit(): void {
  }

}
