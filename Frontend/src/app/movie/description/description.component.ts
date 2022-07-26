import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MovieService } from '../movie.service';
import { SeatSelectionComponent } from '../seat-selection/seat-selection.component';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit {
  @Input()
  movieDetails?: any;

  categoriesWithPipes = [];
  selectedCinema = '';
  okText = 'Check';
  pipe = new DatePipe('en-US');
  formattedDate: any;
  times?: Date[] | string[];
  formattedTimes: any;
  moreInfo = 'More...';
  private openedModal?: any;

  constructor(
    private movieService: MovieService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.formattedDate = this.pipe.transform(
      this.movieDetails.premiere,
      'dd/MM/yyyy'
    );
    this.categoriesWithPipes = this.movieDetails.categories;
    this.selectedCinema = this.movieDetails.cinemas[0];
    this.updateRepertoire(this.movieDetails.cinemas[0]);
  }

  changeSelectedRowNo(event: any): void {
    this.selectedCinema = event;
    this.updateRepertoire(event);
  }

  updateRepertoire(cinema: string): void {
    this.times = this.movieService.getTimesMovieIsPlayed(cinema).times;
    this.formattedTimes = this.times;
    this.formatTimes();
  }

  formatTimes() {
    if (this.times) {
      for (let i = 0; i < this.times?.length; i++) {
        let newTime = this.pipe.transform(this.times[i], 'HH:mm');
        this.formattedTimes[i] = newTime ?? this.times[i];
      }
    }
  }

  seatReservationToggled(time: string): void {
    this.open(SeatSelectionComponent, time);
  }

  moreTimes(): void {
    console.error('this will not be implemented any time soon');
  }

  open(content: any, selectedTime: string) {
    this.openedModal = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
      centered: true,
      windowClass: 'popup-custom',
    });
    this.openedModal.componentInstance.modal = this.openedModal;
    this.openedModal.componentInstance.time = selectedTime;
  }
}
