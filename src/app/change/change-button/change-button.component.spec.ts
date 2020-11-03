import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeButtonComponent } from './change-button.component';

describe('ChangeButtonComponent', () => {
  let component: ChangeButtonComponent;
  let fixture: ComponentFixture<ChangeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
