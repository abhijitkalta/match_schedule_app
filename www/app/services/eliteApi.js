'use strict';

eliteApp.factory('eliteApi', function($resource, $q, $ionicLoading, CacheFactory) {
    var resource = $resource('http://elite-schedule.net/api/leaguedata/2009');
    var leagueDataCache = CacheFactory.get('leagueDataCache')
    
    leagueDataCache.setOptions({
        onExpire : function(key,value){
        getEliteData()
        .then(function(){
            console.log("Refreshed Automatically" + Date());
        
        }, function(){
             console.log("Setting old key value" + Date());
            leagueDataCache.put(key,value);
        });
      }
    });
    //  /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security    //use this for cross origin domain sharing
    
    function getEliteData(forceRefresh) { 
        if(typeof forceRefresh === undefined){forceRefresh = false};
        var deferred = $q.defer(),
            cacheKey = 'leagueData',
            leaguesData = null;
        
        if(!forceRefresh){
            leaguesData = leagueDataCache.get(cacheKey);
        }
        
        if(leaguesData){
            console.log("Cached");
             deferred.resolve(leaguesData); 
          }
          else{
        $ionicLoading.show({
            template : "<ion-spinner icon='bubbles'></ion-spinner>"
            });
        
        resource.get().
        $promise.then( function(response) {
        $ionicLoading.hide();
        leagueDataCache.put(cacheKey,response);
        deferred.resolve(response);
        }, function(response) {
         $ionicLoading.hide();
        deferred.reject(response);
       });
          }
       return deferred.promise;  
    }
    
    return {
    getEliteData : getEliteData 
    }


});



   