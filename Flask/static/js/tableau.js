
    function initViz() {
        // Health Factor Relationship and Demographics
        var containerDiv = document.getElementById("vizContainer"),
            url = "https://public.tableau.com/views/HealthFactorsRelationshipandDemographics-AccesstoAdequateFood/RelationshipbetweenAccesstoAdequateFoodandUnhealthyBehaviours?:display_count=y&:origin=viz_share_link",
            options = {
                hideTabs: true,
                onFirstInteractive: function () {
                    console.log("Run this code when the viz has finished loading.");
                }
            };

        var viz = new tableau.Viz(containerDiv, url, options);
        // Create a viz object and embed it in the container div.

        // var viz = new tableau.Viz(containerOutcomes, url, options);
        // Create a viz object and embed it in the container div.
    }