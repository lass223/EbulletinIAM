import { Injectable } from '@angular/core';

import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root',
})
export class SubjectServices {
  private readonly storageKey = 'ebulletin-subjects';
  private subjects: Subject[] = this.loadSubjects();

  getSubjects(): Subject[] {
    return [...this.subjects];
  }

  generateSubjectCode(): string {
    return this.generateCode('MAT', this.subjects.map((subject) => subject.code));
  }

  addSubject(subject: Subject): void {
    this.subjects = [subject, ...this.subjects];
    this.saveSubjects();
  }

  deleteSubject(id: number): void {
    this.subjects = this.subjects.filter((subject) => subject.id !== id);
    this.saveSubjects();
  }

  private loadSubjects(): Subject[] {
    const storedSubjects = this.getStorageItem();
    return storedSubjects ? (JSON.parse(storedSubjects) as Subject[]) : [];
  }

  private saveSubjects(): void {
    this.setStorageItem(JSON.stringify(this.subjects));
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
