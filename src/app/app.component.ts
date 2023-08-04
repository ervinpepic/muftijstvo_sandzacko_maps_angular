import {
  Component,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader'; //Google async MAPS API loader
import { GOOGLEAPIKEY } from 'src/env'; // API key from env file

import { mapStyling } from './map/map-style'; //map stype

import { PolygonsBoundaries } from './polygons/map-polygons'; //Data sets import
import { MarkerService } from './marker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  //child component reference for component.html
  @ViewChild('mapContainer', { static: true }) mapContainer?: ElementRef;

  constructor(private markerService: MarkerService) {}

  map?: google.maps.Map; //google maps declaration

  polygons = new PolygonsBoundaries(); //map polygon boundaries for Sandzak

  //mandatory method for OnInit decorator
  async ngOnInit(): Promise<void> {
    const googleApiAsyncLoader = new Loader({
      apiKey: GOOGLEAPIKEY,
      version: 'weekly',
    });
    //initialize createMap() funciton with async closure
    await googleApiAsyncLoader.load();
    this.createMap();
  }

  //google maps creation
  createMap(): void {
    this.map = new google.maps.Map(this.mapContainer!.nativeElement, {
      center: { lat: 42.99603931107363, lng: 19.863259815559704 },
      zoom: 9,
      styles: mapStyling,
    });

    this.markerService.createMarkers(this.map); //method call addMarkers() for creating markers in this map
    this.polygons.drawPolgygons(this.map); //method call for polygons creation
  }
}
