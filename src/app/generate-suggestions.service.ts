import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomMarker } from '././marker/Marker'; // Marker interface

@Injectable({
  providedIn: 'root',
})
export class GenerateSuggestionsService {
  // FormControl for search input
  searchControl: FormControl = new FormControl();

  constructor() {}

  /**
   * Generate search suggestions based on the input value and visible markers.
   *
   * @param value The search input value.
   * @param visibleMarkers The currently visible markers to filter suggestions from.
   * @returns An array of search suggestions.
   */
  generateSearchSuggestions(
    value: string,
    visibleMarkers: CustomMarker[]
  ): string[] {
    try {
      // Check if there are visible markers to generate suggestions from
      if (!Array.isArray(visibleMarkers) || visibleMarkers.length === 0) {
        return [];
      }

      const searchSuggestionsMap = new Map<string, number>();

      visibleMarkers.forEach((marker) => {
        const lowercaseValue = value.toLowerCase();
  
        if (marker.vakufName.toLowerCase().includes(lowercaseValue)) {
          // Assign a relevance score based on the match
          searchSuggestionsMap.set(marker.vakufName, 1);
        }
  
        if (
          marker.cadastralParcelNumber
            .toLowerCase()
            .includes(lowercaseValue)
        ) {
          const suggestion = `${marker.cadastralParcelNumber} (${marker.vakufName})`;
          // Assign a higher relevance score for suggestions with both parcel number and name
          searchSuggestionsMap.set(suggestion, 2);
        }
      });
  
      // Sort suggestions based on relevance score
      const sortedSuggestions = Array.from(searchSuggestionsMap.keys()).sort(
        (a, b) => searchSuggestionsMap.get(b)! - searchSuggestionsMap.get(a)!
      );
  
      return sortedSuggestions;
    } catch (error) {
      console.error('Error generating search suggestions:', error);
      return [];
    }
  }
}
