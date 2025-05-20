import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  currentUser: any = null;
  showAccountInfo: boolean = false;
  slideIndex: number = 0;
<<<<<<< HEAD
=======
  isAdmin: boolean = false; 
  cartItemCount: number = 0;
>>>>>>> e167e5b4 (final deployment)

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
<<<<<<< HEAD
    }

    this.showSlides(this.slideIndex);
  }

=======
      this.isAdmin = this.currentUser.username === 'admin' && this.currentUser.password === 'admin123';
    }
    this.updateCartCount();
    this.showSlides(this.slideIndex);
  }

  updateCartCount(): void {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.cartItemCount = cartItems.reduce((total: number, item: any) => total + (item.quantity || 1), 0);
  }

>>>>>>> e167e5b4 (final deployment)
  toggleAccountInfo() {
    this.showAccountInfo = !this.showAccountInfo;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

<<<<<<< HEAD
  checkLoginStatus(category: string): void {
    if (!this.currentUser) {
      alert('Please login to shop for ' + category);
      this.router.navigate(['/login']);
    } else {
      alert('Redirecting to ' + category + ' category...');
    }
  }

  // Flip the logic: left button goes to NEXT picture, right button goes to PREVIOUS
=======
 checkLoginStatus(category: string): void {
  if (!this.currentUser) {
    alert('Please login to shop for ' + category);
    this.router.navigate(['/login']);
  } else {
    // Redirect to the correct category route (like /earring, /necklaces, etc.)
    const route = '/' + category.toLowerCase(); // e.g., 'Earrings' -> '/earrings'
    this.router.navigate([route]);
  }
}
>>>>>>> e167e5b4 (final deployment)
  plusDivs(n: number) {
    this.slideIndex -= n;
    this.showSlides(this.slideIndex);
  }

  showSlides(n: number) {
    const slides: any = document.getElementsByClassName('mySlides');
    if (!slides.length) return;

    if (n >= slides.length) this.slideIndex = 0;
    if (n < 0) this.slideIndex = slides.length - 1;

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }

    slides[this.slideIndex].style.display = 'block';
  }
<<<<<<< HEAD
   // Scroll to top when TOP button is clicked
   scrollToTop() {
=======

  scrollToTop() {
>>>>>>> e167e5b4 (final deployment)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
