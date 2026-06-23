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
import { personAddOutline, trashOutline } from 'ionicons/icons';

import { Student } from '../../models/student';
import { GradeServices } from '../../services/grade-services';
import { StudentServices } from '../../services/student-services';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
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
export class StudentsPage {
  students: Student[] = [];
  studentForm: Student = {
    id: 0,
    matricule: '',
    nom: '',
    prenom: '',
    classe: '',
    dateNaissance: '',
  };
  classes = ['1er', '2e', '3e', '4e', '5e', '6e', '7e', '8e', '9e', '10e', '11e', '12e'];
  maxBirthDate = this.getMaxBirthDate();

  constructor(
    private studentServices: StudentServices,
    private gradeServices: GradeServices
  ) {
    addIcons({ personAddOutline, trashOutline });
    this.students = this.studentServices.getStudents();
    this.studentForm = this.emptyStudent();
  }

  addStudent() {
    if (!this.isFormValid()) {
      return;
    }

    this.studentServices.addStudent({
      ...this.studentForm,
      id: Date.now(),
      matricule: this.studentServices.generateMatricule(),
      nom: this.studentForm.nom.trim(),
      prenom: this.studentForm.prenom.trim(),
      classe: this.studentForm.classe.trim(),
      dateNaissance: this.studentForm.dateNaissance,
    });

    this.students = this.studentServices.getStudents();
    this.studentForm = this.emptyStudent();
  }

  deleteStudent(id: number) {
    this.studentServices.deleteStudent(id);
    this.gradeServices.deleteGradesByStudent(id);
    this.students = this.studentServices.getStudents();
  }

  private emptyStudent(): Student {
    return {
      id: 0,
      matricule: this.studentServices.generateMatricule(),
      nom: '',
      prenom: '',
      classe: '',
      dateNaissance: '',
    };
  }

  private isFormValid(): boolean {
    return Boolean(
      this.studentForm.nom.trim() &&
        this.studentForm.prenom.trim() &&
        this.studentForm.classe.trim() &&
        this.isAtLeastSixYearsOld(this.studentForm.dateNaissance)
    );
  }

  private getMaxBirthDate(): string {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 6);
    return today.toISOString().split('T')[0];
  }

  private isAtLeastSixYearsOld(dateNaissance: string): boolean {
    return Boolean(dateNaissance && dateNaissance <= this.maxBirthDate);
  }
}
