import { Component, Input, OnInit, input } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit{
    constructor(private authSevice:AuthService){}

    ngOnInit(): void {
      this.getClickedItem();
    }

    product: any;

    getClickedItem(){
      this.authSevice.product$.subscribe((res:any)=>{
        this.product = res;
      })
    }
}
