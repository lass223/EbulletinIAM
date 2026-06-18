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
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline, trashOutline } from 'ionicons/icons';

import { Grade } from '../../models/grade';
import { Student } from '../../models/student';
import { Subject } from '../../models/subject';
import { GradeServices } from '../../services/grade-services';
import { StudentServices } from '../../services/student-services';
import { SubjectServices } from '../../services/subject-services';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.page.html',
  styleUrls: ['./grade.page.scss'],
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
    IonTitle,
    IonToolbar,
  ],
})
export class GradePage {
  grades: Grade[] = [];
  students: Student[] = [];
  subjects: Subject[] = [];
  gradeForm: Grade = this.emptyGrade();

  constructor(
    private gradeServices: GradeServices,
    private studentServices: StudentServices,
    private subjectServices: SubjectServices
  ) {
    addIcons({ addCircleOutline, trashOutline });
    this.refreshData();
  }

  ionViewWillEnter(): void {
    this.refreshData();
  }

  addGrade(): void {
    if (!this.isFormValid()) {
      return;
    }

    this.gradeServices.addGrade({
      id: Date.now(),
      studentId: Number(this.gradeForm.studentId),
      subjectId: Number(this.gradeForm.subjectId),
      note: Number(this.gradeForm.note),
    });
    this.grades = this.gradeServices.getGrades();
    this.gradeForm = this.emptyGrade();
  }

  deleteGrade(id: number): void {
    this.gradeServices.deleteGrade(id);
    this.grades = this.gradeServices.getGrades();
  }

  getStudentName(studentId: number): string {
    const student = this.students.find((item) => item.id === studentId);
    return student ? `${student.nom} ${student.prenom}` : 'Étudiant inconnu';
  }

  getSubjectName(subjectId: number): string {
    return (
      this.subjects.find((subject) => subject.id === subjectId)?.libelle ??
      'Matière inconnue'
    );
  }

  private refreshData(): void {
    this.grades = this.gradeServices.getGrades();
    this.students = this.studentServices.getStudents();
    this.subjects = this.subjectServices.getSubjects();
  }

  private emptyGrade(): Grade {
    return { id: 0, studentId: 0, subjectId: 0, note: 0 };
  }

  private isFormValid(): boolean {
    const note = Number(this.gradeForm.note);
    return Boolean(
      Number(this.gradeForm.studentId) &&
        Number(this.gradeForm.subjectId) &&
        note >= 0 &&
        note <= 20
    );
  }
}
