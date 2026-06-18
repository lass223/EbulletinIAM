import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportCardPage } from './report-card.page';

describe('ReportCardPage', () => {
  let component: ReportCardPage;
  let fixture: ComponentFixture<ReportCardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
