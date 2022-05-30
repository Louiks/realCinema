import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss']
})
export class DashboardOverviewComponent implements OnInit {

  ngOnInit(): void {
  }

  imageSize = {width: 350, height: 200, space: 10};

  imgCollection: Array<object> = [
    {
      image: 'https://loremflickr.com/g/600/400/paris',
      thumbImage: '../../assets/slider/1.jpg',
      alt: 'Image 1',
      title: 'Image 1'
    }, {
      image: 'https://loremflickr.com/600/400/brazil,rio',
      thumbImage: '../../assets/slider/2.JPG',
      title: 'Image 2',
      alt: 'Image 2'
    }, {
      image: 'https://loremflickr.com/600/400/paris,girl/all',
      thumbImage: '../../assets/slider/3.jpg',
      title: 'Image 3',
      alt: 'Image 3'
    },  {
      image: 'https://loremflickr.com/600/400/paris,girl/all',
      thumbImage: '../../assets/1.jpg',
      title: 'Image 4',
      alt: 'Image 4'
    },  {
      image: 'https://loremflickr.com/600/400/paris,girl/all',
      thumbImage: '../../assets/2.jpg',
      title: 'Image 4',
      alt: 'Image 4'
    }, 
    // {
    //   image: 'https://loremflickr.com/600/400/brazil,rio',
    //   thumbImage: 'https://loremflickr.com/1200/800/brazil,rio',
    //   title: 'Image 6',
    //   alt: 'Image 6'
    // },
];
}
