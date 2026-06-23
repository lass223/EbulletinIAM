import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  barChartOutline,
  bookOutline,
  documentTextOutline,
  filmOutline,
  peopleOutline,
} from 'ionicons/icons';

import { GradeServices } from '../../services/grade-services';
import { MovieServices } from '../../services/movie-services';
import { ReportCardServices } from '../../services/report-card-services';
import { StudentServices } from '../../services/student-services';
import { SubjectServices } from '../../services/subject-services';

interface DashboardItem {
  title: string;
  count: number;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonRow,
    IonTitle,
    IonToolbar,
  ],
})
export class DashboardPage {
  items: DashboardItem[] = [];

  constructor(
    private studentServices: StudentServices,
    private subjectServices: SubjectServices,
    private gradeServices: GradeServices,
    private reportCardServices: ReportCardServices,
    private movieServices: MovieServices
  ) {
    addIcons({
      barChartOutline,
      bookOutline,
      documentTextOutline,
      filmOutline,
      peopleOutline,
    });
    this.refreshItems();
  }

  ionViewWillEnter(): void {
    this.refreshItems();
  }

  private refreshItems(): void {
    const grades = this.gradeServices.getGrades();
    const subjects = this.subjectServices.getSubjects();

    this.items = [
      {
        title: 'Étudiants',
        count: this.studentServices.getStudents().length,
        url: '/students',
        icon: 'people-outline',
      },
      {
        title: 'Matières',
        count: this.subjectServices.getSubjects().length,
        url: '/subjects',
        icon: 'book-outline',
      },
      {
        title: 'Notes',
        count: grades.length,
        url: '/grade',
        icon: 'bar-chart-outline',
      },
      {
        title: 'Bulletins',
        count: this.reportCardServices.generateReportCards(grades, subjects).length,
        url: '/report-card',
        icon: 'document-text-outline',
      },
      {
        title: 'Films',
        count: this.movieServices.getMovies().length,
        url: '/movies',
        icon: 'film-outline',
      },
    ];
  }
}
