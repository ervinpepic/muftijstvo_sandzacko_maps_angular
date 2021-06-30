export interface MarkerDataScaffold {
    placeName: string;
    year_foundation: string;
	katastar_parcela: string;
	katastar_opstina: string;
	pov_vakuf_parcele: string;
	list_nepokretnosti: string;
	naziv_ulice: string;
	img: string;
	latLng: {
		lat: number,
		lng: number
	},
}
