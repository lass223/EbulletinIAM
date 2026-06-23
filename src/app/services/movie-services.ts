import { Injectable } from '@angular/core';

import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieServices {
  private readonly storageKey = 'ebulletin-movies';
  private movies: Movie[] = this.loadMovies();

  getMovies(): Movie[] {
    return [...this.movies];
  }

  addMovie(movie: Movie): void {
    this.movies = [movie, ...this.movies];
    this.saveMovies();
  }

  deleteMovie(id: number): void {
    this.movies = this.movies.filter((movie) => movie.id !== id);
    this.saveMovies();
  }

  private loadMovies(): Movie[] {
    const storedMovies = this.getStorageItem();
    return storedMovies ? (JSON.parse(storedMovies) as Movie[]) : [];
  }

  private saveMovies(): void {
    this.setStorageItem(JSON.stringify(this.movies));
  }

  private getStorageItem(): string | null {
    return typeof localStorage === 'undefined'
      ? null
      : localStorage.getItem(this.storageKey);
  }

  private setStorageItem(value: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, value);
    }
  }
}
