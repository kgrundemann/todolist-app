import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoistService } from '../../services/todoist.service';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterModule, DatePipe, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  todoistService: TodoistService = inject(TodoistService);

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.todoistService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading tasks', error);
        this.errorMessage = 'Failed to load tasks. Please try again later.';
        this.loading = false;
      },
      complete: () => {
        console.log('Task loading complete.');
      },
    });
  }

  deleteTask(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.todoistService.deleteTask(taskId).subscribe({
        next: () => {
          this.tasks = this.tasks.filter((task) => task.id !== taskId);
        },
        error: (error) => {
          console.error('Error deleting task', error);
          this.errorMessage = 'Failed to delete task. Please try again later.';
        },
      });
    }
  }
}
