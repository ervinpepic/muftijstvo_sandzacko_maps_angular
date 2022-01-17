export interface MarkerDataScaffold {
    placeName: string;
	placeFilter: string;
	cadastarMunicipality: string;
	cadastralParcelNumber: string;
	realEstateNumber: string;
	areaSize: string;
    yearFounded: string;
	streetName: string;
	image: string;
	markerPosition: {
		lat: number,
		lng: number
	},
}
