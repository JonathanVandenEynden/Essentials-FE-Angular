import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRoadmapItemComponent } from './update-roadmap-item.component';

describe('UpdateRoadmapItemComponent', () => {
  let component: UpdateRoadmapItemComponent;
  let fixture: ComponentFixture<UpdateRoadmapItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRoadmapItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRoadmapItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
