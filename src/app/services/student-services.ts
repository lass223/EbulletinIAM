import { Injectable } from '@angular/core';

import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentServices {
  private readonly storageKey = 'ebulletin-students';
  private students: Student[] = this.loadStudents();

  getStudents(): Student[] {
    return [...this.students];
  }

  generateMatricule(): string {
    return this.generateCode('ETU', this.students.map((student) => student.matricule));
  }

  addStudent(student: Student): void {
    this.students = [student, ...this.students];
    this.saveStudents();
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter((student) => student.id !== id);
    this.saveStudents();
  }

  private loadStudents(): Student[] {
    const storedStudents = this.getStorageItem();
    return storedStudents ? (JSON.parse(storedStudents) as Student[]) : [];
  }

  private saveStudents(): void {
    this.setStorageItem(JSON.stringify(this.students));
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

  private generateCode(prefix: string, existingCodes: string[]): string {
    const nextNumber =
      existingCodes
        .filter((code) => code.startsWith(prefix))
        .map((code) => Number(code.replace(prefix, '')))
        .filter((value) => !Number.isNaN(value))
        .reduce((max, value) => Math.max(max, value), 0) + 1;

    return `${prefix}${nextNumber.toString().padStart(4, '0')}`;
  }
}
