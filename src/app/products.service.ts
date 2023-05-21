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
        return this.http.get("http://localhost:3000/", { observe: 'response' });
    }
}
