import { AfterViewInit, Component, HostListener, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CrudDataSource, CrudItem } from './crud-datasource';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CrudItem>;
  @HostListener('click', ['$event.target'])
  dataSource: CrudDataSource;
  selectedRows: CrudItem[] = [];
  filteredRows: CrudItem[] = [];
  selectAllLabel = 'Select All';
  categories: string[] = [];
  selectedCategory: string | undefined;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'category'];

  constructor() {
    this.dataSource = new CrudDataSource();
    this.categories = this.getDistinctCategories();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  select(row: CrudItem) {
    const index = this.selectedRows.indexOf(row);

    if (index > -1) {
      this.selectedRows.splice(index, 1); // Deselect row if already selected
    } else {
      this.selectedRows.push(row); // Select row if not already selected
    }

    // Perform any other desired actions
    console.log('Selected rows:', this.selectedRows);
  }

  isRowSelected(row: CrudItem): boolean {
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
}
