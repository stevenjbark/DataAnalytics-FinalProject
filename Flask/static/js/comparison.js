//FIRST MENU FOR COMPARISON DATA

//Start building app.js file for extracting ACA data for Menu 1
var url = "/API/Data"

//DROPDOWN MENU POPULATING WITH STATE NAMES FROM DATA
//Extract samples data from json file.
d3.json(url).then(function(data) {

    //console.log(data);

    //Extract the states and use these to create a listing for the state dropdown menu.
    var states = data.map(value => value.State);
    console.log(states);

    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset1");

    //Initial menu option should be "California"
    var cell = dropdownMenu.append("option");
    cell.text("California");

    //Loop through states for appending to dropdownMenu below "State"
    states.forEach(function(newState) {

        //For each new sampleNumber, append a new row and state text.
        var cell = dropdownMenu.append("option");
        cell.text(newState);

        });

    //DROPDOWN MENU FOR POPULATING WITH YEAR DATA
    //Extract the years and use to create a listing for the year dropdown menu
    var year = data.map(value => value.Year);
    
    //Use D3 to select the dropdown menu
    var dropdownMenuYear = d3.select("#selDatayear1");

    //Initial option should be 2019
    var cell = dropdownMenuYear.append("option");
    cell.text(2019);

    //If I just looped as above, there will be 52 lines for every year in the data.
    //Create an array, then append to that array, then remove duplicates!
    yearArray = [];

    year.forEach(function(newYear){
        yearArray.push(newYear);
    })
    //console.log(yearArray);

    uniqueYear = new Set(yearArray);
    //console.log(uniqueYear);

    //Loop through years and append to dropdown menu for below "Year"
    uniqueYear.forEach(function(uniqueYear) {
        //For each newYear, append a new row and year text
        var cell = dropdownMenuYear.append("option");
        cell.text(uniqueYear);
    });

    updateTable1()

    });


//EVENT HANDLER FOR DROPDOWN MENU UPDATE TABLE EVENT BY STATE
d3.select("#selDataset1").on("change", updateTable1);

//EVEND HANDLER FOR DROPDOWN MENU UPDATE TABEL EVENT BY YEAR
d3.select("#selDatayear1").on("change", updateTable1);

