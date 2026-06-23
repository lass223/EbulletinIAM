import { Injectable } from '@angular/core';

import { Grade } from '../models/grade';
import { ReportCard } from '../models/report-card';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root',
})
export class ReportCardServices {
  generateReportCards(grades: Grade[], subjects: Subject[]): ReportCard[] {
    const studentIds = [...new Set(grades.map((grade) => grade.studentId))];
    return studentIds
      .map((studentId) => this.generateReportCard(studentId, grades, subjects))
      .filter((reportCard): reportCard is ReportCard => reportCard !== null)
      .sort((first, second) => first.rang - second.rang);
  }

  generateReportCard(
    studentId: number,
    grades: Grade[],
    subjects: Subject[]
  ): ReportCard | null {
    const studentGrades = grades.filter((grade) => grade.studentId === studentId);

    if (studentGrades.length === 0) {
      return null;
    }

    const averages = this.calculateAveragesByStudent(grades, subjects);
    const average = averages.get(studentId);

    if (average === undefined) {
      return null;
    }

    return {
      id: studentId,
      studentId,
      moyenne: Number(average.toFixed(2)),
      rang: this.calculateRank(studentId, averages),
      appreciation: this.getAppreciation(average),
    };
  }

  private calculateAveragesByStudent(
    grades: Grade[],
    subjects: Subject[]
  ): Map<number, number> {
    const groupedGrades = new Map<number, Grade[]>();

    grades.forEach((grade) => {
      groupedGrades.set(grade.studentId, [
        ...(groupedGrades.get(grade.studentId) ?? []),
        grade,
      ]);
    });

    return new Map(
      [...groupedGrades.entries()].map(([studentId, studentGrades]) => [
        studentId,
        this.calculateAverage(studentGrades, subjects),
      ])
    );
  }

  private calculateAverage(grades: Grade[], subjects: Subject[]): number {
    const totals = grades.reduce(
      (result, grade) => {
        const coefficient =
          subjects.find((subject) => subject.id === grade.subjectId)
            ?.coefficient ?? 1;

        return {
          points: result.points + Number(grade.note) * coefficient,
          coefficients: result.coefficients + coefficient,
        };
      },
      { points: 0, coefficients: 0 }
    );

    return totals.coefficients === 0 ? 0 : totals.points / totals.coefficients;
  }

  private calculateRank(studentId: number, averages: Map<number, number>): number {
    const sortedAverages = [...averages.entries()].sort(
      ([, firstAverage], [, secondAverage]) => secondAverage - firstAverage
    );
    return (
      sortedAverages.findIndex(([currentStudentId]) => currentStudentId === studentId) +
      1
    );
  }

  private getAppreciation(average: number): string {
    if (average >= 16) {
      return 'Tres bien';
    }

    if (average >= 14) {
      return 'Bien';
    }

    if (average >= 12) {
      return 'Assez bien';
    }

    if (average >= 10) {
      return 'Passable';
    }

    return 'Insuffisant';
  }
}
