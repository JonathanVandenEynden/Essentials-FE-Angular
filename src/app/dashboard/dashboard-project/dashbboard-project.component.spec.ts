import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbboardProjectComponent } from './dashbboard-project.component';

describe('DashbboardProjectComponent', () => {
  let component: DashbboardProjectComponent;
  let fixture: ComponentFixture<DashbboardProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbboardProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbboardProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
