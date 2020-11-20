import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRoadmapItemComponent } from './delete-roadmap-item.component';

describe('DeleteRoadmapItemComponent', () => {
  let component: DeleteRoadmapItemComponent;
  let fixture: ComponentFixture<DeleteRoadmapItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRoadmapItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRoadmapItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
