import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list-component',
  imports: [FormsModule],
  templateUrl: './task-list-component.component.html',
  styleUrl: './task-list-component.component.css',
})
export class TaskListComponentComponent {
  @Input() todoList: any[] = localStorage.getItem('todo-data')
    ? JSON.parse(localStorage.getItem('todo-data')!)
    : [];

  @Output() taskDeleted = new EventEmitter<string>();
  @Output() taskEdited = new EventEmitter<any>();

  onDeleteTask(id: string): void {
    this.taskDeleted.emit(id);
  }

  editTask(task: any): void {
    this.taskEdited.emit(task);
  }
  handleChange() {
    localStorage.setItem('todo-data', JSON.stringify(this.todoList));
  }
}
