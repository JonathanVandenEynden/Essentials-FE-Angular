import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRoadmapItemComponent } from './dashboard-roadmap-item.component';

describe('DashboardRoadmapItemComponent', () => {
  let component: DashboardRoadmapItemComponent;
  let fixture: ComponentFixture<DashboardRoadmapItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardRoadmapItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardRoadmapItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
