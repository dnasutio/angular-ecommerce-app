import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
  standalone: true,
  imports: [MatGridListModule, NgFor]
})
export class CrudComponent {
  tiles: Tile[] = [
    { text: 'ID', cols: 1, rows: 1, color: 'lightblue' },
    { text: 'Name', cols: 1, rows: 1, color: 'lightgreen' },
    { text: 'Price', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Description', cols: 1, rows: 1, color: '#DDBDF1' },

    { text: 'v98a7tyv', cols: 1, rows: 1, color: '#DDBDF1' },
    { text: 'Cat Ears', cols: 1, rows: 1, color: 'lightpink' },
    { text: '$2.00', cols: 1, rows: 1, color: 'lightblue' },
    { text: 'They look funny.', cols: 1, rows: 1, color: '#DDBDF1' },
  ];
}
