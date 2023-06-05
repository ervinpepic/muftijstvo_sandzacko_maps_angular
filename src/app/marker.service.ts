import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CustomMarker } from './marker/Marker';
import { sandzakCity } from './database/sandzak-cities';
import { VakufData } from './database/database-seed';
import { vakufObjecType } from './database/vakuf-types';

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
