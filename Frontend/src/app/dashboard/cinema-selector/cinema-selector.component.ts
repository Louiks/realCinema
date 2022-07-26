import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cinema-selector',
  templateUrl: './cinema-selector.component.html',
  styleUrls: ['./cinema-selector.component.scss']
})
export class CinemaSelectorComponent implements OnInit {

  @Input()
  beforeText = '';

  constructor() { }

  ngOnInit(): void {
  }

}
