'use strict';

eliteApp.controller('locationController', ['$scope', 'eliteApi', function($scope, eliteApi) {
 
    
    var promise = eliteApi.getEliteData();
    promise.then(function(event) {
    
    $scope.location = event.locations;
    }, function(event) {
        console.log(event);
        alert("Failed");
    });
   
    

    
}])