import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';

export const routes: Routes = [
    {
        path : "register",
        component: RegisterComponent
    },
    {
        path : "login",
        component: LoginComponent
    },
    {
        path : "",
        component: HomeComponent
    },
    {
        path : "add-product",
        component: AddProductComponent
    },
    {
        path : "view-product",
        component: ProductPageComponent
    }
];
