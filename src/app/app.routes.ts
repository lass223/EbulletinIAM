import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'subjects',
    loadComponent: () => import('./pages/subjects/subjects.page').then( m => m.SubjectsPage)
  },
  {
    path: 'grade',
    loadComponent: () => import('./pages/grade/grade.page').then( m => m.GradePage)
  },
  {
    path: 'report-card',
    loadComponent: () => import('./pages/report-card/report-card.page').then( m => m.ReportCardPage)
  },
  {
    path: 'movies',
    loadComponent: () => import('./pages/movies/movies.page').then( m => m.MoviesPage)
  },
  {
    path: 'students',
    loadComponent: () => import('./pages/students/students.page').then( m => m.StudentsPage)
  },
];
