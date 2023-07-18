import { AfterViewInit, Component, HostListener, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CrudDataSource } from './crud-datasource';

import { ProductsService } from "../products.service";

import { Product } from '../products';

import { lastValueFrom } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;
  @HostListener('click', ['$event.target'])
  products: Product[];
  dataSource: CrudDataSource;
  selectedRows: Product[] = [];
  filteredRows: Product[] = [];
  selectAllLabel = 'Select All';
  categories: string[] = [];
  selectedCategory: string | undefined;
  deleteLabel = 'Delete';

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'price', 'description', 'discount', 'stock', 'category'];

  constructor(private productsService: ProductsService) {
    this.initialize();
  }

  async initialize() {
    await this.getProducts();
    this.dataSource = new CrudDataSource(this.products);
    //console.log("DATA: ", this.dataSource.data);
    this.categories = this.getDistinctCategories();
  }

  async getProducts(): Promise<void> {
    try {
      const response = await lastValueFrom(this.productsService.getProducts().pipe(
        finalize(() => {
          // Cleanup or additional actions can be performed here
        })
      ));

      this.products = response.body;
      console.log("other body ", response.body);
    } catch (error) {
      console.log("Something bad happened")
    }
  }

  ngAfterViewInit(): void {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log("DATA: ", this.dataSource.data);
    this.table.dataSource = this.dataSource;
  }

  select(row: Product) {
    const index = this.selectedRows.indexOf(row);

    if (index > -1) {
      this.selectedRows.splice(index, 1); // Deselect row if already selected
    } else {
      this.selectedRows.push(row); // Select row if not already selected
    }

    // Perform any other desired actions
    console.log('Selected rows:', this.selectedRows);
  }

  isRowSelected(row: Product): boolean {
    return this.selectedRows.includes(row);
  }

  toggleSelectAll() {
    if (
      this.selectedRows.length === this.dataSource.data.length ||
      (this.selectedRows.length === this.filteredRows.length &&
        this.selectedRows.length != 0 &&
        this.filteredRows.length != 0)
    ) {
      this.selectedRows = []; // Deselect all if all rows are already selected
      console.log(this.selectedRows.length);
    } else {
      if (this.filteredRows.length != 0) {
        this.selectedRows = [...this.filteredRows]; // Select filtered rows
        console.log(this.selectedRows.length);
      } else {
        this.selectedRows = [...this.dataSource.data]; // Select all rows
        console.log(this.selectedRows.length);
      }
    }

    this.updateSelectAllLabel(); // Update button label
  }

  updateSelectAllLabel() {
    if (
      this.selectedRows.length === this.dataSource.data.length ||
      (this.selectedRows.length === this.filteredRows.length &&
        this.selectedRows.length != 0 &&
        this.filteredRows.length != 0)
    ) {
      this.selectAllLabel = 'Deselect All';
    } else {
      this.selectAllLabel = 'Select All';
    }
  }

  selectCategory(category: string | undefined) {
    if (category) {
      this.filteredRows = this.dataSource.data.filter(
        (row) => row.category === category
      );
      this.selectAllLabel = 'Deselect All';
      this.table.dataSource = this.filteredRows;
    } else {
      this.filteredRows = [];
      this.table.dataSource = this.dataSource;
    }

    this.updateSelectAllLabel(); // Update button label
  }

  getDistinctCategories(): string[] {
    const categories: string[] = [];

    this.dataSource.data.forEach((row) => {
      if (!categories.includes(row.category)) {
        categories.push(row.category);
      }
    });

    return categories;
  }

  deleteProducts() {
    console.log(this.selectedRows)
    let ids: String[] = [];
    for (const product of this.selectedRows) {
      ids.push(product._id);
    }

    console.log(ids)

    const toBeDeleted = {
      "products": ids
    }

    console.log(toBeDeleted)

    this.productsService.deleteProducts(toBeDeleted).subscribe(response => {
      console.log("Products deleted ", response.body);
    });
  }

}
