import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoadmapItemComponent } from './add-roadmap-item.component';

describe('AddRoadmapItemComponent', () => {
  let component: AddRoadmapItemComponent;
  let fixture: ComponentFixture<AddRoadmapItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRoadmapItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoadmapItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
