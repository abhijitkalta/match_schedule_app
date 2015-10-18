'use strict';
var eliteApp = angular.module('eliteApp',['ionic','ui.router','ngRoute','ngResource','angular-cache','uiGmapgoogle-maps'])

.run(function($ionicPlatform, CacheFactory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    CacheFactory('leaguesCache', {maxAge: 5000 , deleteOnExpire: 'aggressive', storageMode : 'localStorage'});
    CacheFactory('myTeamsCache', {maxAge: 5000 , deleteOnExpire: 'aggressive', storageMode : 'localStorage'});
    CacheFactory('leagueDataCache', {maxAge: 60 * 1000 , deleteOnExpire: 'aggressive', storageMode : 'localStorage'});
    CacheFactory('staticCache', {maxAge: 5000 , deleteOnExpire: 'aggressive', storageMode : 'localStorage'});

})
})

.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/app/locations");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      abstract: true,
      url: "/home",
      templateUrl: "app/home/home.html"
    }) 
    
    .state('home.leagues', {
      url: "/leagues",
      views: {
        "tab-leagues": 
        { templateUrl: "app/home/leagues.html" }
      }
    })
    

    .state('home.myteams', {
      url: "/myteams",
      views: {
        "tab-myteams": 
          { templateUrl: "app/home/myteams.html" }
      }
    })
 
    .state('app', {
      abstract: true,
      url: "/app",
      templateUrl: "app/layout/menu-layout.html"
    }) 
    
    .state('app.teams', {
      url: "/teams",
      views: {
        "mainContent": 
          { templateUrl: "app/teams/teams.html" }
      }
    })
  
    .state('app.team-detail', {
      url: "/teams/:id",
      resolve: {
            message: function(eliteApi){
                return eliteApi.getEliteData();
        }},
      views: {
        "mainContent": 
          { templateUrl: "app/teams/team-detail.html",
            controller: 'teamDetailController'
          }
      }
    })
  
  .state('app.game', {
      url: "/game/:id",
      views: {
        "mainContent": 
          { templateUrl: "app/game/game.html" }
      }
    })
  
  .state('app.locations', {
      url: "/locations",
      views: {
        "mainContent": 
          { templateUrl: "app/locations/locations.html" }
      }
    })
  
  .state('app.location-map', {
      url: "/location-map/:id",
      views: {
        "mainContent": 
          { templateUrl: "app/locations/location-map.html" }
      }
    })
  
  .state('app.rules', {
      url: "/rules",
      views: {
        "mainContent": 
          { templateUrl: "app/rules/rules.html" }
      }
    })
  
  .state('app.standings', {
      url: "/standings",
      views: {
        "mainContent": 
          { templateUrl: "app/standings/standings.html" }
      }
    });
})

.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDrMhI3Qn4AAw4NXm-TElXThDxu3T4CY64',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
})
