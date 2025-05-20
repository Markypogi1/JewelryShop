import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-earrings',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './Earrings.component.html',
  styleUrls: ['../ringpage/ringpage.component.css'],
})
export class EarringsComponent implements OnInit {
  currentUser: any = JSON.parse(localStorage.getItem('currentUser') || 'null');
  isAdmin: boolean = false;
  cartItemCount: number = 0;
  showAccountInfo: boolean = false;

  allProducts: any[] = [];
  filteredProducts: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isAdmin = this.currentUser && this.currentUser.username === this.currentUser.password;
    this.loadEarrings();
    this.updateCartCount();
  }

  loadEarrings() {
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    this.allProducts = storedProducts
      .filter(
        (product: any) =>
          product &&
          product.category === 'Earrings' &&
          typeof product.product_image === 'string'
      )
      .map((product: any) => ({ ...product, quantity: 1 }));
    this.filteredProducts = [...this.allProducts];
  }

  filterByPrice() {
    this.filteredProducts = this.allProducts.filter(p => p.price >= 2000 && p.price <= 4000);
  }

  sortProducts(event: any) {
    const value = event.target.value;
    if (value === 'low-to-high') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (value === 'high-to-low') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }

  increaseQuantity(product: any) {
    if (product.quantity < product.stock) {
      product.quantity++;
    }
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  addToCart(product: any) {
    if (!this.currentUser) {
      alert('Please log in to add items to your cart.');
      this.router.navigate(['/login']);
      return;
    }

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((item: any) => item.id === product.id);

    if (existing) {
      existing.quantity += product.quantity;
    } else {
      cart.push({ ...product, quantity: product.quantity || 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateCartCount();
    alert(`${product.product_name} added to cart.`);
  }

  updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItemCount = cart.reduce((sum: number, item: any) => {
      const quantity = Number(item.quantity) || 0;
      return sum + quantity;
    }, 0);
  }

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
