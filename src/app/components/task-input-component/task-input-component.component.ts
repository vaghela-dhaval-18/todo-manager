import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-task-input-component',
  imports: [ReactiveFormsModule],
  templateUrl: './task-input-component.component.html',
  styleUrl: './task-input-component.component.css',
})
export class TaskInputComponentComponent implements OnChanges {
  @Input() taskToEdit: any = null;
  @Output() taskAdded = new EventEmitter<any>();
  @Output() taskEdited = new EventEmitter<any>();

  formData: FormGroup = new FormGroup({
    taskTitle: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    taskDate: new FormControl('', [Validators.required]),
    taskType: new FormControl('', [Validators.required]),
  });

  ngOnChanges(): void {
    if (this.taskToEdit) {
      this.formData.setValue({
        taskTitle: this.taskToEdit.taskTitle,
        taskDate: this.taskToEdit.taskDate,
        taskType: this.taskToEdit.taskType,
      });
    } else {
      this.formData.reset();
    }
  }

  onSaveTask(): void {
    if (this.taskToEdit) {
      const updatedTask = {
        ...this.taskToEdit,
        ...this.formData.value,
      };
      this.taskEdited.emit(updatedTask);
    } else {
      const newTask = {
        taskId: uuidv4(),
        ...this.formData.value,
        completed: false,
      };
      this.taskAdded.emit(newTask);
    }
    this.formData.reset();
  }
}
