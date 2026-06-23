import { Injectable } from '@angular/core';

import { Grade } from '../models/grade';

@Injectable({
  providedIn: 'root',
})
export class GradeServices {
  private readonly storageKey = 'ebulletin-grades';
  private grades: Grade[] = this.loadGrades();

  getGrades(): Grade[] {
    return [...this.grades];
  }

  addGrade(grade: Grade): void {
    this.grades = [grade, ...this.grades];
    this.saveGrades();
  }

  deleteGrade(id: number): void {
    this.grades = this.grades.filter((grade) => grade.id !== id);
    this.saveGrades();
  }

  deleteGradesByStudent(studentId: number): void {
    this.grades = this.grades.filter((grade) => grade.studentId !== studentId);
    this.saveGrades();
  }

  deleteGradesBySubject(subjectId: number): void {
    this.grades = this.grades.filter((grade) => grade.subjectId !== subjectId);
    this.saveGrades();
  }

  private loadGrades(): Grade[] {
    const storedGrades = this.getStorageItem();
    return storedGrades ? (JSON.parse(storedGrades) as Grade[]) : [];
  }

  private saveGrades(): void {
    this.setStorageItem(JSON.stringify(this.grades));
  }

  private getStorageItem(): string | null {
    return typeof localStorage === 'undefined'
      ? null
      : localStorage.getItem(this.storageKey);
  }

  private setStorageItem(value: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, value);
    }
  }
}
