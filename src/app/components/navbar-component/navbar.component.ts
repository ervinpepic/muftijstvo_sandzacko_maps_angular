import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest, of } from 'rxjs';

import { NgSelectComponent } from '@ng-select/ng-select';
import { GenerateSuggestionsService } from '../../services/generate-suggestions.service'; // Service for suggesting search items
import { MarkerFilterService } from '../../services/marker-filter.service';
import { MarkerService } from '../../services/marker.service'; // Marker service

import { CustomMarker } from '../../Marker'; // Marker interface

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private markerService: MarkerService, 
    private searchSuggestionService: GenerateSuggestionsService,
    private markerFilterService: MarkerFilterService
  ) {}

  @ViewChild('filteredVakufNamesSelect') filteredVakufNamesSelect!: NgSelectComponent;
  @ViewChild('citySelect') citySelect!: NgSelectComponent;

  searchControl = new FormControl();

  // ngModel bindings
  searchQuery: string | null = null;
  selectedCity: string | null = null;
  selectedVakufType: string | null = null;
  filteredVakufNames: string | null = null;

  // Arrays
  markers: CustomMarker[] = [];
  selectedMarkerNames: string[] = [];
  vakufCities$?: Observable<string[]>;
  vakufObjectTypes$?: Observable<string[]>;

  // Serach suggestions bindings
  showSearchSuggestions: boolean = false;
  searchSuggestions: string[] = [];

  // error handling
  errorMessage = '';

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(): void {
    combineLatest([
      this.markerService.getVakufObjectTypes(),
      this.markerService.getVakufCities(),
    ]).subscribe({
      next: ([objectTypes, cities]) => {
        this.vakufObjectTypes$ = of(objectTypes);
        this.vakufCities$ = of(cities);
      },
      error: (error) => {
        this.errorMessage = `An error ${error} occurred while loading data. Please try again later.`;
      },
    });
  }

  // Filter markers on the map based on selected marker names from ng-select filteredVakufNames
  updateMarkersVisibility(): void {
    const filteredMarkers = this.getFilteredMarkers();
    this.markerService.markers.forEach((marker) => {
      marker.setVisible(filteredMarkers.includes(marker));
    });
  }

  // Arrow function for calling filter function
  filterMarkers(): void {
    if (
      this.selectedCity !== '' ||
      this.selectedVakufType !== '' ||
      this.searchQuery !== ''
    ) {
      this.selectedMarkerNames = this.markerService.markers
        .filter(
          (marker) =>
            (!this.selectedCity || marker.city === this.selectedCity) &&
            (!this.selectedVakufType ||
              marker.vakufType === this.selectedVakufType)
        )
        .map((marker) => marker.vakufName);
      this.filteredVakufNames = null; // clear the filteredVakufNames here
    } else {
      this.selectedMarkerNames = []; //return empty array if no result
    }
    this.updateMarkersVisibility(); // filter markers on the map
  }

  // generating suggestions based on typings
  async generateSearchSuggestions(value: string): Promise<void> {
    const filteredMarkers = this.getFilteredMarkers();
    const suggestion = await (this.searchSuggestions =
      this.searchSuggestionService.generateSearchSuggestions(
        value,
        filteredMarkers
      ));
    this.searchSuggestions = suggestion;
  }

  updateSearchQuery(value: string): void {
    const parts = value.split(' ');
    const numberPart = parts[0];

    this.searchQuery = /^\d+$/.test(numberPart) ? numberPart : value;
  }

  //selecting vakuf type when search
  selectSearchSuggestion(suggestion: string): void {
    this.updateSearchQuery(suggestion);
    this.showSearchSuggestions = false;
    this.updateMarkersVisibility();
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

  private getFilteredMarkers(): CustomMarker[] {
    return this.markerFilterService.filterMarkers(
      this.markerService.markers,
      this.selectedCity || '',
      this.selectedVakufType || '',
      this.filteredVakufNames || '',
      this.searchQuery || ''
    );
  }

  onVakufTypeChange(): void {
    this.citySelect.open();
  }

  onCityChange(): void {
    this.citySelect.close();
    this.filteredVakufNamesSelect.open();
  }
}
