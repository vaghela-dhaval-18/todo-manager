import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskManagerComponentComponent } from './components/task-manager-component/task-manager-component.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskManagerComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'todo-manager';
}
