//Adapting code from Project 2, no URL needed for geojson files. Use D3 to select dropdown menu 
//information and open proper file.


// Creating map object
  var myMap = L.map('map', {
    center: [30.3, -99.0],
    zoom: 6
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







//USING ANYTHING WITH RELOAD CAUSES A LOOPING CONSTANT REFRESHING OF THE PAGE. EVEN WHEN HANDLING LIKE HERE!!!
//Event handler for button to refresh page
//d3.select("#button").on("click", location.reload());

//Event handler for dropdown menu change and update of map from Year Input.
d3.select("#selYear").on("change", updateMap);

//Event handler for dropdown menu change and update of map from Health Metric Input.
d3.select("#selHealthMetric").on("change", updateMap)



//Create function to updateMap
function updateMap() {



  //SELECTION DATA FROM DROPDOWN MENUS
  //Select dropdown menu and assign to variable dropdownYear.
  var dropdownYear = d3.select("#selYear");
  console.log(dropdownYear);

  //Use dropdownYear property to input the proper year file.
  var Year = dropdownYear.property("value");
  console.log(Year);


  //Health Data from Dropdown Menu
  //Select health data dropdown menu and assign to variable dropdownMetric.
  var dropdownMetric = d3.select("#selHealthMetric");
  console.log(dropdownMetric);

  //Use dropdownMetric property to input the desired metric for analysis.
  var Metric = dropdownMetric.property("value");
  console.log(Metric);




  //Input the Year information into opening the proper geojson file.
  var geoData = `static/data/${Year}_TXCounty_Health_Data.geojson`;

  var geojson;

  //Read in data with d3
  d3.json(geoData, function(data) {

    //Test that data extraction is working for statesData.geojson file.
    //console.log(data);
    // console.log(data.features);
    // console.log(data.features[0].properties.Years_Potential_Life_Lost_Per_100K);

    // //As Justin's example, create new chloropleth layer
    geojson = L.choropleth(data, {

      
      //Justin's code includes a valueProperty that take data from the geojson "properties" dictionary.
      //This will allow us to use whatever properties data we want for mapping.
      valueProperty: Metric,

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
      

      //Binding a pop-up to each layer
      onEachFeature: function (features, layer) {
        layer.bindPopup(
          features.properties.County + " " + features.properties.Year +
          `<br>${Metric}:<br>` +
          features.properties.Metric 
        )
        //console.log(features.properties.Years_Potential_Life_Lost_Per_100K)
      }

    }).addTo(myMap);



  // Set up the legend
    var legend = L.control({ position: 'topright' });
    legend.onAdd = function () {
      var div = L.DomUtil.create('div', 'info legend');
      var limits = geojson.options.limits;
      var colors = geojson.options.colors;
      var labels = [];

      // Add min & max
      var legendInfo =
        `<h4>${Metric} ${Year}</h4>` +
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


  })

};

updateMap()
