'use strict';

eliteApp.controller('standingController', ['$scope', 'eliteApi', function($scope, eliteApi) {
 
    
    var promise = eliteApi.getEliteData();
    promise.then(function(event) {
    $scope.standings = event.standings;
    }, function(event) {
        console.log(event);
        alert("Failed");
    });
   
    

    
}])