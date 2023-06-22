import { Component, ViewChild, ElementRef, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { Product } from '../products';
import { ProductsService } from "../products.service";
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css'],
    standalone: true,
    imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
})
export class CreateComponent {
    @ViewChild('name') nameRef!: ElementRef;
    @ViewChild('price') priceRef!: ElementRef;
    @ViewChild('description') descriptionRef!: ElementRef;

    product: Product = {_id: "", name: "", price: 0, description: ""};
    response: HttpResponse<any>;

    constructor(private productsService: ProductsService, private sanitizer: DomSanitizer) {}

    // TODO: Figure out sanitization
    createProduct() {
        const nameElement = this.nameRef.nativeElement;
        const safeName = this.sanitizer.sanitize(SecurityContext.HTML, nameElement.value);
        nameElement.innerHTML = safeName || '';

        const priceElement = this.priceRef.nativeElement;
        const priceName = this.sanitizer.sanitize(SecurityContext.HTML, priceElement.value);
        priceElement.innerHTML = priceName || '';

        const descriptionElement = this.descriptionRef.nativeElement;
        const descriptionName = this.sanitizer.sanitize(SecurityContext.HTML, descriptionElement.value);
        descriptionElement.innerHTML = descriptionName || '';

        this.product.name = nameElement.innerHTML;
        this.product.price = priceElement.innerHTML;
        this.product.description = descriptionElement.innerHTML;

        this.productsService.createProduct(this.product).subscribe(response => {
            this.response = response;
            console.log(this.response)
        });
    }
}
