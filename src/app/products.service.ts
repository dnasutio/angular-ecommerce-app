import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Product } from "./products"
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient) { }

    getProducts(): Observable<HttpResponse<any>> {
        return this.http.get("http://localhost:3000/products", { observe: 'response' });
    }

    createProduct(product: Product): Observable<HttpResponse<any>> {
        console.log("balls", product)
        return this.http.post("http://localhost:3000/products", product, { observe: 'response', responseType: 'text' });
    }

    deleteProducts(products: any) {
        console.log("Send delete ", products);
        return this.http.post("http://localhost:3000/products/deleteProducts", products, { observe: 'response', responseType: 'text' });
    }
}
