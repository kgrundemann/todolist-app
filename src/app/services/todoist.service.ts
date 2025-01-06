import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoistService {
  private apiUrl = 'https://api.todoist.com/rest/v2/tasks';

  private headers = new HttpHeaders({
    Authorization: `Bearer e240136b52bd9c33f070e65bb34465fe63a0cc6a`,
  });

  private http: HttpClient = inject(HttpClient);

  getTasks(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.headers });
  }

  createTask(task: {
    content: string;
    due_string: string;
    priority: number;
  }): Observable<any> {
    return this.http.post<any>(this.apiUrl, task, { headers: this.headers });
  }

  getTaskById(taskId: string): Observable<any> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  updateTask(taskId: string, updates: any): Observable<any> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.post<any>(url, updates, { headers: this.headers });
  }

  deleteTask(taskId: string): Observable<any> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.delete<any>(url, { headers: this.headers });
  }
}
