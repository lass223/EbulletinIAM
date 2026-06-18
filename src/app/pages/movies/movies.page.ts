import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline, trashOutline } from 'ionicons/icons';

import { Movie } from '../../models/movie';
import { MovieServices } from '../../services/movie-services';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonTitle,
    IonToolbar,
  ],
})
export class MoviesPage {
  movies: Movie[] = [];
  movieForm: Movie = this.emptyMovie();

  constructor(private movieServices: MovieServices) {
    addIcons({ addCircleOutline, trashOutline });
    this.movies = this.movieServices.getMovies();
  }

  addMovie(): void {
    if (!this.isFormValid()) {
      return;
    }

    this.movieServices.addMovie({
      id: Date.now(),
      titre: this.movieForm.titre.trim(),
      genre: this.movieForm.genre.trim(),
      anneeSortie: Number(this.movieForm.anneeSortie),
    });
    this.movies = this.movieServices.getMovies();
    this.movieForm = this.emptyMovie();
  }

  deleteMovie(id: number): void {
    this.movieServices.deleteMovie(id);
    this.movies = this.movieServices.getMovies();
  }

  private emptyMovie(): Movie {
    return {
      id: 0,
      titre: '',
      genre: '',
      anneeSortie: new Date().getFullYear(),
    };
  }

  private isFormValid(): boolean {
    return Boolean(
      this.movieForm.titre.trim() &&
        this.movieForm.genre.trim() &&
        Number(this.movieForm.anneeSortie) > 1887
    );
  }
}
