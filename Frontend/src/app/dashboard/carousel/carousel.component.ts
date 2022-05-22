import { Component, OnInit } from '@angular/core';
import '@angular/localize/init'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  slides = [
    {
      src: '../../assets/1.jpg',
      label: 'this is a pro label',
      desc: 'this is a description',
      alt: 'alternative text',
    },
    {
      src: '../../assets/2.jpg',
      label: 'this is a pro label',
      desc: 'this is a description',
      alt: 'alternative text',
    },
    {
      src: '../../assets/3.jpg',
      label: 'this is a pro label',
      desc: 'this is a description',
      alt: 'alternative text',
    },
    {
      src: '../../assets/4.jpg',
      label: 'this is a pro label',
      desc: 'this is a description',
      alt: 'alternative text',
    },
    {
      src: '../../assets/5.jpg',
      label: 'this is a pro label',
      desc: 'this is a description',
      alt: 'alternative text',
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
