import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'create-task', component: CreateTaskComponent },
  { path: 'task/:id', component: TaskDetailComponent },
  { path: 'edit/:id', component: EditTaskComponent },
  {
    path: '**',
    component: TaskListComponent,
  },
];
