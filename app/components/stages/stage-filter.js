'use strict';

angular.module('cortanaCert.stage-filter', [])
	.filter("stageName", function() {
    return function(stage) {
    	if( stage == 0 ) return "Development";
        else if( stage == 1 ) return "In Certification";
        else if( stage == 2 ) return "EnabledForSelf";
        else if( stage == 3 ) return "ProductionFlight";
        else if( stage == 4 ) return "Production";
        else if( stage == 5 ) return "Approved";
        else if( stage == 6 ) return "EnabledForGroup";
        else if( stage == 7 ) return "EnabledForTenant";
        else return stage;
    };
});