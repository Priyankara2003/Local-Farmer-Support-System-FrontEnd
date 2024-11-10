import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  public product = {
    sellerId: null,
    productName: null,
    description: null,
    price: null,
    qty: null,
    category: null,
    date: new Date().toLocaleDateString(),
    status: null,
  };

  image: File | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.image = file;
    } else {
      console.error('No file selected.');
    }
  }

  async addProduct() {
    const userDataStr = sessionStorage.getItem('loggedUser');

    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      this.product.sellerId = userData.sellerId;
    }

    const product = JSON.stringify(this.product);
    const formData = new FormData();

    const productBlob = new Blob([product], { type: 'application/json' });

    formData.append('product', productBlob);

    if (this.image) {
      formData.append('file', this.image);
    } else {
      alert('Please select an image file.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/product/add-product', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorMsg = await res.text();
        throw new Error(`Error ${res.status}: ${errorMsg}`);
      }

      alert('File Uploaded Successfully!');
      this.clearFormFields();
    } catch (error) {
      console.error('Error during file upload:', error);
      alert(`Error: ${error}`);
    }
  }

  clearFormFields() {
    this.product.productName = null;
    this.product.description = null;
    this.product.price = null;
    this.product.category = null;
    this.product.qty = null;
    this.image = null;
  }
}
