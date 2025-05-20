import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addtocart',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css'],
})
export class AddtocartComponent implements OnInit {
  cart: any[] = [];
  selectedItems: Set<number> = new Set();
  cartSubtotal: number = 0;
  cartTotal: number = 0;
  deliveryFee: number = 0;
  currentUser: any = JSON.parse(localStorage.getItem('currentUser') || 'null');
  showAccountInfo: boolean = false;
  showErrorMessage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cart = storedCart;
    this.selectedItems = new Set(this.cart.map(item => item.id)); // Select all by default
    this.calculateTotals();
  }

  toggleSelection(productId: number) {
    if (this.selectedItems.has(productId)) {
      this.selectedItems.delete(productId);
    } else {
      this.selectedItems.add(productId);
    }
    this.calculateTotals();
    this.showErrorMessage = false; // hide error when toggling
  }

  updateQuantity(item: any, quantity: number) {
    if (quantity < 1) quantity = 1;
    item.quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.calculateTotals();
  }

  calculateTotals() {
    this.cartSubtotal = this.cart
      .filter(item => this.selectedItems.has(item.id))
      .reduce((sum, item) => sum + item.price * item.quantity, 0);

    this.deliveryFee = this.cartSubtotal > 0 ? 250 : 0;

    this.cartTotal = this.cartSubtotal + this.deliveryFee;
  }

  removeItem(id: number) {
    this.cart = this.cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.selectedItems.delete(id);
    this.calculateTotals();
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

  placeOrder() {
    this.showErrorMessage = false;

    if (this.selectedItems.size === 0) {
      this.showErrorMessage = true;
      return;
    }

    // Validate delivery inputs by querying values directly
    const fullname = (document.getElementById('fullname') as HTMLInputElement)?.value.trim();
    const contactnumber = (document.getElementById('contactnumber') as HTMLInputElement)?.value.trim();
    const zipcode = (document.getElementById('zipcode') as HTMLInputElement)?.value.trim();
    const street = (document.getElementById('street') as HTMLInputElement)?.value.trim();
    const barangay = (document.getElementById('barangay') as HTMLInputElement)?.value.trim();
    const municipality = (document.getElementById('municipality') as HTMLInputElement)?.value.trim();
    const province = (document.getElementById('province') as HTMLInputElement)?.value.trim();

    let valid = true;

    if (!fullname) {
      alert('Please enter your full name.');
      valid = false;
    }

    // Example contact number validation (simple digits only check)
    if (!contactnumber || !/^\d{7,15}$/.test(contactnumber)) {
      alert('Please enter a valid contact number (7-15 digits).');
      valid = false;
    }

    if (!zipcode) {
      alert('Please enter your zipcode.');
      valid = false;
    }

    if (!street || !barangay || !municipality || !province) {
      alert('Please complete all address fields.');
      valid = false;
    }

    if (!valid) return;

    alert('Order placed successfully!');

    this.cart = this.cart.filter(item => !this.selectedItems.has(item.id));
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.selectedItems.clear();
    this.calculateTotals();

    this.router.navigate(['/order-completed']);
  }
}
