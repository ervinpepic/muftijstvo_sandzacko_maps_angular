import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

//Google async MAPS API loader
import { Loader } from '@googlemaps/js-api-loader';
//API key from env file
import { GOOGLEAPIKEY } from 'src/env';

//marker interface
import { CustomMarker } from './marker/Marker';

//Styling imports
import { StylingMarkers } from './marker/styling/marker-style';
import { MarkerEvents } from './marker/events/marker-events';
import { mapStyling } from './map/map-style';

//Data sets import
import { PolygonsBoundaries } from './polygons/map-polygons';
import { VakufData } from './database/database-seed';
import { Subject } from 'rxjs';
import { MarkerService } from './marker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements AfterViewInit {

  //use for reference child component into the app compoment with gmap
  //when creating map
  @ViewChild('mapContainer', { static: false }) mapContainer?: ElementRef;
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private markerService: MarkerService) {}
  //class member for title
  title = 'Muftijstvo Sandžačko Mape Vakufa';

  //DB connection
  vakufDataDB = VakufData;
  //class members for search and filtering ngModel in app.component.html
  searchTerm: string = ''; //used in search bar form
  selectedVakufType?: string = ''; //used in select dropdown menu for type of object
  selectedCity?: string = ''; //used in select dropdown menu for place
  filteredVakufNames?: string = ''; //used in select dropdown menu for place name after filtering and before filtering
  searchSuggestions: string[] = [];
  showSearchSuggestions: boolean = false;
  searchControl: FormControl = new FormControl();
  search$ = new Subject<string>();
  //Arrays of markers after filtering using filterMarker() function
  visibleVakufNames?: CustomMarker[] = [];

  //Arrays of markers data
  markers: Array<any> = [];

  //google maps initializatior and setup
  map?: google.maps.Map;
  mapStyle = mapStyling;
  mapCenter = {
    lat: 42.99603931107363,
    lng: 19.863259815559704,
  };
  mapZoom = 9;

  //marker styling functions from separated modules
  markerEvents = new MarkerEvents();
  markerStyling = new StylingMarkers();

  //map polygon boundaries for Sandzak
  polygons = new PolygonsBoundaries();

  //mandatory for AfterViewInit decorator
  ngAfterViewInit(): void {
    const googleApiAsyncLoader = new Loader({
      apiKey: GOOGLEAPIKEY,
      version: 'weekly',
    });
    //initialize createMap() funciton with async closure
    googleApiAsyncLoader.load().then(() => {
      this.createMap();
    });
    
  }

  //google maps initialization
  createMap(): void {
    this.map = new google.maps.Map(this.mapContainer!.nativeElement, {
      center: this.mapCenter,
      zoom: this.mapZoom,
      styles: this.mapStyle,
    });
    //call addMarkers() for creating markers in this map
    this.getMarkers();
    //call for polygons creation
    this.polygons.drawPolgygons(this.map);
  }

  //logic for adding markers to the map
  getMarkers() {
    this.markerService.getMarkers().subscribe((markerData => {
      markerData.forEach((data) => {
        const marker = new google.maps.Marker({
          ...data,
          position: new google.maps.LatLng(data.position),
          icon: this.markerStyling.markerIconDefaultCreate(),
          draggable: false,
          optimized: false,
          animation: google.maps.Animation.DROP,
        });
  
        //style for markers
        this.markerEvents.markerInfoWindow(marker, data, this.map);
        this.markerEvents.markerMouseOver(marker);
        this.markerEvents.markerMouseOut(marker);
  
        //add extracted markers to the array of markers
        this.markers.push(marker);
        marker.setMap(this.map!);
      })
    }));
      

      //return marker after creation
      // return marker;
    
  }

  //filtering markers with multiple params
  filterMarkers() {
    const visibleMarkers: any[] = [];
    
    this.markers.forEach((marker) => {
      const isVisible =
        (!this.selectedCity || marker.city === this.selectedCity) &&
        (!this.selectedVakufType ||
          marker.vakufType === this.selectedVakufType) &&
        (!this.filteredVakufNames ||
          marker.vakufName === this.filteredVakufNames) &&
        (!this.searchTerm ||marker.vakufName.toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          !this.searchTerm ||marker.cadastralParcelNumber
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()));
      marker.setVisible(isVisible);

      if (isVisible) {
        visibleMarkers.push(marker);
      }
    });

    //added visible markers after filtering to the visible marker array
    this.visibleVakufNames = visibleMarkers;
  }

  resetSelectedVakufNames(): void {
    this.filteredVakufNames = '';
    this.filterMarkers();
  }

  generateSearchSuggestions(value: string) {
    this.searchSuggestions = []; // Clear the array before generating suggestions
    this.markers.forEach((marker) => {
      if (marker.vakufName.toLowerCase().includes(value.toLowerCase())) {
        this.searchSuggestions.push(marker.vakufName);
      }
      if (marker.cadastralParcelNumber.toLowerCase().includes(value.toLowerCase())) {
        const suggestion = marker.cadastralParcelNumber + ' (' + marker.vakufName + ')';
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
  
  selectSearchSuggestion(suggestion: string) {
    this.searchTerm = suggestion;
    this.showSearchSuggestions = false;
    this.filterMarkers();
  }

}
