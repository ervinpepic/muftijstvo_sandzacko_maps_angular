import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CustomMarker } from '../marker/Marker'; // Marker interface
import { MarkerService } from '../marker.service';
import { GenerateSuggestionsService } from '../generate-suggestions.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private markerService: MarkerService,
    private searchSuggestionService: GenerateSuggestionsService
  ) {}

  searchControl: FormControl = new FormControl();

  //ngModel bindingd
  searchTerm = '';
  selectedCity? = '';
  filteredVakufNames? = '';
  selectedVakufType? = '';

  //arrays
  markers: any[] = [];
  vakufCities: string[] | undefined = [];
  vakufObjectTypes: string[] | undefined = [];
  visibleVakufNames?: CustomMarker[] = [];

  //serach suggestions bindings
  showSearchSuggestions: boolean = false;
  searchSuggestions: string[] = [];

  selectedMarkerNames: string[] = [];

  //mandatory for OnInit decorator
  async ngOnInit(): Promise<void> {
    this.getMarkersNames();
    try {
      this.vakufObjectTypes = await this.markerService
        .loadObjectTypes()
        .toPromise();
      this.vakufCities = await this.markerService.loadCities().toPromise();
    } catch (error) {
      console.log('error in loading objects and cities', error);
    }
  }

  //filter markers localy
  filterMarkers(): void {
    this.markerService.filterMarkers(
      this.markerService.markers,
      this.selectedCity!,
      this.selectedVakufType!,
      this.filteredVakufNames!,
      this.searchTerm
    );
    this.visibleVakufNames = this.markerService.visibleVakufNames;
    this.selectedMarkerNames = this.markerService.markers
    .filter((marker) => {
      return (
        (!this.selectedCity || marker.city === this.selectedCity) &&
        (!this.selectedVakufType ||
          marker.vakufType === this.selectedVakufType)
          );
        })
        .map((marker) => marker.vakufName);
        console.log(this.visibleVakufNames);
      }

  //generating suggestions based on typings
  generateSearchSuggestions(value: string): void {
    this.searchSuggestions =
      this.searchSuggestionService.generateSearchSuggestions(
        value,
        this.visibleVakufNames || []
      );
  }

  //selecting vakuf type when searhc
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

  handleSearchInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchControl.setValue(inputElement.value);

    // this.searchControl.setValue(value);

    if (inputElement.value.length > 0) {
      this.generateSearchSuggestions(inputElement.value);
      this.showSearchSuggestions = true;
    } else {
      this.showSearchSuggestions = false;
    }
  }

  selectMarker(markerName: string): void {
    this.selectedMarkerNames.push(markerName);
    // You don't need to call filterMarkers here.
  }

  //reset vakuf name list after changing select tags for citi or vakuf type
  resetSelectedVakufNames(): void {
    // Reset selectedMarkerNames here
    this.selectedMarkerNames = [];
    this.filteredVakufNames = '';
    this.filterMarkers();
  }

  resetCity(): void {
    // Reset selectedMarkerNames here
    this.selectedMarkerNames = [];
    this.selectedCity = '';
    this.filterMarkers();
  }

  //get markerVakufNames
  async getMarkersNames(): Promise<void> {
    try {
      const rawMarkerData = await this.markerService.getMarkers().toPromise();
      this.markers =
        rawMarkerData?.map((markerVakufName) => markerVakufName.vakufName) ??
        [];
    } catch (error) {
      console.log('Error fetching marker data', error);
    }
  }
}
