import {AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
//Google async MAPS API loader
import { Loader } from '@googlemaps/js-api-loader';
//marker interface
import { Marker } from './marker/Marker';

//Styling imports
import { StylingMarkers } from './marker/styling/marker-style';
import { MarkerEvents } from './marker/events/marker-events';
import { mapStyling } from './map/map-style';

//Data sets import
import { PolygonsBoundaries } from './polygons/map-polygons';
import { VakufDataDB } from './database/database-seed';



declare const google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements AfterViewInit {
  //use for reference child component into the app compoment with gmap
  //when creating map
  @ViewChild('mapContainer', { static: false }) mapContainer: ElementRef;
  
  //class member for title
  title = 'Muftijstvo Sandžačko Mape Vakufa';
  
  //DB connection
  vakufDataDB = VakufDataDB;
  
  
  //class members for search and filtering ngModel in app.component.html
  searchTerm?: string = ''; //used in search bar form 
  selectedVakufType?: string = ''; //used in select dropdown menu for type of object
  selectedCity?: string = ''; //used in select dropdown menu for place
  filteredVakufNames?: string = ''; //used in select dropdown menu for place name after filtering and before filtering
  
  //Arrays of markers data after filtering them through filterMarker() function
  visibleVakufNames?: Marker[] = [];
  
  // visibleOptions: Marker[] = [];
  // visibleCount: number = 5;
  // loadIncrement: number = 5;
  
  //Arrays of markers data
  markers: Array<any> = [];
  // markersCluster: MarkerClusterer;
  
  //google maps initializatior and setup
  map?: google.maps.Map;
  mapStyle = mapStyling;
  mapCenter = {
    lat: 42.99603931107363, 
    lng: 19.863259815559704
  }
  mapZoom = 9;
  
  //marker styling
  markerEvents = new MarkerEvents();
  markerStyling = new StylingMarkers();
  
  //map polygon boundaries for Sandzak
  polygons = new PolygonsBoundaries();
  
  //Use for ViewChild decorator
  ngAfterViewInit(): void {
    const loader = new Loader({
      apiKey: 'GOOGLEAPIKEY',
      version: 'weekly'
    });
    loader.load().then(() => {
      this.loadMap();
    });
  }

  //google maps initialize
  loadMap(): void {
    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: this.mapCenter,
      zoom: this.mapZoom,
      styles: this.mapStyle,
    });
    this.addMarkers();
    this.polygons.drawPolgygons(this.map);
  }
  
  //add all markers
  addMarkers() {
    this.vakufDataDB.map((markerData) => {
      const marker = new google.maps.Marker({
        ...markerData,
        position: new google.maps.LatLng(markerData.position),
        icon: this.markerStyling.markerIconDefaultCreate(),
        draggable: false,
        optimized: false,
        animation: google.maps.Animation.DROP,
      });

      //add style to the markers
      this.markerEvents.markerInfoWindow(marker, markerData, this.map);
      this.markerEvents.markerMouseOver(marker);
      this.markerEvents.markerMouseOut(marker);

      //add extracted markers to the array of markers
      this.markers.push(marker);
      marker.setMap(this.map);

      //return marker after creation
      return marker;
    });

  }

  //filtering markers with multiple params
  filterMarkers() {
    const visibleMarkers = [];
    this.markers.forEach((marker) => {
      const isVisible =
        (!this.selectedCity || marker.city === this.selectedCity) &&
        (!this.selectedVakufType || marker.vakufType === this.selectedVakufType) &&
        (!this.filteredVakufNames || marker.vakufName === this.filteredVakufNames) &&
        (!this.searchTerm || marker.vakufName.toLowerCase().includes(
          this.searchTerm.toLowerCase()) ||!this.searchTerm || marker.cadastralParcelNumber
            .toLowerCase().includes(this.searchTerm.toLowerCase()));
      marker.setVisible(isVisible);
      if (isVisible) {
        visibleMarkers.push(marker);
      }
    });

    // this.markersCluster.clearMarkers();

    //initialize again after clearing all clusters
    // this.markersCluster.addMarkers(visibleMarkers);

    //added visible markers after filtering to the visible marker array
    this.visibleVakufNames = visibleMarkers;

    // this.visibleOptions = this.visibleVakufNames.slice(0, this.visibleCount);
  }

  // loadMoreOptions() {
  //   const remainingOptions = this.visibleVakufNames.slice(this.visibleOptions.length);
  //   const optionstoAdd = remainingOptions.slice(0, this.loadIncrement);
  //   this.visibleOptions = this.visibleOptions.concat(optionstoAdd);
  // }

  resetSelectedVakufNames(): void {
    this.filteredVakufNames = '';
    this.filterMarkers();
  }
}
