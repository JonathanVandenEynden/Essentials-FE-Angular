import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyChoiceDialogComponent } from './survey-choice-dialog.component';

describe('SurveyChoiceDialogComponent', () => {
  let component: SurveyChoiceDialogComponent;
  let fixture: ComponentFixture<SurveyChoiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyChoiceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyChoiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
