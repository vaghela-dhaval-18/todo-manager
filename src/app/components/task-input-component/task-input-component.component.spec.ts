import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskInputComponentComponent } from './task-input-component.component';

describe('TaskInputComponentComponent', () => {
  let component: TaskInputComponentComponent;
  let fixture: ComponentFixture<TaskInputComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskInputComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskInputComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
