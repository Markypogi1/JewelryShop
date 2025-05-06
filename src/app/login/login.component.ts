import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    const matchedUser = storedUsers.find(
      (user: any) => user.username === this.username && user.password === this.password
    );

    if (matchedUser) {
      // Store current user or session if needed
      localStorage.setItem('currentUser', JSON.stringify(matchedUser));
      alert('Login successful!');
      this.router.navigate(['/homepage']); // Replace with your actual route
    } else {
      this.errorMessage = 'Incorrect username or password. Please try again.';
    }
  }

  togglePassword() {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    }
  }
}
