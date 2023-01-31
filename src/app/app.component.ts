import { Component, ViewChild, ElementRef } from '@angular/core';

import { MarkerDataSeed } from './database/database-seed';
import { PolygonsBoundaries } from './polygons/map-polygons';

import { StylingMarkers } from './markers/styling/marker-style';
import { MarkerEvents } from './markers/events/marker-events';
import { mapStyling } from './map/map-style';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  title = 'Muftijstvo Sandžačko Mape Vakufa';

  searchWord?: string = '';
  allMarkers: Array<any> = [];
  markerClusters: MarkerClusterer;

  map?: google.maps.Map;
  mapStyle = mapStyling;
  mapCenter = new google.maps.LatLng(42.99603931107363, 19.863259815559704);
  mapZoom = 9;

  markerData = MarkerDataSeed;
  markerEvents = new MarkerEvents();
  markerStyling = new StylingMarkers();

  polygons = new PolygonsBoundaries();

  initMap(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, {
      center: this.mapCenter,
      zoom: this.mapZoom,
      styles: this.mapStyle,
    });
    this.addMarkers();
    this.polygons.drawPolgygons(this.map);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  addMarkers() {
    this.markerData.map((extractedMarkerData) => {
      const marker = new google.maps.Marker({
        ...extractedMarkerData,
        position: new google.maps.LatLng(extractedMarkerData.position),
        icon: this.markerStyling.markerIconDefaultCreate(),
        draggable: false,
        optimized: false,
        animation: google.maps.Animation.DROP,
      });

      this.markerEvents.markerInfoWindow(marker, extractedMarkerData, this.map);
      this.markerEvents.markerMouseOver(marker);
      this.markerEvents.markerMouseOut(marker);

      marker.setMap(this.map);
      this.allMarkers.push(marker);

      return marker;
    });
    this.markerClusters = new MarkerClusterer({
      map: this.map,
      markers: this.allMarkers,
    });
  }

  searchMarkersFilter(event: any): any {
    let bounds = new google.maps.LatLngBounds();
    for (let marker of this.allMarkers) {
      if (this.searchWord === '' || event === '') {
        marker.setVisible(true);
        this.map.setZoom(this.mapZoom);
        this.map.setCenter(this.mapCenter);
      }
    }
    if (this.allMarkers && this.searchWord) {
      return this.allMarkers.filter((marker) => {
        if (this.searchWord === '' || event === '') {
          marker.setVisible(true);
          this.map.setZoom(this.mapZoom);
          this.map.setCenter(this.mapCenter);
        } else if (
          marker.placeName.toLowerCase().indexOf(event.toLowerCase()) > -1 ||
          marker.cadastralParcelNumber
            .toLowerCase()
            .indexOf(event.toLowerCase()) > -1 ||
          marker.cadastarMunicipality
            .toLowerCase()
            .indexOf(event.toLowerCase()) > -1
        ) {
          marker.setVisible(true);
          bounds.extend(marker.getPosition());
        } else {
          marker.setVisible(false);
        }
        this.map.fitBounds(bounds);
      });
    }
    return this.allMarkers;
  }

  selectMarkerFilter(event: any) {
    let bounds = new google.maps.LatLngBounds();
    this.markerClusters.clearMarkers();
    const filteredMarkers = this.allMarkers.filter(
      (marker) =>
        marker.placeFilter == event.target.value &&
        bounds.extend(marker.getPosition())
    );
    this.markerClusters.addMarkers(filteredMarkers);
    this.map.fitBounds(bounds);
  }
}
