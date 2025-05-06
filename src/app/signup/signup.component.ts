import { Component } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  user = {
    fullname: '',
    email: '',
    username: '',
    password: '',
    phone: '',
    address: '',
    sex: '',
    birthday: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    // Get existing users from localStorage or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Check for duplicate username or email
    const duplicate = existingUsers.find((u: any) => u.username === this.user.username || u.email === this.user.email);
    if (duplicate) {
      alert('Username or Email already exists.');
      return;
    }

    // Save new user
    existingUsers.push(this.user);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    alert('Account created successfully!');

    // Navigate to login
    this.router.navigate(['/login']);
  }
  togglePassword() {
    const passwordField = document.getElementById('password') as HTMLInputElement;
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
  }
  
}
