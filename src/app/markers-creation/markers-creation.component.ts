import { Component, OnInit } from '@angular/core';

import { MarkerDataSeed } from '../database-seeding/database-markers-data-seed';


@Component({
  selector: 'app-markers-creation',
  templateUrl: './markers-creation.component.html',
  styleUrls: ['./markers-creation.component.css']
})
export class MarkersCreationComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
