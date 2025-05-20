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
<<<<<<< HEAD
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

=======
    // Normalize input
    this.username = this.username.trim();
    this.password = this.password.trim();

    // Admin login
    if (this.username === 'admin' && this.password === 'admin123') {
      const adminUser = { username: 'admin', password: 'admin123' };
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      alert('Admin login successful!');
      this.router.navigate(['/homepage']);
      return;
    }

    // Check regular users
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
>>>>>>> e167e5b4 (final deployment)
    const matchedUser = storedUsers.find(
      (user: any) => user.username === this.username && user.password === this.password
    );

    if (matchedUser) {
<<<<<<< HEAD
      // Store current user or session if needed
      localStorage.setItem('currentUser', JSON.stringify(matchedUser));
      alert('Login successful!');
      this.router.navigate(['/homepage']); // Replace with your actual route
=======
      localStorage.setItem('currentUser', JSON.stringify(matchedUser));
      alert('Login successful!');
      this.router.navigate(['/homepage']);
>>>>>>> e167e5b4 (final deployment)
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
