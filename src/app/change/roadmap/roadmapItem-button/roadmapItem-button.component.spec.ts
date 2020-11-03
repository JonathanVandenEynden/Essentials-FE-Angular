import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapItemButtonComponent } from './roadmapItem-button.component';

describe('SurveyButtonComponent', () => {
  let component: RoadmapItemButtonComponent;
  let fixture: ComponentFixture<RoadmapItemButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadmapItemButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadmapItemButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
