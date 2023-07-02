import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

import { Product } from '../products';

/* // TODO: Replace this with your own data model type
export interface CrudItem {
  name: string;
  id: number;
  category: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: CrudItem[] = [
  { id: 1, name: 'Hydrogen', category: 'red' },
  { id: 2, name: 'Helium', category: 'blue' },
  { id: 3, name: 'Lithium', category: 'red' },
  { id: 4, name: 'Beryllium', category: 'green' },
  { id: 5, name: 'Boron', category: 'blue' },
  { id: 6, name: 'Carbon', category: 'red' },
  { id: 7, name: 'Nitrogen', category: 'green' },
  { id: 8, name: 'Oxygen', category: 'blue' },
  { id: 9, name: 'Fluorine', category: 'red' },
  { id: 10, name: 'Neon', category: 'red' },
  { id: 11, name: 'Sodium', category: 'blue' },
  { id: 12, name: 'Magnesium', category: 'red' },
  { id: 13, name: 'Aluminum', category: 'green' },
  { id: 14, name: 'Silicon', category: 'blue' },
  { id: 15, name: 'Phosphorus', category: 'red' },
  { id: 16, name: 'Sulfur', category: 'red' },
  { id: 17, name: 'Chlorine', category: 'blue' },
  { id: 18, name: 'Argon', category: 'red' },
  { id: 19, name: 'Potassium', category: 'green' },
  { id: 20, name: 'Calcium', category: 'red' },
]; */

/**
 * Data source for the Crud view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CrudDataSource extends DataSource<Product> {
  data: Product[];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(res_data: Product[]) {
    super();
    this.data = res_data;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Product[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Product[]): Product[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Product[]): Product[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'price': return compare(a.price, b.price, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case '_id': return compare(+a._id, +b._id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
