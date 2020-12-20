import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewAssessmentComponent } from './overview-assessment.component';

describe('OverviewAssessmentComponent', () => {
  let component: OverviewAssessmentComponent;
  let fixture: ComponentFixture<OverviewAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
