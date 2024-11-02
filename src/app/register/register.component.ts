import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isActive = false;
  inactive = false;

  constructor(private http: HttpClient) { }

  public seller = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/),
    ]),
    password: new FormControl('', Validators.required),
  });

  public buyer = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/),
    ]),
    password: new FormControl('', Validators.required),
  });

  registerBuyer() {
    const buyer = JSON.stringify(this.buyer.value);
    console.log(buyer);
    const headers = { 'Content-Type': 'application/json' };
    let url = 'http://localhost:8080/buyer/register';
    this.http
      .post(url, buyer, { headers, responseType: 'text' })
      .subscribe((data: any) => {
        alert(data);
        this.buyer.setValue({
          name: '',
          email: '',
          phone: '',
          password:''
        })
      });
  }

  registerSeller() {
    const seller = JSON.stringify(this.seller.value);
    console.log(seller);
    const headers = { 'Content-Type': 'application/json' };
    let url = 'http://localhost:8080/seller/register';
    this.http
      .post(url, seller, { headers, responseType: 'text' })
      .subscribe((data: any) => {
        alert(data);
        this.seller.setValue({
          name: '',
          email: '',
          phone: '',
          password:''
        })
      });
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
