import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  isActive = false;
  inactive =false;

  constructor(private http:HttpClient,private router:Router){}

  public buyer = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required)
  })

  public seller = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  loginSeller(){
    const sellerEmail = this.seller.value.email+"";
    const sellerPassword = this.seller.value.password+"";
    const formData = new FormData();
    formData.append('email',sellerEmail)
    formData.append('password',sellerPassword)
    this.http.post("http://localhost:8080/seller/login",formData)
    .subscribe((data)=>{
        if (data==0) {
          alert("Invalid Login Details")
        }else{
          alert("Login Success!")
          console.log(data);
        }
    })
  }

  loginBuyer(){
    const buyerEmail = this.buyer.value.email+"";
    const buyerPassword = this.buyer.value.password+"";
    const formData = new FormData();
    formData.append('email',buyerEmail)
    formData.append('password',buyerPassword)
    this.http.post("http://localhost:8080/buyer/login",formData)
    .subscribe(
      (data)=>{
        if (data==0) {
          alert("Invalid Login Details")
        }else{
          alert("Login Success!")
          console.log(data);
        }
    })
  }

  onRegisterSellerClick() {
    this.isActive = true;
    this.inactive = true;
  }

  onRegisterBuyerClick() {
    this.isActive = false;
    this.inactive = false;
  }
}
