//FIRST MENU FOR COMPARISON DATA

//Start building app.js file for extracting ACA data for Menu 1
var url = "/API/Data/County"

//DROPDOWN MENU POPULATING WITH STATE NAMES FROM DATA
//Extract samples data from json file.
d3.json(url).then(function(data) {

    //console.log(data);

    //Extract the states and use these to create a listing for the state dropdown menu.
    var states = data.map(value => value.State);
    // console.log(states);

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
    var county = data.map(value => value.County);
    console.log(county);
    
    //Use D3 to select the dropdown menu
    var dropdownMenuCounty = d3.select("#selDatayear1");

    //Initial option should be 2019
    var cell = dropdownMenuCounty.append("option");
    // cell.text("Orange");

    //If I just looped as above, there will be 52 lines for every year in the data.
    //Create an array, then append to that array, then remove duplicates!
    countyArray = [];

    county.forEach(function(newCounty){
        countyArray.push(newCounty);
    })
    //console.log(countyArray);

    uniqueCounty = new Set(countyArray);
    console.log(uniqueCounty);

    //Loop through years and append to dropdown menu for below "Year"
    uniqueCounty.forEach(function(uniqueCounty) {
        //For each newYear, append a new row and year text
        var cell = dropdownMenuCounty.append("option");
        cell.text(uniqueCounty);
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
    var url = "/API/Data/County"

    d3.json(url).then(function(data) {
    console.log(data);

    //DROPDOWN MENU SECTION
        //Select the #selDataset again to now use with all of the state names available.
        var sampleMenu = d3.select("#selDataset1");

        //Select the #selDatayear1 to use the year.
        var sampleCounty = d3.select("#selDatayear1");

        //Assign the value of the dropdown state menu option to pickedState variable for data filtering.
        var pickedState1 = sampleMenu.property("value");
        console.log(pickedState1);

        //Assign the value of the dropdown year menu option to pickedYear variable for data filtering.
        var pickedCounty = sampleCounty.property("value");
        console.log(pickedCounty);

    //FILTERING BY MENU SELECTION
        //To filter the data to entries where the "County" is the desired county from pulldown menu.
        //Note that the == and not ===, the Year is a string search, but the array value is a number!
        //Set year to 2020 data to reflect most recent year of data.
        var county = data.filter(value => value["State"] == pickedState1 && value["County"] == pickedYear1 && value["Year"] == 2020);
        console.log(county);

        //To extract the state "Data" array from the state whose data we wanted from pulldown menu
        var countydata = county[0]["Data"];
        console.log(countydata);

        //Extract some data from the "Data" array
        var smoker = countydata["Percent_Adult_Smokers"]
        var mortality = countydata["Premature_Age_Adjusted_Mortality_per_100Kue"];
        var uninsured = countydata["Percent_Ppl_Under65_w/o_Insurance"];
        var childPoverty = countydata["Percent_Children_Living_in_Poverty"];
        var ethnicMinority = countydata["Percent_Non-Hispanic_Black_or_African_American"] + countydata["Percent_American_Indian_or_Alaskan_Native"] + countydata["Percent_Asian"] + countydata["Percent_Native_Hawaiian_Other_Pacific_Islander"] + countydata["Percent_Hispanic"];
        var teenBirthRate = countydata["Teen_Birth_Rate"];
        var graduationRate = countydata["Graduation_Rate"];
        var medianHouseholdIncome = countydata["Median_Household_Income"];
        var lackFoodAccess = countydata["Percent_Pop_w/o_Adequate_Access_to_Food"];
        var lowBirthWt = countydata["Percent_Low_Birthweight_Births"];

        
        // console.log(data);
        // console.log(state);
        // console.log(statedata);


        //Clear previous data in demographicMenu: Select in Line 1, Reassign to nothing in Line 2
        var oldStateMenu = d3.select("#sample-metadata1");
        oldStateMenu.html("");   
            
        //Select sample-metadata id using d3. This is where I will insert text for demographicData
        var StateMenu = d3.select("#sample-metadata1");

            var cell = StateMenu.append("p");
            cell.text(`Percent Smokers: ${smoker}`);

            var cell = StateMenu.append("p");
            cell.text(`Premature Deaths (100K): ${mortality}`);

            var cell = StateMenu.append("p");
            cell.text(`Uninsured: ${uninsured}`);
            
            var cell = StateMenu.append("p");
            cell.text(`Children in Poverty: ${childPoverty}`);

            var cell = StateMenu.append("p");
            cell.text(`Percent Ethnic Minority: ${ethnicMinority}`);

            var cell = StateMenu.append("p");
            cell.text(`Teen Births: ${teenBirthRate}`);

            var cell = StateMenu.append("p");
            cell.text(`Graduation Rate: ${graduationRate}`);

            var cell = StateMenu.append("p");
            cell.text(`Median Household Income: ${medianHouseholdIncome}`);

            var cell = StateMenu.append("p");
            cell.text(`Food Insecurity: ${lackFoodAccess}`);

            var cell = StateMenu.append("p");
            cell.text(`Low Birthweight Births: ${lowBirthWt}`);
                
});

};

