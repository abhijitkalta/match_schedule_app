'use strict';

eliteApp.controller('locationMapController', ['$scope', '$stateParams','uiGmapGoogleMapApi','eliteApi', function($scope, $stateParams, uiGmapGoogleMapApi, eliteApi) {
 
    
   
   $scope.locationId = Number($stateParams.id);
   $scope.markers = {};
   
    uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = { center: 
                 { latitude: 45, 
                   longitude: -73 }, 
                 zoom: 8 
                };
   
    
    var promise = eliteApi.getEliteData();
    promise.then(function(event) {
        
        $scope.location = _.find(event.locations, {'id': $scope.locationId});
        console.log($scope.location);
        $scope.marker = {
            id : $scope.locationId,
            latitude : $scope.location.latitude,
            longitude : $scope.location.longitude,
            title : $scope.location.name,
//            options: {labelClass:'marker_labels',labelAnchor:'12 60',labelContent:'m'},
            showWindow : true
        };
      
        $scope.map.center.latitude = $scope.location.latitude;
        $scope.map.center.longitude = $scope.location.longitude;
       
    }, function(event) {
        console.log(event);
        alert("Failed");
    });
  }); 
}])