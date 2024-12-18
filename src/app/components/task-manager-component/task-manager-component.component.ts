import { Component, OnInit } from '@angular/core';
import { TaskInputComponentComponent } from '../task-input-component/task-input-component.component';
import { TaskListComponentComponent } from '../task-list-component/task-list-component.component';

@Component({
  selector: 'app-task-manager-component',
  imports: [TaskInputComponentComponent, TaskListComponentComponent],
  templateUrl: './task-manager-component.component.html',
  styleUrl: './task-manager-component.component.css',
})
export class TaskManagerComponentComponent implements OnInit {
  todoList: any[] = [];
  filteredList: any[] = [];
  archivedList: any[] = [];
  tab: string = 'all';
  taskToEdit: any = null; // Task currently being edited

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.todoList = localStorage.getItem('todo-data')
      ? JSON.parse(localStorage.getItem('todo-data')!)
      : [];
    this.filteredList = [...this.todoList];
  }

  setFilter(tab: string): void {
    this.tab = tab;
    this.applyFilter();
  }

  applyFilter(): void {
    switch (this.tab) {
      case 'active':
        this.filteredList = this.todoList.filter((task) => !task.completed);
        break;
      case 'completed':
        this.filteredList = this.todoList.filter((task) => task.completed);
        break;
      default:
        this.filteredList = [...this.todoList];
    }
  }

  get totalTasks(): number {
    return this.todoList.length;
  }

  get pendingTasks(): number {
    return this.todoList.filter((task) => !task.completed).length;
  }

  get completedTasks(): number {
    return this.todoList.filter((task) => task.completed).length;
  }

  addTask(newTask: any): void {
    this.todoList.push(newTask);
    localStorage.setItem('todo-data', JSON.stringify(this.todoList));
    this.loadTasks();
  }

  editTask(task: any): void {
    this.taskToEdit = { ...task }; // Copy to avoid direct mutation
  }

  saveTask(updatedTask: any): void {
    const index = this.todoList.findIndex(
      (task) => task.taskId === updatedTask.taskId
    );
    if (index !== -1) {
      this.todoList[index] = updatedTask;
      localStorage.setItem('todo-data', JSON.stringify(this.todoList));
      this.loadTasks();
    }
    this.taskToEdit = null; // Clear after editing
  }

  deleteTask(id: string): void {
    const isDeleted = confirm(
      'Are you sure you want to delete this todo task?'
    );
    if (isDeleted) {
      this.todoList = this.todoList.filter((task) => task.taskId !== id);
      localStorage.setItem('todo-data', JSON.stringify(this.todoList));
      this.loadTasks();
    }
  }

  clearCompleted(): void {
    this.todoList = this.todoList.filter((task) => !task.completed);
    localStorage.setItem('todo-data', JSON.stringify(this.todoList));
    this.loadTasks();
    this.tab = 'all';
  }

  archiveAll(): void {
    const completedTasks = this.todoList.filter((task) => task.completed);
    if (completedTasks.length > 0) {
      this.archivedList = [...this.archivedList, ...completedTasks];
      alert('Archived successfully!');
    } else {
      alert('No completed tasks to archive!');
    }
  }
}
