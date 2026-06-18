import { Injectable } from '@angular/core';

import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentServices {
  private students: Student[] = [];

  getStudents(): Student[] {
    return [...this.students];
  }

  addStudent(student: Student): void {
    this.students = [student, ...this.students];
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter((student) => student.id !== id);
  }
}
