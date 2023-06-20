import { Component, ViewChild, ElementRef, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { Product } from '../products';
import { ProductsService } from "../products.service";

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

    product: Product;

    constructor(private productsService: ProductsService, private sanitizer: DomSanitizer) {}

    // TODO: Figure out sanitization
    createProduct() {
        const nameElement = this.nameRef.nativeElement;
        const safeName = this.sanitizer.sanitize(SecurityContext.HTML, 'Updated content');
        nameElement.innerHTML = safeName || '';

        const priceElement = this.priceRef.nativeElement;

        this.product.name = nameElement.value;

        /* this.productsService.createProduct(this.product).subscribe(response => {
            
        }); */
    }
}
