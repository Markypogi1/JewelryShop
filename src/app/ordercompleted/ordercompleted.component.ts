import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, RouterModule],
  templateUrl: './ordercompleted.component.html',
  styleUrls: ['./ordercompleted.component.css'],
  standalone: true,  // Add this if you are using standalone components with imports
})
export class OrderCompletedComponent {
  currentUser: any = JSON.parse(localStorage.getItem('currentUser') || 'null');
  showAccountInfo: boolean = false;

  toggleAccountInfo() {
    this.showAccountInfo = !this.showAccountInfo;
  }

  logout() {
    localStorage.removeItem('currentUser');
    window.location.reload();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
