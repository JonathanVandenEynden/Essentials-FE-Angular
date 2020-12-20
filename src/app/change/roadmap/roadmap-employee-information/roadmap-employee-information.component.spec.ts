import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapEmployeeInformationComponent } from './roadmap-employee-information.component';

describe('RoadmapEmployeeInformationComponent', () => {
  let component: RoadmapEmployeeInformationComponent;
  let fixture: ComponentFixture<RoadmapEmployeeInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadmapEmployeeInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadmapEmployeeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
