'use strict';

eliteApp.controller('leagueController', ['$scope', 'eliteApi', function($scope, eliteApi) {
 
    
    var promise = eliteApi.getEliteData;
    promise.then(function(event) {
    $scope;
    }, function(event) {
        console.log(event);
        alert("Failed");
    });
   
    

    
}])