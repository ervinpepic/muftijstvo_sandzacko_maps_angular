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
    console.log(this.visibleVakufNames);
  }

  //generating suggestions based on typings
  generateSearchSuggestions(value: string): void {
    this.searchSuggestions =
      this.searchSuggestionService.generateSearchSuggestions(value);
  }

  //selecting vakuf type when searhc
  selectSearchSuggestion(suggestion: string): void {
    const cadastarParcelNumber = suggestion.split(' ')[0]; // Extract the cadastarParcelNumber from the suggestion
    this.searchTerm = cadastarParcelNumber; // Set the searchTerm to the cadastarParcelNumber
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

  //reset vakuf name after changing type of vakuf
  resetSelectedVakufNames(): void {
    if (this.filteredVakufNames !== '') {
      this.filteredVakufNames = '';
      this.filterMarkers();
    }
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
