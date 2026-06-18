import { Injectable } from '@angular/core';

import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root',
})
export class SubjectServices {
  private subjects: Subject[] = [];

  getSubjects(): Subject[] {
    return [...this.subjects];
  }

  addSubject(subject: Subject): void {
    this.subjects = [subject, ...this.subjects];
  }

  deleteSubject(id: number): void {
    this.subjects = this.subjects.filter((subject) => subject.id !== id);
  }
}
