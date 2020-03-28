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
<<<<<<< HEAD
var geoData = "static/data/2019_States_Health_Data.geojson";
=======
var geoData = "static/data/2020_States_Health_Data.geojson";
>>>>>>> Steve

var geojson;

//Read in data with d3
d3.json(geoData, function(data) {

  //Test that data extraction is working for statesData.geojson file.
<<<<<<< HEAD
  // console.log(data);
  // console.log(data.features);
  // console.log(data.features[0].properties.All_Determinants_Rank);
=======
  console.log(data);
  console.log(data.features);
  console.log(data.features[0].properties.Years_Potential_Life_Lost_Per_100K);
>>>>>>> Steve


  // //As Justin's example, create new chloropleth layer
  geojson = L.choropleth(data, {

    
<<<<<<< HEAD
    //Define a property to in the features to use. The statesData has "density" for population density in
    //data.features.properties.density, but features has an array that must be interated through! Use the
    //data.features.forEach as above. Didn't work, but Kirby and I found that the density value for DC was
    //10065! DC was read on the choropleth! I modified to use 1065 for density in DC and see what happens.
    //File is statesData2.geojson 
    //This would be why every other state is so low that, compared to DC, they would be at the bottom of the
    //color scale. Extraction using valueProperty: "density" worked because density was in the properties 
    //dictionary.
    valueProperty: "%_Fair/Poor_Health",
=======
    //Define a property to in the features to use. These features are the health data properties in GeoJSON file.
    valueProperty: "Years_Potential_Life_Lost_Per_100K",
>>>>>>> Steve

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
<<<<<<< HEAD
        "<br>%_Fair/Poor_Health:<br>"
        //features.properties.%_Fair/Poor_Health
=======
        "<br>Years_Potential_Life_Lost_Per_100K:<br>" +
        features.properties.Years_Potential_Life_Lost_Per_100K
>>>>>>> Steve
        
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
<<<<<<< HEAD
      '<h1>%_Fair/Poor_Health</h1>' +
=======
      '<h1>Years_Potential_Life_Lost_Per_100K</h1>' +
>>>>>>> Steve
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