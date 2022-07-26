import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  image_src = '../../assets/1.jpg';
  movieDetails: any; // [KOKOT] make an object instead of any...
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieDetails = this.movieService.getMovieDetails();
  }

  
}
