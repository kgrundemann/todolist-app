import { Component, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  router = inject(Router);
  auth = inject(AngularFireAuth);

  async login() {
    try {
      await this.auth.signInWithEmailAndPassword(this.email, this.password);
      this.errorMessage = 'Logged in successfully!';
      this.router.navigate(['/tasks']);
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }
}
