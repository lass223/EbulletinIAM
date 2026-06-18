import { Injectable } from '@angular/core';

import { ReportCard } from '../models/report-card';

@Injectable({
  providedIn: 'root',
})
export class ReportCardServices {
  private reportCards: ReportCard[] = [];

  getReportCards(): ReportCard[] {
    return [...this.reportCards];
  }

  addReportCard(reportCard: ReportCard): void {
    this.reportCards = [reportCard, ...this.reportCards];
  }

  deleteReportCard(id: number): void {
    this.reportCards = this.reportCards.filter(
      (reportCard) => reportCard.id !== id
    );
  }
}
