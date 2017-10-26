'use strict';

angular.module('cortanaCert.uc-filter', [])
    .filter('makeUppercase', function () {
  return function (item) {
    try{
		return encodeURI(item);
	}catch(err){
		return err;
	}
  };
});