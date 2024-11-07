import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private loggedInStatus = new BehaviorSubject<boolean>(false);
  loggedIn$: Observable<boolean> = this.loggedInStatus.asObservable();

  private productClicked = new BehaviorSubject<any>(null);
  product$: Observable<any> = this.productClicked.asObservable();

  updateLoginStatus(isLoggedIn: boolean){
    this.loggedInStatus.next(isLoggedIn);
  }

  updateLogoutStatus(isLoggedOut: boolean){
    this.loggedInStatus.next(!isLoggedOut)
  }

  setProductOnClick(product : any){
    this.productClicked.next(product)
  }
}
