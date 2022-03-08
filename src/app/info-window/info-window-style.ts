export function infoWindowStyling(markerData) {
    return (
        "<div class='infowindow'>" +
          "<div class='row'>" + 
            "<div class='col'>" +
              "<p class='lead'><i class='fa-solid fa-mosque'></i> - <i class='fa-solid fa-location-dot'></i> Naziv objekta / mjesta:</p>" +
               "<h4 class='mb-2'>" + markerData.placeName + "</h4>"  +
              "<hr>" +
              "<p class='lead'><span><strong><i class='fa-solid fa-calendar-days'></i> Godina izgradnje: </strong></span>" +
                markerData.yearFounded +
              " godine</p>" +
              "<p class='lead'><span><strong><i class='fa-regular fa-map'></i> Katastarska parcela: </strong></span>" +
                markerData.cadastralParcelNumber +
              "</p>" +
              "<p class='lead'><span><strong><i class='fa-solid fa-city'></i> Katastarska opština: </strong></span>" +
                markerData.cadastarMunicipality +
              "</p>" +
              "<p class='lead'><span><strong><i class='fa-solid fa-map-location-dot'></i> Površina parcele: </strong></span>" +
                markerData.areaSize + " m<sup>2</sup>" +
              "</p>" +
              "<p class='lead'><span><strong><i class='fa-solid fa-scroll'></i> List nepokretnosti: </strong></span>" +
                markerData.realEstateNumber +
              "</p>" +
              "<p class='lead'><span><strong><i class='fa-solid fa-road'></i> Ulica: </strong></span>" + markerData.streetName + "</p>" +
              "<hr class='d-none d-sm-block d-md-none'>" +
            "</div>" + 
            "<div class='col'>"+ 
              "<p class='lead mt-2 mb-2'><span><strong><i class='fa-solid fa-image'></i> Slika objekta / Parcele: </strong></span>" + "</p>" + 
              
              "<img src='" + markerData.image + "' class='img-fluid img-thumbnail' width='100%' height='auto'" +   
            "</div>" +
          "</div>" +
        "</div>"
    );
}
