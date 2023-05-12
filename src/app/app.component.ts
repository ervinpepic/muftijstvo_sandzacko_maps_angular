import { Component, ViewChild, ElementRef } from '@angular/core';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

//Styling imports
import { StylingMarkers } from './markers/styling/marker-style';
import { MarkerEvents } from './markers/events/marker-events';
import { mapStyling } from './map/map-style';

//Data sets import
import { PolygonsBoundaries } from './polygons/map-polygons';
import { MarkerDataSeed } from './database/database-seed';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //use for reference child component into the app compoment with gmap
  //when creating map
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  //class member for title
  title = 'Muftijstvo Sandžačko Mape Vakufa';

  //class members for search and filtering ngModel from App component
  searchTerm?: string = '';
  selectedObject?: string = '';
  selectedPlace?: string = '';

  //Arrays of markers data
  markers: Array<any> = [];
  markersCluster: MarkerClusterer;

  //google maps initializatior and setup
  map?: google.maps.Map;
  mapStyle = mapStyling;
  mapCenter = new google.maps.LatLng(42.99603931107363, 19.863259815559704);
  mapZoom = 9;

  //raw marker data
  markersDataArray = MarkerDataSeed;


  //marker styling
  markerEvents = new MarkerEvents();
  markerStyling = new StylingMarkers();

  //map polygon boundaries for Sandzak
  polygons = new PolygonsBoundaries();

  //Use for ViewChild decorator
  ngAfterViewInit(): void {
    this.initMap();
  }

  //google maps initialize
  initMap(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, {
      center: this.mapCenter,
      zoom: this.mapZoom,
      styles: this.mapStyle,
    });
    this.addMarkers();
    this.polygons.drawPolgygons(this.map);
  }

  //add all markers
  addMarkers() {
    this.markersDataArray.map((markerData) => {
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

      //return marker after creation
      return marker;
    });

    //create marker clusters
    this.markersCluster = new MarkerClusterer({
      map: this.map,
      markers: this.markers,
    });
  }

  //filtering markers with multiple params
  filterMarkers() {
    const visibleMarkers = [];
    this.markers.forEach((marker) => {
      const isVisible =
        (!this.selectedPlace || marker.placeFilter === this.selectedPlace) &&
        (!this.selectedObject || marker.objectType === this.selectedObject) &&
        (!this.searchTerm ||
          marker.placeName
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          !this.searchTerm ||
          marker.cadastralParcelNumber
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()));
      marker.setVisible(isVisible);
      if (isVisible) {
        visibleMarkers.push(marker);
      }
    });

    this.markersCluster.clearMarkers();
    //initialize again after clearing all clusters
    this.markersCluster.addMarkers(visibleMarkers);
  }
}
