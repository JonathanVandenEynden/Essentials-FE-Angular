import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapItemDetailComponent } from './roadmap-item-detail.component';

describe('RoadmapItemDetailComponent', () => {
  let component: RoadmapItemDetailComponent;
  let fixture: ComponentFixture<RoadmapItemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadmapItemDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadmapItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
