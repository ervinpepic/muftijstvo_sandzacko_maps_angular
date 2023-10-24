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
      if (!visibleMarkers) {
        return [];
      }

      // Use a Set to store unique suggestions
      const searchSuggestionsSet: Set<string> = new Set();

      // Iterate through visible markers to find matching suggestions
      visibleMarkers.forEach((marker) => {
        const lowercaseValue = value.toLowerCase();

        // Check if the marker's name matches the input value
        if (marker.vakufName.toLowerCase().includes(lowercaseValue)) {
          searchSuggestionsSet.add(marker.vakufName);
        }
        // Check if the marker's cadastral parcel number matches the input value
        if (
          marker.cadastralParcelNumber.toLowerCase().includes(lowercaseValue)
        ) {
          // Create a suggestion including both parcel number and name
          const suggestion = `${marker.cadastralParcelNumber} (${marker.vakufName})`;
          searchSuggestionsSet.add(suggestion);
        }
      });

      // Convert Set to an array and return
      return Array.from(searchSuggestionsSet);
    } catch (error) {
      // Add error handling or logging here if needed
      console.error('Error generating search suggestions:', error);
      return [];
    }
  }
}
