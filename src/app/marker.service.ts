import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CustomMarker } from './marker/Marker';
import { sandzakCity } from './database/sandzak-cities';
import { VakufData } from './database/database-seed';
import { vakufObjecType } from './database/vakuf-types';

import { MarkerEvents } from './marker/events/marker-events';
import { StylingMarkers } from './marker/styling/marker-style';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  markers: any[] = [];
  vakufCities: string[] = [];
  vakufTypes: string[] = [];

  //marker styling methods
  markerEvents = new MarkerEvents();
  markerStyling = new StylingMarkers();
  constructor() {}

  getMarkers(): Observable<CustomMarker[]> {
    const vakufData = of(VakufData);
    return vakufData;
  }

  getVakufObjectTypes(): Observable<string[]> {
    return of(Object.values(vakufObjecType));
  }

  getVakufCities(): Observable<string[]> {
    return of(Object.values(sandzakCity));
  }

  //creating markers method
  createMarkers(map: google.maps.Map) {
    this.getMarkers().subscribe((markerData) => {
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
        this.markerEvents.markerInfoWindow(marker, data, map);
        this.markerEvents.markerMouseOver(marker);
        this.markerEvents.markerMouseOut(marker);

        this.markers.push(marker); //add extracted markers to the array of markers
        marker.setMap(map); //set map
      });
    });
  }

  //async load for types from services
  loadObjectTypes(): string[] {
    this.getVakufObjectTypes().subscribe((vakufTypes) => {
      this.vakufTypes = vakufTypes;
    });
    return this.vakufTypes;
  }

  //async load for cities from services
  loadCities(): string[] {
    this.getVakufCities().subscribe((cities) => {
      this.vakufCities = cities;
    });
    return this.vakufCities;
  }

  // filter markers method
  filterMarkers(
    searchTerm: string,
    selectedCity: string,
    filteredVakufNames: string,
    selectedVakufType: string,
    visibleVakufNames: CustomMarker[]
  ): void {
    const visibleMarkers: any[] = [];

    this.markers.forEach((marker) => {
      const isVisible =
        (!selectedCity || marker.city === selectedCity) &&
        (!selectedVakufType || marker.vakufType === selectedVakufType) &&
        (!filteredVakufNames || marker.vakufName === filteredVakufNames) &&
        (!searchTerm ||
          marker.vakufName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          marker.cadastralParcelNumber
            .toLowerCase()
            .includes(searchTerm.toLowerCase()));
      marker.setVisible(isVisible);

      if (isVisible) {
        visibleMarkers.push(marker);
      }
    });

    visibleVakufNames = visibleMarkers;
  }
}
