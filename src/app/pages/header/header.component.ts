import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  isLoggedIn = false;
  
  constructor(private authService:AuthService){}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe((res: boolean)=>{
      this.isLoggedIn = res
    })
  }

  onLogOut() {
    this.authService.updateLogoutStatus(true);
    this.authService.loggedIn$.subscribe((res)=>{
      this.isLoggedIn = res
    })
  }
}
