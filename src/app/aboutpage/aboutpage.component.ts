import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-aboutpage',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './aboutpage.component.html',
  styleUrls: ['./aboutpage.component.css'],
})
export class AboutpageComponent implements OnInit {
  currentUser: any = null;
  isAdmin: boolean = false;
  showAccountInfo: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);

      // Check if user is admin by username or role
      if (
        this.currentUser.username === 'admin' ||
        this.currentUser.role === 'admin'
      ) {
        this.isAdmin = true;
      }
    }
  }

  toggleAccountInfo(): void {
    this.showAccountInfo = !this.showAccountInfo;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
