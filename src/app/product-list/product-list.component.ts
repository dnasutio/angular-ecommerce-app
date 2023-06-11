import { Component } from '@angular/core';
import { ProductsService } from "../products.service";

import { Product } from '../products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products: Product[] | undefined;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.getProducts();
  }

  share() {
    window.alert('The product has been shared!');
  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }

  getProducts() {
    this.productsService.getProducts().subscribe(response => {
        this.products = response.body;
        console.log("body ", response.body);
    });
  }
}


