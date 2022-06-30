let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: new google.maps.LatLng(12.9240137, 77.5008466),
    mapTypeId: "terrain",
  });
  // console.log(map)
  // Create a <script> tag and set the USGS URL as the source.
  const script = document.createElement("script");

  // This example uses a local copy of the GeoJSON stored at
  // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
  script.src =
    "https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js";
  document.getElementsByTagName("head")[0].appendChild(script);

  map.data.setStyle((feature) => {
    const magnitude = feature.getProperty("mag");
    return {
      icon: getCircle(magnitude),
    };
  });
}
function getCircle(magnitude) {
  return {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: "red",
    fillOpacity: 0.2,
    scale: Math.pow(2, magnitude) / 2,
    strokeColor: "white",
    strokeWeight: 0.5,
  };
}

function eqfeed_callback(results) {
  console.log(results);
  results = "";
  fetch('http://localhost:3000/allDamages')
  .then((response) => {
    return response.json();
  })
  .then((results) => {
    console.log(results);
    for (let i = 0; i < results.length; i++) {
      // var infowindow = new google.maps.InfoWindow({
      //   content: `
      //   <p><h3>Title:</h3>`+results[i]['Title']+`</p>
      //   <p><h3>Damage:</h3>`+results[i]['Damage']+`</p>
      //   <p><h3>Lat. :</h3>`+results[i]['Latitude']+`</p>
      //   <p><h3>Long. :</h3>`+results[i]['Longitude']+`</p>
      //   <p><h3>Address:</h3>`+results[i]['Address Line']+`</p>
      //   <p><h3>City/Locality:</h3>`+results[i]['Locality']+`</p>
      //   <p><h3>Postal Code:</h3>`+results[i]['Postal Code']+`</p>
      //   <p><h3>TimeStamp:</h3>`+results[i]['TimeStamp']+`</p>
      //   <p><h3>Confidence:</h3>`+results[i]['Confidence']+`</p>
      //   `
      // });
      const coords = [results[i]['Latitude'], results[i]['Longitude']];
      const latLng = new google.maps.LatLng(coords[0], coords[1]);
      console.log(coords[0], coords[1]);
      const circle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.15,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.25,
        map,
        center: { lat: coords[0], lng: coords[1]},
        radius: results[i]['Confidence'],
      });
      var infowindow = new google.maps.InfoWindow({
        content: `
        <p><h3>Title:</h3>`+results[i]['Title']+`</p>
        <p><h3>Damage:</h3>`+results[i]['Damage']+`</p>
        <p><h3>Lat. :</h3>`+results[i]['Latitude']+`</p>
        <p><h3>Long. :</h3>`+results[i]['Longitude']+`</p>
        <p><h3>Address:</h3>`+results[i]['Address Line']+`</p>
        <p><h3>City/Locality:</h3>`+results[i]['Locality']+`</p>
        <p><h3>Postal Code:</h3>`+results[i]['Postal Code']+`</p>
        <p><h3>TimeStamp:</h3>`+results[i]['TimeStamp']+`</p>
        <p><h3>Confidence:</h3>`+results[i]['Confidence']+`</p>
        `
      });
      const marker = new google.maps.Marker({
        position: latLng,
        map: map,
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
  }
  res = {};
  // map.data.addGeoJson(res);
});  
}

// Loop through the results array and place a marker for each
// set of coordinates.
// function eqfeed_callback(results) {
//   console.log("Hello inside enfedd")
  // results = [[12.9240137, 77.5008466]];
//   fetch('http://localhost:3000/allDamages')
//   .then((response) => {
//     return response.json();
//   })
//   .then((results) => {
//     console.log(results);
//     for (let i = 0; i < results.length; i++) {
//       var infowindow = new google.maps.InfoWindow({
//         content: `
//         <p><h3>Title:</h3>`+results[i]['Title']+`</p>
//         <p><h3>Damage:</h3>`+results[i]['Damage']+`</p>
//         <p><h3>Lat. :</h3>`+results[i]['Latitude']+`</p>
//         <p><h3>Long. :</h3>`+results[i]['Longitude']+`</p>
//         <p><h3>Address:</h3>`+results[i]['Address Line']+`</p>
//         <p><h3>City/Locality:</h3>`+results[i]['Locality']+`</p>
//         <p><h3>Postal Code:</h3>`+results[i]['Postal Code']+`</p>
//         <p><h3>TimeStamp:</h3>`+results[i]['TimeStamp']+`</p>
//         <p><h3>Confidence:</h3>`+results[i]['Confidence']+`</p>
//         `
//       });
// // Address Line: "CAUVERY HOSTEL RVCE CAMPUS, RV COLLEGE OF ENGINEERING, RV Vidyaniketan, Mailasandra, Bengaluru, Karnataka 560059, India"
// // Confidence: 66.78852844238281
// // Country: "India"
// // Damage: "Alligator crack"
// // Label: 4
// // Latitude: 12.9240147
// // Locality: "Bengaluru"
// // Longitude: 77.5008466
// // Postal Code: "560059"
// // TimeStamp: "2022-06-28 16:23:25"
// // Title: "D20"
//       const coords = [results[i]['Latitude'], results[i]['Longitude']];
//       const latLng = new google.maps.LatLng(coords[0], coords[1]);
//       console.log(coords[0], coords[1]);
//       const marker = new google.maps.Marker({
//         position: latLng,
//         map: map,
//       });
//       marker.addListener('click', function() {
//         infowindow.open(map, marker);
//       });
//   }});
  
  
// };
window.initMap = initMap;
window.eqfeed_callback = eqfeed_callback;
