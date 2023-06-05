import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomMarker } from '../marker/Marker'; // Marker interface

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent {

  searchControl: FormControl = new FormControl();

  searchTerm: string = '';
  showSearchSuggestions: boolean = false;
  searchSuggestions: string[] = [];
  selectedVakufType?: string = '';
  selectedCity?: string = '';
  filteredVakufNames?: string = '';
  visibleVakufNames?: CustomMarker[] = [];

  @Input() vakufCities: string[] = [];
  @Input() vakufObjectTypes: string[] = [];
  @Input() markers: any[] = [];

  filterMarkers() {
    const visibleMarkers: any[] = [];

    this.markers.forEach((marker) => {
      const isVisible =
        (!this.selectedCity || marker.city === this.selectedCity) &&
        (!this.selectedVakufType ||
          marker.vakufType === this.selectedVakufType) &&
        (!this.filteredVakufNames ||
          marker.vakufName === this.filteredVakufNames) &&
        (!this.searchTerm ||
          marker.vakufName
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          marker.cadastralParcelNumber
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()));
      marker.setVisible(isVisible);

      if (isVisible) {
        visibleMarkers.push(marker);
      }
    });

    this.visibleVakufNames = visibleMarkers;
  }

  resetSelectedVakufNames(): void {
    this.filteredVakufNames = '';
    this.filterMarkers();
  }

  selectSearchSuggestion(suggestion: string) {
    const cadastarParcelNumber = suggestion.split(' ')[0]; // Extract the cadastarParcelNumber from the suggestion
    this.searchTerm = cadastarParcelNumber; // Set the searchTerm to the cadastarParcelNumber
    this.showSearchSuggestions = false;
    this.filterMarkers();
  }

  generateSearchSuggestions(value: string) {
    this.searchSuggestions = []; // Clear the array before generating suggestions
    this.markers.forEach((marker) => {
      if (marker.vakufName.toLowerCase().includes(value.toLowerCase())) {
        this.searchSuggestions.push(marker.vakufName);
      }
      if (
        marker.cadastralParcelNumber.toLowerCase().includes(value.toLowerCase())
      ) {
        const suggestion =
          marker.cadastralParcelNumber + ' (' + marker.vakufName + ')';
        this.searchSuggestions.push(suggestion);
      }
    });
  }

  handleSearchInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    this.searchControl.setValue(value);

    if (value.length > 0) {
      this.generateSearchSuggestions(value);
      this.showSearchSuggestions = true;
    } else {
      this.showSearchSuggestions = false;
    }
  }
}
