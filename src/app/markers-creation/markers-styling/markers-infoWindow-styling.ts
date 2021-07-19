export function infoWindowStyling(markerInfo) {
    return (
        "<div class='infowindow'>" +
          "<div class='row'>" + 
            "<div class='col'>" +
               "<h3 class='h3 mb-2'>" +  " " + " <i class='fas fa-mosque fa-1x'></i> " + markerInfo.placeName + "</h3>"  +
              "<hr>" +
              "<p class='lead'><span><strong><i class='fas fa-calendar-alt'></i> Godina izgradnje: </strong></span>" +
                markerInfo.year_foundation +
              " godine</p>" +
              "<p class='lead'><span><strong><i class='fas fa-map'></i> Katastarska parcela: </strong></span>" +
                markerInfo.katastar_parcela +
              "</p>" +
              "<p class='lead'><span><strong><i class='fas fa-city'></i> Katastarska opština: </strong></span>" +
                markerInfo.katastar_opstina +
              "</p>" +
              "<p class='lead'><span><strong><i class='fas fa-map-marked-alt'></i> Površina parcele: </strong></span>" +
                markerInfo.pov_vakuf_parcele + " m<sup>2</sup>" +
              "</p>" +
              "<p class='lead'><span><strong><i class='fas fa-scroll'></i> List nepokretnosti: </strong></span>" +
                markerInfo.list_nepokretnosti +
              "</p>" +
              "<p class='lead'><span><strong><i class='fas fa-road'></i> Ulica: </strong></span>" + markerInfo.naziv_ulice + "</p>" +
              "<hr class='d-none d-sm-block d-md-none'>" +
            "</div>" + 
            "<div class='col'>"+ 
              "<p class='lead mt-2 mb-2'><span><strong><i class='fas fa-image'></i> Slika objekta: </strong></span>" + "</p>" + 
              
              "<img src='" + markerInfo.img + "' class='img-fluid img-thumbnail' width='100%' height='auto'" +   
            "</div>" +
          "</div>" +
        "</div>"
    );
}
