import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TodoistService } from '../../todoist.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {
  todoistService: TodoistService = inject(TodoistService);
  router: Router = inject(Router);

  task = {
    content: '',
    due_string: '',
    priority: 4,
  };

  onSubmit(): void {
    this.todoistService.createTask(this.task).subscribe({
      next: (response) => {
        console.log('Task created:', response);
        this.router.navigate(['/tasks']);
      },
      error: (error) => {
        console.error('Error creating task:', error);
      },
      complete: () => {
        console.log('Task creation completed.');
      },
    });
  }
}
