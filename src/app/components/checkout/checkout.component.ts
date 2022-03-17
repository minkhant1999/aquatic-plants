import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Plant } from 'src/app/components/plants/plants.component';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingBarService } from '@ngx-loading-bar/core';

export interface Orderform {
  fullName: string;
  phoneNumber: string;
  address: string;
  note: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  carts: any[] = [];
  cartOpen = '';
  total = 0;

  fullName = '';
  phoneNumber = '';
  address = '';
  note = '';
  items: any[] = [];
  isLoading = false;
  constructor(
    private cart: CartService,
    private checkoutService: CheckoutService,
    private router: Router,
    private snackBar: MatSnackBar,
    private loading: LoadingBarService
  ) {}

  ngOnInit(): void {
    this.cart.getCarts().subscribe((data) => {
      this.carts = data;
      this.total = 0;
      let items: any = [];
      this.carts.forEach((product) => {
        this.total += product.price;
        let x = items.find((p: any) => p.link == product.link);
        if (x) {
          x.quantity += 1;
        } else {
          items.push(product);
          product.quantity = 1;
        }
        this.items = items;
        this.carts = items;
      });
    });
  }
  removeFromCart(product: Plant) {
    this.cart.removeProduct(product);
  }
  completeOrder() {
    const data = {
      address: this.address,
      fullName: this.fullName,
      phoneNumber: this.phoneNumber,
      note: this.note,
      items: this.items,
    };
    if (!data.fullName) {
      return alert('Please fill your name');
    }
    if (!data.phoneNumber) {
      return alert('Please fill your phone number');
    }
    if (!data.address) {
      return alert('Address Required');
    }
    if (!data.items.length) {
      return alert('Please choose any products');
    }
    this.isLoading = true;
    this.loading.start();
    this.checkoutService.submitOrderDetails(data).subscribe(() => {
      let quantity = this.items.reduce((value, item) => {
        return value + item.quantity;
      }, 0);
      this.checkoutService
        .notifyNewOrder(
          `You have recieved an order from ${this.fullName}.\nPhone:${this.phoneNumber}\n\nTotal items: ${quantity} \nTotal Amount: ${this.total} Kyats`
        )
        .subscribe();
      this.openSnackBar();
      this.cart.removeAll();
      this.loading.complete();
      this.router.navigate(['/aquatic-plants']);
    });
  }

  openSnackBar() {
    this.snackBar.open('Thank you for purchase', '', {
      duration: 5000,
    });
  }
}
