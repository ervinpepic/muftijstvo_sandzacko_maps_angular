import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { GenerateSuggestionsService } from '../generate-suggestions.service'; // Service for suggesting search items
import { MarkerService } from '../marker.service'; // Marker service
import { CustomMarker } from '../marker/Marker'; // Marker interface

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    private markerService: MarkerService, // creating instance for marker service
    private searchSuggestionService: GenerateSuggestionsService // creating instance for suggestion service
  ) {
    this.initializeData(); // initialization of objects and cities when the app load.
  }

  searchControl = new FormControl();

  //ngModel bindingd
  searchQuery = '';
  selectedCity = '';
  selectedVakufType = '';
  filteredVakufNames = '';

  //arrays
  markers: CustomMarker[] = [];
  selectedMarkerNames: string[] = [];
  vakufCities$?: Observable<string[]>;
  vakufObjectTypes$?: Observable<string[]>;
  filteredMarkers?: CustomMarker[] = [];

  //serach suggestions bindings
  showSearchSuggestions: boolean = false;
  searchSuggestions: string[] = [];

  // error handling
  errorMessage = '';

  // method for calling objects and cities on the app init
  async initializeData(): Promise<void> {
    try {
      this.vakufObjectTypes$ = this.markerService.loadObjectTypes();
      this.vakufCities$ = this.markerService.loadCities();
    } catch (error) {
      this.errorMessage = 'An error occurred while loading data. Please try again later.';
    }
  }

  //filter markers localy
  filterMarkers(): void {
    this.markerService.filterMarkers(
      this.markerService.markers,
      this.selectedCity || '',
      this.selectedVakufType || '',
      this.filteredVakufNames || '',
      this.searchQuery
    );
    this.filteredMarkers = this.markerService.filteredMarkers;
    console.log('Ovo je SelektedMarkerNejms=>', this.selectedMarkerNames)
    console.log('Ovo je VisibleVakufMarkerNejms=>', this.filteredMarkers);
    console.log('Ovo je SearchSuggestions =>', this.searchSuggestions);
  }

  // Arrow function for calling filter function
  filterMarkersFunc (): void {
    if (this.selectedCity !== '' || this.selectedVakufType !== '' || this.searchQuery !== '') {
      this.selectedMarkerNames = this.markerService.markers
        .filter(
          (marker) =>
            (!this.selectedCity || marker.city === this.selectedCity) &&
            (!this.selectedVakufType || marker.vakufType === this.selectedVakufType)
        ).map((marker) => marker.vakufName);
      this.filteredVakufNames = ''; // Clear the filteredVakufNames here
    } else {
      this.selectedMarkerNames = [];
    }
    this.filterMarkers(); // filter markers on the map
  };
  
  //generating suggestions based on typings
  async generateSearchSuggestions(value: string): Promise<void> {
    const suggestion = await (this.searchSuggestions =
      this.searchSuggestionService.generateSearchSuggestions(
        value,
        this.filteredMarkers || []
      ));
    this.searchSuggestions = suggestion;
  }

  updateSearchQuery(value: string): void {
    const parts = value.split(' ');
    const numberPart = parts[0];

    if (/^\d+$/.test(numberPart)) {
      this.searchQuery = numberPart;
    } else {
      this.searchQuery = value;
    }
  }

  //selecting vakuf type when search
  selectSearchSuggestion(suggestion: string): void {
    this.updateSearchQuery(suggestion);
    this.showSearchSuggestions = false;
    this.filterMarkers();
  }

  // Method for getting forms input to show or hide suggestion 
  handleSearchInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchControl.setValue(inputElement.value);

    // check for input length
    if (inputElement.value.length > 0) {
      this.generateSearchSuggestions(inputElement.value);
      this.showSearchSuggestions = true;
    } else {
      this.showSearchSuggestions = false;
    }
    this.updateSearchQuery(inputElement.value);
  }
}
