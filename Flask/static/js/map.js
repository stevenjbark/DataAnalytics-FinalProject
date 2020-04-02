
var urlMap = "/API/Data/MapData"

var state_abbr = { 'Alaska': 'AK', 'Alabama': 'AL', 'Arkansas': 'AR', 'American Samoa': 'AS', 'Arizona': 'AZ', 'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT', 'District of Columbia': 'DC', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA', 'Guam': 'GU', 'Hawaii': 'HI', 'Iowa': 'IA', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Massachusetts': 'MA', 'Maryland': 'MD', 'Maine': 'ME', 'Michigan': 'MI', 'Minnesota': 'MN', 'Missouri': 'MO', 'Northern Mariana Islands': 'MP', 'Mississippi': 'MS', 'Montana': 'MT', 'National': 'NA', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Nebraska': 'NE', 'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'Nevada': 'NV', 'New York': 'NY', 'Ohio': 'OH', 'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Puerto Rico': 'PR', 'Rhode Island': 'RI', 'South Carolina': 'SC', 'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Virginia': 'VA', 'Virgin Islands': 'VI', 'Vermont': 'VT', 'Washington': 'WA', 'Wisconsin': 'WI', 'West Virginia': 'WV', 'Wyoming': 'WY' }


//EVENT HANDLER FOR DROPDOWN MENU UPDATE BUILDMAP EVENT: INTERACTIVE PLOTS
d3.select("#selChoroYear").on("change", buildMap);



function buildMap() {


  d3.json(urlMap).then(function (data) {
    console.log(data);

    //Select the #selChoroyear to use the year.
    var choroYear = d3.select("#selChoroYear");

    //Assign the value of the dropdown year menu option to pickedYear variable for data filtering.
    var filterYear = choroYear.property("value");
    console.log(filterYear);

    //Filtering the data by the filterYear
    data.filter(value => value[`${filterYear}`] == filterYear)
    

    // Declaring Variables for Choropleth
    var filteredData = data[0][filterYear];
    var ranks = filteredData.map(d => d['All_Determinants_Rank']);
    var state_codes = filteredData.map(d => state_abbr[d['State']]);
    var states = filteredData.map(d => d['State']);
    
    // Creating Choropleth
    var data = [{
      type: 'choropleth',
      locationmode: 'USA-states',
      locations: state_codes,
      z: ranks,
      text: states,
      colorscale: [
        [0, 'rgb(0,0,225)'], [0.2, 'rgb(51,153,255)'],
        [0.4, 'rgb(102,204,255)'], [0.6, 'rgb(153,204,255)'],
        [0.8, 'rgb(204,204,255)'], [1, 'rgb(255,255,255)']
      ],
      colorbar: {
        title: 'Health Ranking',
        thickness: 12
    },
    marker: {
        line:{
            color: 'rgb(255,255,255)',
            width: 1
        }
    }
    }];

    var layout = {
      title: 'State Health Ranking By Year',
      geo: {
        scope: 'usa',
        countrycolor: 'rgb(252,141,89)',
        showland: true,
        landcolor: 'rgb(255,255,191)',
        showlakes: true,
        lakecolor: 'rgb(255, 255, 255)',
        subunitcolor: 'rgb(145,191,219)',
        lonaxis: {},
        lataxis: {},
        marker: 'green'

      }
    }
    Plotly.newPlot("map", data, layout, { showLink: false });

  });

};

buildMap(2019);
