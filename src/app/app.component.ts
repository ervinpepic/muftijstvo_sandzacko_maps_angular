import { AfterViewInit, Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader'; //Google async MAPS API loader
import { GOOGLEAPIKEY } from 'src/env'; // API key from env file

import { MarkerService } from './marker.service'; //marker service

import { StylingMarkers } from './marker/styling/marker-style'; //Styling imports
import { MarkerEvents } from './marker/events/marker-events'; //Evemts imports
import { mapStyling } from './map/map-style'; //map stype

import { PolygonsBoundaries } from './polygons/map-polygons';//Data sets import

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  //use for reference child component into the app compoment with mapContainer
  //when creating map
  @ViewChild('mapContainer', { static: false }) mapContainer?: ElementRef;

  constructor(private markerService: MarkerService,private cdr: ChangeDetectorRef) {}
  
  title = 'Muftijstvo Sandžačko Mape Vakufa'; //class member for title
 
  //input members for child component app-navbar
  vakufObjectTypes: string[] = [];
  vakufCities: string[] = [];

  markers: any[] = []; //Arrays of markers data

  //google maps initializatior and setup
  map?: google.maps.Map;
  mapStyle = mapStyling;
  mapCenter = {
    lat: 42.99603931107363,
    lng: 19.863259815559704,
  };
  mapZoom = 9;

  //marker styling methods
  markerEvents = new MarkerEvents();
  markerStyling = new StylingMarkers();

  polygons = new PolygonsBoundaries(); //map polygon boundaries for Sandzak

  //mandatory method for AfterViewInit decorator
  ngAfterViewInit(): void {
    const googleApiAsyncLoader = new Loader({
      apiKey: GOOGLEAPIKEY,
      version: 'weekly',
    });
    //initialize createMap() funciton with async closure
    googleApiAsyncLoader.load().then(() => {
      this.createMap();
    });
    //load methods for generating cities and type of objects
    this.loadObjectTypes();
    this.loadCities();
  }

  //google maps creation
  createMap(): void {
    this.map = new google.maps.Map(this.mapContainer!.nativeElement, {
      center: this.mapCenter,
      zoom: this.mapZoom,
      styles: this.mapStyle,
    });

    this.createMarkers(); //method call addMarkers() for creating markers in this map
    this.polygons.drawPolgygons(this.map); //method call for polygons creation
  }

  //creating markers method
  createMarkers() {
    this.markerService.getMarkers().subscribe((markerData) => {
      this.markers = [];
      markerData.forEach((data) => {
        const marker = new google.maps.Marker({
          ...data,
          position: new google.maps.LatLng(data.position),
          icon: this.markerStyling.markerIconDefaultCreate(),
          draggable: false,
          optimized: false,
          animation: google.maps.Animation.DROP,
        });
        //style for markers
        this.markerEvents.markerInfoWindow(marker, data, this.map);
        this.markerEvents.markerMouseOver(marker);
        this.markerEvents.markerMouseOut(marker);

        this.markers.push(marker);//add extracted markers to the array of markers
        marker.setMap(this.map!);//set map
      });
    });
  }

  //async load for types of vakuf objects from services
  loadObjectTypes() {
    this.markerService.getVakufObjectTypes().subscribe((vakufTypes) => {
      this.vakufObjectTypes = vakufTypes;
    });
    this.cdr.detectChanges();
  }

//async load for cities from services
  loadCities() {
    this.markerService.getVakufCities().subscribe((cities) => {
      this.vakufCities = cities;
    });
    this.cdr.detectChanges();
  }
}