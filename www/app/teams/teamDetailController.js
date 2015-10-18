'use strict';

eliteApp.controller('teamDetailController', ['$scope','$stateParams', 'eliteApi','$ionicPopup','message', function teamDetailController($scope,$stateParams, eliteApi, $ionicPopup,message) {
        
        
        //console.log("$stateParams", $stateParams);
        $scope.teamId = Number($stateParams.id);
        
        var event = message;
        $scope.teams = event.teams;
        $scope.games1 = event.games;
        $scope.standings = event.standings;
//        promise.then(function(event) {
//            $scope.teams = event.teams;
//            $scope.games1 = event.games;
//            $scope.standings = event.standings;
//            }, function(event) {
//            console.log(event);
//            alert("Failed");
//        });
        
        
//        var team = _.chain(event.teams)
//                    .flatten("divisionTeams")
//                    .find({ "id": $scope.teamId })
//                    .value();
        $scope.teamName= _.find(_.flattenDeep(_.pluck(event.teams,"divisionTeams")),{ "id": $scope.teamId }).name;
        
        $scope.games = _.chain($scope.games1)
                    .filter(isTeamInGame)
                    .map(function (item) {
                        var isTeam1 = (item.team1Id === $scope.teamId ? true : false);
                        var opponentName = isTeam1 ? item.team2 : item.team1;
                        var scoreDisplay = getScoreDisplay(isTeam1, item.team1Score, item.team2Score);
                        return {
                            gameId: item.id,
                            opponent: opponentName,
                            time: item.time,
                            location: item.location,
                            locationUrl: item.locationUrl,
                            scoreDisplay: scoreDisplay,
                            homeAway: (isTeam1 ? "vs." : "at")
                        };
                    })
                    .value();
        

        $scope.teamStanding = _.chain($scope.standings)
                           .flatten("divisionStandings")
                           .find({ "teamId": $scope.teamId })
                           .value();

        $scope.following = false;

        $scope.toggleFollow = function(){

            if ($scope.following) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Unfollow?',
                    template: 'Are you sure you want to unfollow?'
                });
                confirmPopup.then(function(res) {
                    if(res) {
                        $scope.following = !$scope.following;
                    }
                });
            } else{
                 $scope.following = !$scope.following;
            }
        };


        function isTeamInGame(item){
            return item.team1Id === $scope.teamId || item.team2Id === $scope.teamId;
        };

        function getScoreDisplay(isTeam1, team1Score, team2Score) {
            if (team1Score && team2Score) {
                var teamScore = (isTeam1 ? team1Score : team2Score);
                var opponentScore = (isTeam1 ? team2Score : team1Score);
                var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
                return winIndicator + teamScore + "-" + opponentScore;
            }
            else {
                return "";
            }
        };
    }]);


