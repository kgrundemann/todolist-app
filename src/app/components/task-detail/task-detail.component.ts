import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoistService } from '../../services/todoist.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit {
  task: any = {
    content: '',
    due: { date: '' },
    priority: 1,
  };
  loading: boolean = true;

  constructor(
    private todoistService: TodoistService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.loadTask(taskId);
    }
  }

  loadTask(taskId: string): void {
    this.todoistService.getTaskById(taskId).subscribe({
      next: (task) => {
        this.task = task;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading the task', err);
        this.loading = false;
      },
    });
  }

  updateTask(): void {
    if (this.task && this.task.id) {
      this.todoistService.updateTask(this.task.id, this.task).subscribe({
        next: (updatedTask) => {
          console.log('Task updated successfully:', updatedTask);
          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          console.error('Error updating the task', err);
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/tasks']);
  }
}
