import { Injectable } from '@angular/core';

import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieServices {
  private movies: Movie[] = [];

  getMovies(): Movie[] {
    return [...this.movies];
  }

  addMovie(movie: Movie): void {
    this.movies = [movie, ...this.movies];
  }

  deleteMovie(id: number): void {
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }
}
