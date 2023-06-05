import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { Product, products } from '../products';
import { CartService } from '../cart.service';

import { ProductsService } from "../products.service";

import { Product } from '../products';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
    products: Product[];
    product: Product | undefined;

    constructor(
        private route: ActivatedRoute,
        private cartService: CartService,
        private productsService: ProductsService
    ) { }

    ngOnInit() {
        this.get();
    }

    get() {
        this.productsService.getProducts().subscribe(response => {
            this.products = response.body;
            console.log("body ", response.body);

            // First get the product id from the current route.
            const routeParams = this.route.snapshot.paramMap;
            console.log(routeParams)
            const productIdFromRoute = String(routeParams.get('productId'));
            console.log(productIdFromRoute)
            // Find the product that correspond with the id prodivided in route
            this.product = this.products.find(
                (product) => product._id === productIdFromRoute
            );
            console.log(this.product)
        });
    }

    addToCart(product: Product) {
        this.cartService.addToCart(product);
        window.alert('Your product has been added to the cart!');
    }
}
