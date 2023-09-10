import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { CustomMarker } from '../marker/Marker'; // Marker interface
import { MarkerService } from '../marker.service'; // Marker service
import { GenerateSuggestionsService } from '../generate-suggestions.service'; // Service for suggesting search items

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
    this.vakufObjTypesAndCitiesInit(); // initialization of objects and cities when the app load.
  }

  searchControl: FormControl = new FormControl();

  //ngModel bindingd
  searchTerm = '';
  selectedCity: string = '';
  selectedVakufType: string = '';
  filteredVakufNames: string = '';

  //arrays
  markers: CustomMarker[] = [];
  selectedMarkerNames: string[] = [];
  vakufCities$!: Observable<string[]>;
  vakufObjectTypes$!: Observable<string[]>;
  visibleVakufNames?: CustomMarker[] = [];

  //serach suggestions bindings
  showSearchSuggestions: boolean = false;
  searchSuggestions: string[] = [];

  //mandatory for OnInit decorator
  async vakufObjTypesAndCitiesInit(): Promise<void> {
    try {
      this.vakufObjectTypes$ = this.markerService.loadObjectTypes();
      this.vakufCities$ = this.markerService.loadCities();
    } catch (error) {
      console.log('error in loading objects and cities', error);
    }
  }

  //filter markers localy
  filterMarkers(): void {
    this.markerService.filterMarkers(
      this.markerService.markers,
      this.selectedCity || '',
      this.selectedVakufType || '',
      this.filteredVakufNames || '',
      this.searchTerm
    );
    this.visibleVakufNames = this.markerService.visibleVakufNames;
    console.log('Ovo je SelektedMarkerNejms=>' ,this.selectedMarkerNames)
    console.log('Ovo je VisibleVakufMarkerNejms=>',this.visibleVakufNames);
  }

  // Arrow function for calling filter function
  filterMarkersFunc = () => { 
    this.filteredVakufNames = ''; // Reset filteredVakufNames
    this.selectedMarkerNames = []; // empty selectedMarkerNames array
    this.selectedMarkerNames = this.markerService.markers
    .filter(
      (marker) =>
        (!this.selectedCity || marker.city === this.selectedCity) &&
        (!this.selectedVakufType ||marker.vakufType === this.selectedVakufType)
    ).map((marker) => marker.vakufName);
    this.filterMarkers(); // filter markers on the map
  };

  //generating suggestions based on typings
  generateSearchSuggestions(value: string): void {
    const suggestion = (this.searchSuggestions =
      this.searchSuggestionService.generateSearchSuggestions(
        value,
        this.visibleVakufNames || []
      ));
    this.searchSuggestions = suggestion;
  }

  //selecting vakuf type when search
  selectSearchSuggestion(suggestion: string): void {
    const parts = suggestion.split(' '); // Split the suggestion into parts
    const numberPart = parts[0]; // Split the suggestion into parts
    // Check if the number part is a numeric string before setting it as the search term
    if (/^\d+$/.test(numberPart)) {
      this.searchTerm = numberPart;
    } else {
      this.searchTerm = suggestion; // If it's not numeric, set the entire suggestion
    }
    this.showSearchSuggestions = false;
    this.filterMarkers();
  }

  // Method for getting forms input to show or hide suggestion 
  handleSearchInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchControl.setValue(inputElement.value);

    // check for input length
    if (inputElement.value.length > 0) {
      this.generateSearchSuggestions(inputElement.value);
      this.showSearchSuggestions = true;
    } else {
      this.showSearchSuggestions = false;
    }
  }
}
