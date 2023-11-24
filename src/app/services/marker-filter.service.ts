import { Injectable } from '@angular/core';
import { replaceSerbianLatinChars } from '../functions/latin-chars';
import { CustomMarker } from '../Marker';

@Injectable({
  providedIn: 'root',
})
export class MarkerFilterService {
  /**
   * Filters markers based on selected criteria.
   *
   * @param markers The array of markers to filter.
   * @param selectedCity The selected city for filtering.
   * @param selectedVakufType The selected vakuf type for filtering.
   * @param filteredVakufName The filtered vakuf name for filtering.
   * @param searchTerm The search term for filtering.
   * @returns An array of filtered markers.
   */
  filterMarkers(
    markers: any[],
    selectedCity: string,
    selectedVakufType: string,
    filteredVakufName: string,
    searchTerm: string
  ): CustomMarker[] {
    const visibleMarkers: CustomMarker[] = [];

    // Replace Serbian Latin characters in the search term
    const normalizedSearchTerm = replaceSerbianLatinChars(
      searchTerm.toLowerCase()
    );

    markers.forEach((marker) => {
      const { city, vakufType, vakufName, cadastralParcelNumber } = marker;
      const normalizedVakufName = replaceSerbianLatinChars(
        vakufName.toLowerCase()
      );

      const isVisible =
        (!selectedCity || city === selectedCity) &&
        (!selectedVakufType || vakufType === selectedVakufType) &&
        (!filteredVakufName || vakufName === filteredVakufName) &&
        (!normalizedSearchTerm ||
          normalizedVakufName.includes(normalizedSearchTerm) ||
          cadastralParcelNumber.toLowerCase().includes(normalizedSearchTerm));

      if (isVisible) {
        visibleMarkers.push(marker);
      }
    });

    return visibleMarkers;
  }
}
