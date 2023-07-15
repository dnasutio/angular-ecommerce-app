import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialogConfig } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Product } from '../products';
import { ProductsService } from "../products.service";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog-data',
  templateUrl: './dialog-data.component.html',
  styleUrls: ['./dialog-data.component.css']
})
export class DialogDataComponent {
  name: string;
  price: number;
  description: string;
  discount: number;
  stock: number;
  category: string;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        name: this.name,
        price: this.price,
        description: this.description,
        discount: this.discount,
        stock: this.stock,
        category: this.category,
      },
      width: '500px',
      height: '800px',
    });


  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
})
export class DialogOverviewExampleDialog {
  product: Product;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private productsService: ProductsService,
    @Inject(MAT_DIALOG_DATA) public data: Product,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createProduct() {
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("Result: ", result);
      this.product = result;

      console.log("This ", this.product);

      this.productsService.createProduct(this.product).subscribe(response => {
        console.log("Product created ", response.body);
      });
    });
  }

}
