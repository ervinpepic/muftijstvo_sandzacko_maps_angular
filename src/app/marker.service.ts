import { Injectable } from '@angular/core';
import { CustomMarker } from './marker/Marker';
import { VakufData } from './database/database-seed';
import { Observable, of } from 'rxjs';
import { vakufObjecType } from './database/vakuf-types';
import { sandzakCity } from './database/sandzak-cities';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
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
}
