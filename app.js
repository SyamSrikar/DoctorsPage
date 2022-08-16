// var city=document.getElementById('city_name')
// function get_location() {
//     navigator.geolocation.getCurrentPosition(function (position) {
//             getUserAddressBy(position.coords.latitude, position.coords.longitude)
//         },
//         function (error) {
//             console.log("The Locator was denied :(")
//         })

//     function getUserAddressBy(lat, long) {
//         var xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function () {
//             if (this.readyState == 4 && this.status == 200) {
//                 var address = JSON.parse(this.responseText)
//                 console.log(lat,long)
//                 // console.log(address.results[0].formatted_address)
//                 console.log(address.results[0])
//                 city.innerHTML=address.results[0];
//             }
//         };
//         xhttp.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&key=AIzaSyDH2aAbE3u-05sS2gYhmUiGSZGTe_TWZQc", true);
//         xhttp.send();
//     }

// }
// window.addEventListener(onload,get_location())




function getCoordintes() {  
    function success(pos) {
        var crd = pos.coords;
        var lat = crd.latitude.toString();
        var lng = crd.longitude.toString();
        var coordinates = [lat, lng];
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        getCity(coordinates);
        return;
  
    }
  
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
  
    navigator.geolocation.getCurrentPosition(success, error);
}
  
// Step 2: Get city name
function getCity(coordinates) {
    var xhr = new XMLHttpRequest();
    var lat = coordinates[0];
    var lng = coordinates[1];
  
    // Paste your LocationIQ token below.
    xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=AIzaSyDH2aAbE3u-05sS2gYhmUiGSZGTe_TWZQc&lat=" +
    lat + "&lon=" + lng + "&format=json", true);
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);
  
    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            var city = response.address.city;
            console.log(city);
            return;
        }
    }
}
  
getCoordintes();