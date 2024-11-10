import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  seller = JSON.parse(localStorage.getItem('loggedUser') || '{}')

  ngOnInit(): void {
    this.getProducts();
  }

  constructor(private httpClient:HttpClient){}

  productList: any = []
  image: File | null = null;

  public product = {
    productId: null,
    sellerId: null,
    productName: null,
    description: null,
    price: null,
    qty: null,
    category: null,
    date: new Date().toLocaleDateString(),
    status: null,
    base:null
  };

  getProducts(){
    this.httpClient.get(`http://localhost:8080/product/get-seller-products/${this.seller.sellerId}`)
    .subscribe((data)=>{
      this.productList = data;
      console.log(data);
      
    })
  }

  delete(id:number){
    this.httpClient.delete(`http://localhost:8080/product/delete-product/${id}`)
    .subscribe((data)=>{
      console.log(data);
    })
    this.getProducts()
  }

  addDetails(product:any){
    this.product.productId = product.productId;
    this.product.sellerId = product.sellerId;
    this.product.category = product.category;
    this.product.status = product.status;
    this.product.qty = product.qty;
    this.product.price = product.price;
    this.product.description = product.description;
    this.product.productName = product.productName;
    this.product.date = product.date;
    this.product.base = product.imgData
  }

  base64ToByteArray(base64String: string): Uint8Array {
    const binaryString = window.atob(base64String); // Decode the Base64 string to binary
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
  
    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
  
    return bytes;
  }
  
  convert(){
    const base64String = "SGVsbG8gV29ybGQ=";
    const byteArray = this.base64ToByteArray(base64String);
  
    console.log(byteArray);
    return byteArray;
  }

  async updateProduct() {
    const product = JSON.stringify(this.product);
    const formData = new FormData();

    const productBlob = new Blob([product], { type: 'application/json' });

    formData.append('product', productBlob);
    formData.append('file', this.image || "");

    try {
      const res = await fetch('http://localhost:8080/product/update-info', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorMsg = await res.text();
        throw new Error(`Error ${res.status}: ${errorMsg}`);
      }

      alert('File Uploaded Successfully!');
    } catch (error) {
      console.error('Error during file upload:', error);
      alert(`Error: ${error}`);
    }
  }

}
