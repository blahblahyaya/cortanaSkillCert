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