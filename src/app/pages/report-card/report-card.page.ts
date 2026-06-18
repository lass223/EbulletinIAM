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
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline, trashOutline } from 'ionicons/icons';

import { ReportCard } from '../../models/report-card';
import { Student } from '../../models/student';
import { ReportCardServices } from '../../services/report-card-services';
import { StudentServices } from '../../services/student-services';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.page.html',
  styleUrls: ['./report-card.page.scss'],
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
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonTitle,
    IonToolbar,
  ],
})
export class ReportCardPage {
  reportCards: ReportCard[] = [];
  students: Student[] = [];
  reportCardForm: ReportCard = this.emptyReportCard();

  constructor(
    private reportCardServices: ReportCardServices,
    private studentServices: StudentServices
  ) {
    addIcons({ addCircleOutline, trashOutline });
    this.refreshData();
  }

  ionViewWillEnter(): void {
    this.refreshData();
  }

  addReportCard(): void {
    if (!this.isFormValid()) {
      return;
    }

    this.reportCardServices.addReportCard({
      id: Date.now(),
      studentId: Number(this.reportCardForm.studentId),
      moyenne: Number(this.reportCardForm.moyenne),
      rang: Number(this.reportCardForm.rang),
      appreciation: this.reportCardForm.appreciation.trim(),
    });
    this.reportCards = this.reportCardServices.getReportCards();
    this.reportCardForm = this.emptyReportCard();
  }

  deleteReportCard(id: number): void {
    this.reportCardServices.deleteReportCard(id);
    this.reportCards = this.reportCardServices.getReportCards();
  }

  getStudentName(studentId: number): string {
    const student = this.students.find((item) => item.id === studentId);
    return student ? `${student.nom} ${student.prenom}` : 'Étudiant inconnu';
  }

  private refreshData(): void {
    this.reportCards = this.reportCardServices.getReportCards();
    this.students = this.studentServices.getStudents();
  }

  private emptyReportCard(): ReportCard {
    return { id: 0, studentId: 0, moyenne: 0, rang: 1, appreciation: '' };
  }

  private isFormValid(): boolean {
    const moyenne = Number(this.reportCardForm.moyenne);
    return Boolean(
      Number(this.reportCardForm.studentId) &&
        moyenne >= 0 &&
        moyenne <= 20 &&
        Number(this.reportCardForm.rang) > 0 &&
        this.reportCardForm.appreciation.trim()
    );
  }
}
