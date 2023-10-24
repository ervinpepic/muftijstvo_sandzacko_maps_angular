import { Injectable } from '@angular/core';
import { Observable, of, lastValueFrom } from 'rxjs';

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
  filteredMarkers?: CustomMarker[] = [];

  //marker styling methods
  markerEvents = new MarkerEvents();
  markerStyling = new StylingMarkers();

  constructor() { }

  getMarkers(): Observable<CustomMarker[]> {
    return of(VakufData);
  }

  getVakufObjectTypes(): Observable<string[]> {
    return of(Object.values(vakufObjecType));
  }

  getVakufCities(): Observable<string[]> {
    return of(Object.values(sandzakCity));
  }

  async createMarkers(map: google.maps.Map) {
    try {
      const markerData = await lastValueFrom(this.getMarkers());
      this.markers = markerData?.map((data) => {
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

        marker.setMap(map); //set map
        return marker
      }) || [];
    } catch (error) {
      console.error('Error creating markers', error);
    }
  }

  //async load for types from services
  loadObjectTypes(): Observable<string[]> {
    return this.getVakufObjectTypes();
  }

  //async load for cities from services
  loadCities(): Observable<string[]> {
    return this.getVakufCities();
  }

  // filter markers method
  filterMarkers(
    markers: any[],
    selectedCity: string,
    selectedVakufType: string,
    filteredVakufNames: string,
    searchTerm: string
  ): CustomMarker[] {
    const visibleMarkers: CustomMarker[] = [];
  
    markers.forEach((marker) => {
      const { city, vakufType, vakufName, cadastralParcelNumber } = marker;
  
      const isVisible =
        (!selectedCity || city === selectedCity) &&
        (!selectedVakufType || vakufType === selectedVakufType) &&
        (!filteredVakufNames || vakufName === filteredVakufNames) &&
        (!searchTerm ||
          vakufName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cadastralParcelNumber.toLowerCase().includes(searchTerm.toLowerCase()));
  
      if (!isVisible) {
        marker.setVisible(false);
        return;
      }
  
      visibleMarkers.push(marker);
      marker.setVisible(true);
    });
  
    this.filteredMarkers = visibleMarkers;
  
    return visibleMarkers;
  }  
  
}
