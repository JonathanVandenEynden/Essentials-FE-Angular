import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSurveyComponent } from './dashboard-survey.component';

describe('DashboardSurveyComponent', () => {
  let component: DashboardSurveyComponent;
  let fixture: ComponentFixture<DashboardSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
