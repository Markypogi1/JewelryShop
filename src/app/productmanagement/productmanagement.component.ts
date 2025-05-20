import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface Product {
  id: number;
  product_image: string; // This now holds a Base64 string
  product_name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

@Component({
  selector: 'app-productmanagement',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './productmanagement.component.html',
  styleUrls: ['./productmanagement.component.css']
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = ['Rings', 'Necklaces', 'Bracelets', 'Earrings'];
  selectedProduct: Product | null = null;
  productForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  editIndex: number | null = null;
  currentUser: any = null;
  isAdmin: boolean = false;
  showAccountInfo: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const savedProducts = localStorage.getItem('products');
    this.products = savedProducts ? JSON.parse(savedProducts) : [];

    const user = localStorage.getItem('currentUser');
    this.currentUser = user ? JSON.parse(user) : null;

    this.isAdmin = this.currentUser && this.currentUser.username === this.currentUser.password;

    this.initializeForm();
  }

  initializeForm() {
    this.productForm = this.fb.group({
      product_image: [''],
      product_name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      category: ['Rings', Validators.required]
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.productForm.patchValue({ product_image: reader.result }); // Set Base64 in form
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    const product: Product = {
      id: this.editIndex !== null ? this.products[this.editIndex].id : Date.now(),
      ...this.productForm.value
    };

    if (this.editIndex !== null) {
      this.products[this.editIndex] = product;
    } else {
      this.products.push(product);
    }

    this.saveProducts();
    this.resetForm();
  }

  onProductSelect(product: Product) {
    this.editIndex = this.products.findIndex(p => p.id === product.id);
    this.selectedProduct = product;
    this.productForm.patchValue(product);
    this.imagePreview = product.product_image; // Use Base64 image directly
  }

  onDelete() {
    if (this.editIndex !== null && confirm('Are you sure you want to delete this product?')) {
      this.products.splice(this.editIndex, 1);
      this.saveProducts();
      this.resetForm();
    }
  }

  resetForm() {
    this.productForm.reset({
      product_image: '',
      product_name: '',
      description: '',
      price: 0,
      stock: 0,
      category: 'Rings'
    });
    this.imagePreview = null;
    this.selectedProduct = null;
    this.editIndex = null;
  }

  saveProducts() {
    localStorage.setItem('products', JSON.stringify(this.products));
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
