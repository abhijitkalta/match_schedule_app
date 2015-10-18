'use strict';

eliteApp.controller('teamController', ['$scope', 'eliteApi', function($scope, eliteApi) {
 
    $scope.loadList = function(forceRefresh){
    var promise = eliteApi.getEliteData(forceRefresh);
    promise.then(function(event) {
    $scope.teams = event.teams;
    }, function(event) {
        console.log(event);
        alert("Failed");
    }).finally(function(){
        $scope.$broadcast('scroll.refreshComplete');
        });
    };
    
    $scope.loadList(false);
}])