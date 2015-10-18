'use strict';

eliteApp.controller('gameController', ['$scope', 'eliteApi','$stateParams', function($scope, eliteApi, $stateParams) {
 
    $scope.gameId = Number($stateParams.id);
    var promise = eliteApi.getEliteData();
    promise.then(function(event) {
    $scope.game = _.find(event.games,{"id": $scope.gameId});
    }, function(event) {
        console.log(event);
        alert("Failed");
    });
   
    

    
}])