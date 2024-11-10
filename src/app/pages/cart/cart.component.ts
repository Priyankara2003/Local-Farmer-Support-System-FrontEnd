import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.getCartItems()
  }

  cart:any =[]
  qty = 0;
  netTotal1= 0;

  getCartItems(){ 
    this.cart = JSON.parse(sessionStorage.getItem('cart')||"")
    this.countNetTotal()
  }

  updateQty(cartItem:any){
    let item = this.cart[this.cart.findIndex((item:any) => item.product.productId === cartItem.product.productId)]
    item.qty = Number(this.qty);
    item.total = item.product.price*item.qty
    sessionStorage.setItem('cart',JSON.stringify(this.cart))
    this.getCartItems();
  }

  deleteItem(cartItem:any){
    this.cart.splice(this.cart.indexOf(cartItem),1)
    sessionStorage.setItem('cart',JSON.stringify(this.cart))
    this.getCartItems()
  }

  countNetTotal(){
    this.netTotal1 =0
    this.cart.forEach((element: any )=> {
      this.netTotal1 = this.netTotal1 + element.total;
    });
    this.order.netTotal = this.netTotal1;
  }

  public orderDetails = {
    productId: 0,
    qty:0,
    total:0.0,
  }
  
  public order={
    date: new Date().toLocaleDateString(),
    buyerId: JSON.parse(sessionStorage.getItem('loggedUser')||"").buyerId,
    netTotal: 0,
    orderDetails: [{}],
  }

  placeOrder(){
    this.countNetTotal()
    if (JSON.parse(sessionStorage.getItem('userRole')||"") === "buyer") {
      this.cart.forEach((element: any )=> {
        this.order.orderDetails.push({
          productId: element['product']['productId'],
          qty: element['qty'],
          total: element['total']
        });
      });

      this.http.post("http://localhost:8080/order/place-order",this.order,{ responseType: 'text' })
      .subscribe((data)=>{
        alert(data)
        sessionStorage.setItem('cart',"")
        this.getCartItems()
      })
      console.log(this.order);
    }else{
      alert("login as buyer")
    }
  }
}
