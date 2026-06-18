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

import { Subject } from '../../models/subject';
import { SubjectServices } from '../../services/subject-services';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.page.html',
  styleUrls: ['./subjects.page.scss'],
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
export class SubjectsPage {
  subjects: Subject[] = [];
  subjectForm: Subject = this.emptySubject();

  constructor(private subjectServices: SubjectServices) {
    addIcons({ addCircleOutline, trashOutline });
    this.subjects = this.subjectServices.getSubjects();
  }

  addSubject(): void {
    if (!this.isFormValid()) {
      return;
    }

    this.subjectServices.addSubject({
      ...this.subjectForm,
      id: Date.now(),
      code: this.subjectForm.code.trim(),
      libelle: this.subjectForm.libelle.trim(),
      coefficient: Number(this.subjectForm.coefficient),
    });
    this.subjects = this.subjectServices.getSubjects();
    this.subjectForm = this.emptySubject();
  }

  deleteSubject(id: number): void {
    this.subjectServices.deleteSubject(id);
    this.subjects = this.subjectServices.getSubjects();
  }

  private emptySubject(): Subject {
    return { id: 0, code: '', libelle: '', coefficient: 1 };
  }

  private isFormValid(): boolean {
    return Boolean(
      this.subjectForm.code.trim() &&
        this.subjectForm.libelle.trim() &&
        Number(this.subjectForm.coefficient) > 0
    );
  }
}
