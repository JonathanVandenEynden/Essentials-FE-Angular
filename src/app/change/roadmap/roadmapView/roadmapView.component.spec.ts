import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapViewComponent } from './roadmapView.component';

describe('SurveyComponent', () => {
  let component: RoadmapViewComponent;
  let fixture: ComponentFixture<RoadmapViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadmapViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadmapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
