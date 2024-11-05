import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  isActive = false;
  inactive = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService:AuthService
  ) { }

  public buyerLogin = new FormGroup({
    emailLogin: new FormControl('', [Validators.required, Validators.email]),
    passwordLogin: new FormControl('', Validators.required)
  })

  public sellerLogin = new FormGroup({
    emailLogin: new FormControl('',[Validators.required, Validators.email]),
    passwordLogin: new FormControl('',Validators.required)
  })

  loginSeller() {
    const sellerEmail = this.sellerLogin.value.emailLogin + "";
    const sellerPassword = this.sellerLogin.value.passwordLogin + "";
    const formData = new FormData();
    formData.append('email', sellerEmail)
    formData.append('password', sellerPassword)
    this.http.post("http://localhost:8080/seller/login", formData)
      .subscribe((data) => {
        if (data == 0) {
          alert("Invalid Login Details")
          this.sellerLogin.setValue({
            emailLogin: '',
            passwordLogin: ''
          })
        } else {
          alert("Login Success!")
          this.authService.updateLoginStatus(true)
          this.router.navigate([''])
          this.sellerLogin.setValue({
            emailLogin: '',
            passwordLogin: ''
          })
          localStorage.setItem("loggedUser",JSON.stringify(data));
          console.log(data);
        }
      })
  }

  loginBuyer() {
    const buyerEmail = this.buyerLogin.value.emailLogin + "";
    const buyerPassword = this.buyerLogin.value.passwordLogin + "";
    const formData = new FormData();
    formData.append('email', buyerEmail)
    formData.append('password', buyerPassword)
    this.http.post("http://localhost:8080/buyer/login", formData)
      .subscribe(
        (data) => {
          if (data == null) {
            alert("Invalid Login Details")
            this.buyerLogin.setValue({
              emailLogin: '',
              passwordLogin: ''
            })
          } else {
            alert("Login Success!")
            this.authService.updateLoginStatus(true)
            this.router.navigate([''])
            this.buyerLogin.setValue({
              emailLogin: '',
              passwordLogin: ''
            })
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
