import { Injectable } from '@angular/core';

import { Grade } from '../models/grade';

@Injectable({
  providedIn: 'root',
})
export class GradeServices {
  private grades: Grade[] = [];

  getGrades(): Grade[] {
    return [...this.grades];
  }

  addGrade(grade: Grade): void {
    this.grades = [grade, ...this.grades];
  }

  deleteGrade(id: number): void {
    this.grades = this.grades.filter((grade) => grade.id !== id);
  }
}
