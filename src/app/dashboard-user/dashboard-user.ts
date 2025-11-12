import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.html',
  styleUrl: './dashboard-user.css'
})
export class DashboardUser  implements OnInit  {
   products: any[] = [];
    constructor(private productService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getAllUsers().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error loading products', err)
    });
  }
  goToCheckout(product: any) {
    window.location.href = '/checkout';
  }
    reloadPage(): void {
    window.location.reload();
  }
}
