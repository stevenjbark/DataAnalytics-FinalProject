//EVENT HANDLER FUNCTIONS AND UPDATE FUNCTIONS FOR VARIABLES TO UPDATE MAPS

//Initial variables for map
var Year = d3.select("#selYear").property("value");
var Metric = d3.select("#selHealthMetric").property("value");


//Create initial map on load
updateMap(Year, Metric)



// //Event handler for dropdown menu change and update of map from Year Input.
// d3.select("#selYear").on("change", selectYear);

// //Event handler for dropdown menu change and update of map from Health Metric Input.
// d3.select("#selHealthMetric").on("change", selectMetric);




// //SELECTION FUNCTIONS FOR DATA FROM DROPDOWN MENUS
// function selectYear() {

//     //Select dropdown menu and assign to variable Year.
//     var Year = d3.select("#selYear").property("value");
//     console.log(Year);

//     updateMap(Year, Metric)
// };
    
// function selectMetric() {

//     //Select dropdown menu and assign to variable Metric
//     var Metric = d3.select("#selHealthMetric").property("value");
//     console.log(Metric);

//     updateMap(Year, Metric)
// };