//updateTABLE FUNCTION
function updateTable1() {

    //Retrieve data from url /API/Data
    var url = "/API/Data"

    d3.json(url).then(function(data) {
    //console.log(data);

    //DROPDOWN MENU SECTION
        //Select the #selDataset again to now use with all of the state names available.
        var sampleMenu = d3.select("#selDataset1");

        //Select the #selDatayear1 to use the year.
        var sampleYear = d3.select("#selDatayear1");

        //Assign the value of the dropdown state menu option to pickedState variable for data filtering.
        var pickedState1 = sampleMenu.property("value");
        console.log(pickedState1);

        //Assign the value of the dropdown year menu option to pickedYear variable for data filtering.
        var pickedYear1 = sampleYear.property("value");
        console.log(pickedYear1);

    //FILTERING BY MENU SELECTION
        //To filter the data to entries where the "State" is the desired state from pulldown menu.
        //Note that the == and not ===, the Year is a string search, but the array value is a number!
        var state = data.filter(value => value["State"] == pickedState1 && value["Year"] == pickedYear1);
        // console.log(state);

        //To extract the state "Data" array from the state whose data we wanted from pulldown menu
        var statedata = state[0]["Data"];
        //console.log(statedata);

        //Extract some data from the "Data" array
        var statename = statedata["State"]
        var year = statedata["Year"];
        var cancerdeaths = statedata["Cancer_Deaths_Value"];
        var cardiodeaths = statedata["Cardiovascular_Deaths_Value"];
        var cholesterolcheck = statedata["Cholesterol_Check_Value"];
        var diabetes = statedata["Diabetes_Value"];
        var disparity = statedata["Disparity_in_Health_Status_Value"];
        var drugdeaths = statedata["Drug_Deaths_Value"];
        var bloodpressure = statedata["High_Blood_Pressure_Value"];
        var infantmort = statedata["Infant_Mortality_Value"];
        var immunized = statedata["Immunizations_Children_Value"];
        var premature = statedata["Premature_Death_Value"];
        var primaryphys = statedata["Primary_Care_Physicians_Value"];
        var uninsured = statedata["Uninsured_Value"];
        var expanded = statedata["Medicaid_Expanded"];

        
        // console.log(data);
        // console.log(state);
        // console.log(statedata);
        // console.log(cardiodeaths);
        // console.log(diabetes);
        // console.log(infantmort);

        //Clear previous data in demographicMenu: Select in Line 1, Reassign to nothing in Line 2
        var oldStateMenu = d3.select("#sample-metadata1");
        oldStateMenu.html("");   
            
        //Select sample-metadata id using d3. This is where I will insert text for demographicData
        var StateMenu = d3.select("#sample-metadata1");

        var cell = StateMenu.append("h4");
        cell.text(`State: ${statename}`);

        var cell = StateMenu.append("h4");
        cell.text(`Year: ${year}`);

        var cell = StateMenu.append("p");
        cell.text(`Expanded Medicaid: ${expanded}`);

        var cell = StateMenu.append("p");
        cell.text(`Uninsured: ${uninsured}`);

        var cell = StateMenu.append("p");
        cell.text(`Disparity in Health Status: ${disparity}`);

        var cell = StateMenu.append("p");
        cell.text(`Primary Care Physicians: ${primaryphys}`);

        var cell = StateMenu.append("p");
        cell.text(`Infant Mortality: ${infantmort}`);

        var cell = StateMenu.append("p");
        cell.text(`Immunizations-Children: ${immunized}`);

        var cell = StateMenu.append("p");
        cell.text(`Premature Deaths: ${premature}`);

        var cell = StateMenu.append("p");
        cell.text(`Cancer Deaths: ${cancerdeaths}`);

        var cell = StateMenu.append("p");
        cell.text(`Cardiovascular Deaths: ${cardiodeaths}`);

        var cell = StateMenu.append("p");
        cell.text(`Drug Deaths: ${drugdeaths}`);
        
        var cell = StateMenu.append("p");
        cell.text(`Cholesterol Check: ${cholesterolcheck}`);

        var cell = StateMenu.append("p");
        cell.text(`Diabetes: ${diabetes}`);
      
        var cell = StateMenu.append("p");
        cell.text(`High Blood Pressure: ${bloodpressure}`);
                
});

};

//SECOND MENU FOR COMPARISON DATA

//Start building app.js file for extracting ACA data for Menu 2
var url = "/API/Data"

//DROPDOWN MENU POPULATING WITH STATE NAMES FROM DATA
//Extract samples data from json file.
d3.json(url).then(function(data) {

    //console.log(data);

    //Extract the ID numbers and use these to create a listing for the dropdown menu.
    var states = data.map(value => value.State);
    //console.log(states);

    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset2");

    //Initial state option should be "Texas"
    var cell = dropdownMenu.append("option");
    cell.text("Texas");

    //Loop through states for appending to dropdownMenu below "State"
    states.forEach(function(newSample) {

        //For each new sampleNumber, append a new row and text.
        var cell = dropdownMenu.append("option");
        cell.text(newSample);

        });
    
    //DROPDOWN MENU FOR POPULATING WITH YEAR DATA
    //Extract the years and use to create a listing for the year dropdown menu
    var year = data.map(value => value.Year);
    
    //Use D3 to select the dropdown menu
    var dropdownMenuYear = d3.select("#selDatayear2");

    //Initial Year should be 2019
    var cell = dropdownMenuYear.append("option");
    cell.text(2019);

    //If I just looped as above, there will be 50 lines for every year in the data.
    //Create an array, then append to that array, then remove duplicates!
    yearArray = [];

    year.forEach(function(newYear){
        yearArray.push(newYear);
    })
    //console.log(yearArray);

    uniqueYear = new Set(yearArray);
    //console.log(uniqueYear);

    //Loop through years and append to dropdown menu for below "Year"
    uniqueYear.forEach(function(uniqueYear) {
        //For each newYear, append a new row and year text
        var cell = dropdownMenuYear.append("option");
        cell.text(uniqueYear);
    });

    updateTable2();
    
    });


//EVENT HANDLER FOR DROPDOWN MENU UPDATE TABLE EVENT ON STATE
d3.select("#selDataset2").on("change", updateTable2);

//EVENT HANDLER FOR DROPDOWN MENU UPDATE TABLE EVENT ON YEAR
d3.select("#selDatayear2").on("change", updateTable2);

