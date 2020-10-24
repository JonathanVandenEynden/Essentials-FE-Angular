import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChangeComponent } from './update-change.component';

describe('UpdateChangeComponent', () => {
  let component: UpdateChangeComponent;
  let fixture: ComponentFixture<UpdateChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
