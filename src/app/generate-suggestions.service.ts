import { Injectable } from '@angular/core';
import { MarkerService } from './marker.service';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class GenerateSuggestionsService {
  searchControl: FormControl = new FormControl();

  constructor(private markerService: MarkerService) {}

  generateSearchSuggestions(value: string): string[] {
    const searchSuggestions: string[] = [];
    this.markerService.markers.forEach((marker) => {
      if (marker.vakufName.toLowerCase().includes(value.toLowerCase())) {
        searchSuggestions.push(marker.vakufName);
      }
      if (
        marker.cadastralParcelNumber.toLowerCase().includes(value.toLowerCase())
      ) {
        const suggestion =
          marker.cadastralParcelNumber + ' (' + marker.vakufName + ')';
        searchSuggestions.push(suggestion);
      }
    });
    return searchSuggestions;
  }

  

}
