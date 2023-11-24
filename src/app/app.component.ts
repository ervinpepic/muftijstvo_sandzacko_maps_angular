import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader'; //Google async MAPS API loader
import { GOOGLEAPIKEY } from 'src/env'; // API key from env file

import { mapStyle } from './style/map/map-style'; //map stype

import { PolygonsBoundaries } from './polygons/map-polygons'; //Data sets import
import { MarkerService } from './services/marker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  //child component reference for component.html
  @ViewChild('mapContainer', { static: true }) mapContainer?: ElementRef;

  map?: google.maps.Map; //google maps declaration
  polygons = new PolygonsBoundaries(); //map polygon boundaries for Sandzak

  // Constants for initial map settings
  readonly initialMapCenter = {
    lat: 42.99603931107363,
    lng: 19.863259815559704,
  };
  readonly initialMapZoom = 9;

  constructor(private markerService: MarkerService) {}

  //mandatory method for OnInit decorator
  async ngOnInit(): Promise<void> {
    try {
      const googleApiAsyncLoader = new Loader({
        apiKey: GOOGLEAPIKEY,
        version: 'weekly',
      });

      //initialize createMap() funciton with async closure
      await googleApiAsyncLoader.load();
      this.createMap();
    } catch (error) {
      // Handle the error appropriately (e.g., show a user-friendly message)
      console.error('Error loading Google Maps API:', error);
    }
  }

  //google maps creation
  createMap(): void {
    this.map = new google.maps.Map(this.mapContainer!.nativeElement, {
      center: this.initialMapCenter,
      zoom: this.initialMapZoom,
      styles: mapStyle,
    });

    // Method call to create markers on the map
    this.markerService.createMarkers(this.map);
    // Method call to draw polygons on the map
    this.polygons.drawPolgygons(this.map);
  }
}
