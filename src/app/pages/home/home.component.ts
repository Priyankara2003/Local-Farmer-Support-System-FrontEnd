import { NgFor, SlicePipe } from '@angular/common';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../shared/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, SlicePipe,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  ngOnInit(): void {
    this.loadProducts();
  }

  constructor(private sanitizer:DomSanitizer,private authservice:AuthService){}
  
  productDetails = [];
  imgRecourse: any;

  async loadProducts() {
    await fetch('http://localhost:8080/product/get-all')
      .then((res) => res.json())
      .then((data) => {
        this.productDetails = data;
      });
  }

  setClickedProduct(product:any){
    this.authservice.setProductOnClick(product)
  }
}
