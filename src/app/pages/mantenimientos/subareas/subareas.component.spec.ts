import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubareasComponent } from './subareas.component';

describe('SubareasComponent', () => {
  let component: SubareasComponent;
  let fixture: ComponentFixture<SubareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubareasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
