//Start building app.js file for extracting ACA data

//Retrieve data from url /API/Data
var url = "/API/Data"

var ACAData = d3.json(url).then(function(data){

    //To filter the data to entries where the "State" is the desired state from pulldown menu

    var state = data.filter(value => value["State"] === "Arizona");

    //To extract the state "Data" array from the state whose data we wanted from pulldown menu
    var statedata = state[0]["Data"];

    //Extract some data from the "Data" array
    var statename = statedata["State Name"]
    var cardiodeaths = statedata["Cardiovascular Deaths"];
    var diabetes = statedata["Diabetes"];
    var infantmort = statedata["Infant Mortality"];

    console.log(data);
    console.log(state);
    console.log(statedata);
    // console.log(cardiodeaths);
    // console.log(diabetes);
    // console.log(infantmort);





//  //DROPDOWN MENU SECTION
//  //Select the #selDataset again to now use with all of the sampleNumbers available.
//  var sampleMenu = d3.select("#selDataset");

//  //Assign the value of the dropdown menu option to sampleID variable for data filtering.
//  var sampleID = sampleMenu.property("value");
//  console.log(sampleID);




//Clear previous data in demographicMenu: Select in Line 1, Reassign to nothing in Line 2
var oldStateMenu = d3.select("#sample-metadata");
oldStateMenu.html("");


    
    
//Select sample-metadata id using d3. This is where I will insert text for demographicData
var StateMenu = d3.select("#sample-metadata");

    var cell = StateMenu.append("h4");
    cell.text(`State: ${statename}`);

    var cell = StateMenu.append("p");
    cell.text(`Cardiovascular Deaths: ${cardiodeaths}`);
            
    var cell = StateMenu.append("p");
    cell.text(`Diabetes: ${diabetes}`);

    var cell = StateMenu.append("p");
    cell.text(`Infant Mortality: ${infantmort}`);
            
});