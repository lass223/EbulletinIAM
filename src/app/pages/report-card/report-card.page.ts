import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { Grade } from '../../models/grade';
import { ReportCard } from '../../models/report-card';
import { Student } from '../../models/student';
import { Subject } from '../../models/subject';
import { GradeServices } from '../../services/grade-services';
import { ReportCardServices } from '../../services/report-card-services';
import { StudentServices } from '../../services/student-services';
import { SubjectServices } from '../../services/subject-services';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.page.html',
  styleUrls: ['./report-card.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar,
  ],
})
export class ReportCardPage {
  reportCards: ReportCard[] = [];
  selectedReportCard: ReportCard | null = null;
  selectedStudentId = 0;
  students: Student[] = [];
  grades: Grade[] = [];
  subjects: Subject[] = [];

  constructor(
    private reportCardServices: ReportCardServices,
    private studentServices: StudentServices,
    private gradeServices: GradeServices,
    private subjectServices: SubjectServices
  ) {
    this.refreshData();
  }

  ionViewWillEnter(): void {
    this.refreshData();
  }

  generateSelectedReportCard(): void {
    this.selectedReportCard = this.reportCardServices.generateReportCard(
      Number(this.selectedStudentId),
      this.grades,
      this.subjects
    );
  }

  getStudentName(studentId: number): string {
    const student = this.students.find((item) => item.id === studentId);
    return student ? `${student.nom} ${student.prenom}` : 'Etudiant inconnu';
  }

  getStudentGrades(studentId: number): Grade[] {
    return this.grades.filter((grade) => grade.studentId === studentId);
  }

  getSubjectName(subjectId: number): string {
    return (
      this.subjects.find((subject) => subject.id === subjectId)?.libelle ??
      'Matiere inconnue'
    );
  }

  getSubjectCoefficient(subjectId: number): number {
    return (
      this.subjects.find((subject) => subject.id === subjectId)?.coefficient ?? 1
    );
  }

  private refreshData(): void {
    this.students = this.studentServices.getStudents();
    this.grades = this.gradeServices.getGrades();
    this.subjects = this.subjectServices.getSubjects();
    this.reportCards = this.reportCardServices.generateReportCards(
      this.grades,
      this.subjects
    );
    this.generateSelectedReportCard();
  }
}
