import { Component, Input, OnInit, input } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent implements OnInit {
  constructor(private authSevice: AuthService) { }

  ngOnInit(): void {
    this.getClickedItem();
  }

  product: any;
  qty = 0;
  total = 0;

  getClickedItem() {
    this.authSevice.product$.subscribe((res: any) => {
      this.product = res;
    });
  }

  addToCart(product: any) {
    let cart = [];
    const cartstr = JSON.parse(sessionStorage.getItem('cart') || '[]');
    if (cartstr == null) {
      cart = [];
    } else {
      cart = cartstr;
    }
    this.getTotal();
    const total = this.total;
    const qty = Number(this.qty);
    const index = cart.findIndex((item:any) => item.product.productId === product.productId);
    if (index !== -1) {
      let obj = cart[index]
      obj.qty = obj.qty+qty;
      obj.total = obj.total+total;
    }else{
      cart.push({
        product,
        qty,
        total,
      });
    }
    console.log(cart);
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }

  getTotal() {
    const price = this.product['price'];
    this.total = price * this.qty;
  }
}
