import { Component, OnInit, inject } from '@angular/core';
import { TodoistService } from '../../todoist.service';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterModule, DatePipe],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];

  todoistService: TodoistService = inject(TodoistService);

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.todoistService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error loading tasks', error);
      }
    );
  }
}