//updateTABLE FUNCTION
function updateTable2() {

    //Retrieve data from url /API/Data
    var url = "/API/Data"

    d3.json(url).then(function(data) {

    console.log(data);

    //DROPDOWN MENU SECTION
        //Select the #selDataset again to now use with all of the sampleNumbers available.
        var sampleMenu = d3.select("#selDataset2");

        //Select the #selDatayear2 to use the year.
        var sampleYear = d3.select("#selDatayear2");

        //Assign the value of the dropdown menu option to sampleID variable for data filtering.
        var pickedState2 = sampleMenu.property("value");
        console.log(pickedState2);

        //Assign the value of the dropdown year menu option to pickedYear variable for data filtering.
        var pickedYear2 = sampleYear.property("value");
        console.log(pickedYear2);

    //FILTERING THE DATA BY STATE AND YEAR
        //To filter the data to entries where the "State" is the desired state from pulldown menu.
        //Note that the == and not ===, the Year is a string search, but the array value is a number!
        var state = data.filter(value => value["State"] == pickedState2 && value["Year"] == pickedYear2);
        // console.log(data);
        // console.log(state);

        //To extract the state "Data" array from the state whose data we wanted from pulldown menu
        var statedata = state[0]["Data"];
        console.log(statedata);

        //Extract some data from the "Data" array
        var statename = statedata["State"]
        var year = statedata["Year"];
        var cancerdeaths = statedata["Cancer_Deaths_Value"];
        var cardiodeaths = statedata["Cardiovascular_Deaths_Value"];
        var cholesterolcheck = statedata["Cholesterol_Check_Value"];
        var diabetes = statedata["Diabetes_Value"];
        var disparity = statedata["Disparity_in_Health_Status_Value"];
        var drugdeaths = statedata["Drug_Deaths_Value"];
        var bloodpressure = statedata["High_Blood_Pressure_Value"];
        var infantmort = statedata["Infant_Mortality_Value"];
        var immunized = statedata["Immunizations_Children_Value"];
        var premature = statedata["Premature_Death_Value"];
        var primaryphys = statedata["Primary_Care_Physicians_Value"];
        var uninsured = statedata["Uninsured_Value"];
        var expanded = statedata["Medicaid_Expanded"];

        // console.log(data);
        // console.log(state);
        // console.log(statedata);
        // console.log(cardiodeaths);
        // console.log(diabetes);
        // console.log(infantmort);




        //Clear previous data in demographicMenu: Select in Line 1, Reassign to nothing in Line 2
        var oldStateMenu = d3.select("#sample-metadata2");
        oldStateMenu.html("");   
            
        //Select sample-metadata id using d3. This is where I will insert text for demographicData
        var StateMenu = d3.select("#sample-metadata2");

        var cell = StateMenu.append("h4");
        cell.text(`State: ${statename}`);

        var cell = StateMenu.append("h4");
        cell.text(`Year: ${year}`);

        var cell = StateMenu.append("p");
        cell.text(`Expanded Medicaid: ${expanded}`);

        var cell = StateMenu.append("p");
        cell.text(`Uninsured: ${uninsured}`);

        var cell = StateMenu.append("p");
        cell.text(`Disparity in Health Status: ${disparity}`);

        var cell = StateMenu.append("p");
        cell.text(`Primary Care Physicians: ${primaryphys}`);

        var cell = StateMenu.append("p");
        cell.text(`Infant Mortality: ${infantmort}`);

        var cell = StateMenu.append("p");
        cell.text(`Immunizations-Children: ${immunized}`);

        var cell = StateMenu.append("p");
        cell.text(`Premature Deaths: ${premature}`);

        var cell = StateMenu.append("p");
        cell.text(`Cancer Deaths: ${cancerdeaths}`);

        var cell = StateMenu.append("p");
        cell.text(`Cardiovascular Deaths: ${cardiodeaths}`);

        var cell = StateMenu.append("p");
        cell.text(`Drug Deaths: ${drugdeaths}`);
        
        var cell = StateMenu.append("p");
        cell.text(`Cholesterol Check: ${cholesterolcheck}`);

        var cell = StateMenu.append("p");
        cell.text(`Diabetes: ${diabetes}`);
      
        var cell = StateMenu.append("p");
        cell.text(`High Blood Pressure: ${bloodpressure}`);

                
});

};
