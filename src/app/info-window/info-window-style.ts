export function infoWindowStyling(markerData) {
	return (
		"<div class='infowindow'>" +
			"<div class='row p-1'>" +
				"<div class='col-12 col-lg-6'>" +
					"<p class='lead'>" +
						"<i class='fa-solid fa-mosque'></i> - <i class='fa-solid fa-location-dot'>" +
						"</i> Naziv objekta / Mjesta:" +
					"</p>" +
					"<h4 class='mb-2'>" + markerData.placeName + "</h4>" +
					"<hr>" +
					"<p class='lead'>" +
						"<span><strong>" +
							"<i class='fa-solid fa-calendar-days'></i> Godina izgradnje: " +
						"</strong></span>" + markerData.yearFounded + " godine" +
					"</p>" +
					"<p class='lead'>" +
						"<span><strong>" +
							"<i class='fa-regular fa-map'></i> Katastarska parcela: " +
						"</strong></span>" + markerData.cadastralParcelNumber +
					"</p>" +
					"<p class='lead'>" +
						"<span><strong>" +
							"<i class='fa-solid fa-map-location-dot'></i> Površina parcele: " +
						"</strong></span>" + markerData.areaSize + " m<sup>2</sup>" +
					"</p>" +
					"<p class='lead'>" +
						"<span><strong>" +
							"<i class='fa-solid fa-scroll'></i> List nepokretnosti: " +
						"</strong></span>" + markerData.realEstateNumber +
					"</p>" +
					"<p class='lead'>" +
						"<span><strong>" +
							"<i class='fa-solid fa-city'></i> Katastarska opština: " +
						"</strong></span>" + markerData.cadastarMunicipality +
					"</p>" +
					"<p class='lead'>" +
						"<span><strong>" +
							"<i class='fa-solid fa-road'></i> Ulica: " +
						"</strong></span>" + markerData.streetName +
					"</p>" +
					"<hr>" +
				"</div>" +
				"<div class='col-12 col-lg-6'>" +
					"<p class='lead'>" +
						"<span><strong>" +
							"<i class='fa-solid fa-image'></i> Slika objekta / Parcele: " +
						"</strong></span>" +
					"</p>" +
					"<p class='lead mt-2 mb-2'>" +
						"<span><strong>" +
							"<a class='link-success mt-1	' data-bs-toggle='collapse' href='#viewImageControl' role='button' aria-expanded='false' aria-controls='viewImageContro'>" +
								"Prikaži sliku" +
							"</a>" +
						"</strong></span>" +
					"</p>" +
					"<img src='" + markerData.image + "' id='viewImageControl' class='collapse img-fluid rounded mt-2' width='100%' height='100%'>" +
				"</div>" +
			"</div>" +
		"</div>"

	);
}
