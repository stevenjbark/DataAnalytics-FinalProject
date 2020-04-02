//Start building app.js file for extracting data
//Retrieve data from url /API/Data

    var url1 = "/API/Data/State"
    var url2 = "/API/Data/County"

	var Data1 = d3.json(url1).then(function(data){
        console.log(data);
    
    })

    var Data2 = d3.json(url2).then(function(data){
        console.log(data);
    
	});