'use strict';

angular.module('cortanaCert.date-filter', [])
	.filter("mydate", function() {
    var re = /\/Date\(([0-9]*)\)\//;
    return function(x) {
        //var m = x.match(re);
        var m = x;
        
        if( m ) return new Date(parseInt(m.substr(6)));
        else return null;
    };
});

angular.module('cortanaCert.date-filter', [])
	.filter("dtTicks", function() {
    var re = /\/Date\(([0-9]*)\)\//;
    return function(ticks) {
        //var m = x.match(re);
        ticks -= 621355968000000000;
    	ticks /= 10000;
     //   var m = (ticks – 621355968000000000) / 10000000;
        
        if( ticks ) return new Date(ticks);
        else return null;
    };
});