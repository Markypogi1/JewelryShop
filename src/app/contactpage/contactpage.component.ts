import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contactpage',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contactpage.component.html',
  styleUrls: ['./contactpage.component.css'],
})
export class ContactpageComponent implements OnInit {
  currentUser: any = null;
  isAdmin: boolean = false;
  showAccountInfo: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
      this.isAdmin =
        this.currentUser.username === 'admin' || this.currentUser.role === 'admin';
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
