import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChangeComponent } from './add-change.component';

describe('AddChangeComponent', () => {
  let component: AddChangeComponent;
  let fixture: ComponentFixture<AddChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
