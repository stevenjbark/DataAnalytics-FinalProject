// Creating map object
var myMap = L.map('map', {
  center: [37.8, -96.0],
  zoom: 5
});

// Adding tile layer
L.tileLayer(
  'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: API_KEY
  }
).addTo(myMap);

//Found that the us-states.js data file is not authentic geojson! Found https://jsonlint.com/ for a validation tool
//to determine problems with formatting. Last line had a semicolon, which is NOT accepted in geojson. Removed = working!
var geoData = "static/data/2020_States_Health_Data.geojson";

var geojson;

//Read in data with d3
d3.json(geoData, function(data) {

  //Test that data extraction is working for statesData.geojson file.
  console.log(data);
  console.log(data.features);
  console.log(data.features[0].properties.Years_Potential_Life_Lost_Per_100K);


  // //As Justin's example, create new chloropleth layer
  geojson = L.choropleth(data, {

    
    //Define a property to in the features to use. These features are the health data properties in GeoJSON file.
    valueProperty: "Years_Potential_Life_Lost_Per_100K",

    //Set color scale
    scale: ["blue", "green", "yellow", "red"],

    //Number of breaks in step range
    steps: 15,

    // q for quartile, e for equidistant, k for k-means
    mode: 'e',
    style: {
      // Border color
      color: "black",
      weight: 1,
      fillOpacity: 0.5,
    },
    

    // Binding a pop-up to each layer
    onEachFeature: function (features, layer) {
      layer.bindPopup(
        features.properties.State + " " + features.properties.Year +
        "<br>Years_Potential_Life_Lost_Per_100K:<br>" +
        features.properties.Years_Potential_Life_Lost_Per_100K
        
      )
      //console.log(features.properties.%_Fair/Poor_Health)
    }
  }).addTo(myMap);



// Set up the legend
  var legend = L.control({ position: 'bottomright' });
  legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend');
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];

    // Add min & max
    var legendInfo =
      '<h1>Years_Potential_Life_Lost_Per_100K</h1>' +
      '<div class="labels">' +
      '<div class="min">' +
      limits[0] +
      '</div>' +
      '<div class="max">' +
      limits[limits.length - 1] +
      '</div>' +
      '</div>';

    div.innerHTML = legendInfo;

    limits.forEach(function (limit, index) {
      labels.push('<li style="background-color: ' + colors[index] + '"></li>');
    });

    div.innerHTML += '<ul>' + labels.join('') + '</ul>';
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);


});