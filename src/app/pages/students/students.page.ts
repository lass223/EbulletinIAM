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
import { personAddOutline, trashOutline } from 'ionicons/icons';

import { Student } from '../../models/student';
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
    IonTitle,
    IonToolbar,
  ],
})
export class StudentsPage {
  students: Student[] = [];
  studentForm: Student = this.emptyStudent();

  constructor(private studentServices: StudentServices) {
    addIcons({ personAddOutline, trashOutline });
    this.students = this.studentServices.getStudents();
  }

  addStudent() {
    if (!this.isFormValid()) {
      return;
    }

    this.studentServices.addStudent({
      ...this.studentForm,
      id: Date.now(),
      matricule: this.studentForm.matricule.trim(),
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
    this.students = this.studentServices.getStudents();
  }

  private emptyStudent(): Student {
    return {
      id: 0,
      matricule: '',
      nom: '',
      prenom: '',
      classe: '',
      dateNaissance: '',
    };
  }

  private isFormValid(): boolean {
    return Boolean(
      this.studentForm.matricule.trim() &&
        this.studentForm.nom.trim() &&
        this.studentForm.prenom.trim() &&
        this.studentForm.classe.trim() &&
        this.studentForm.dateNaissance
    );
  }
}
