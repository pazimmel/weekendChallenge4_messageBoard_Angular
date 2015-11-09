/**
 * Created by PaulZimmel on 11/6/15.
 */

var myApp = angular.module('myApp', []);

myApp.controller("messageController", ["$scope", "$http", function($scope, $http){
    $scope.message = {};
    $scope.messageArray = [];

    $scope.submitMessage = function(typedMessage){
        //console.log(typedMessage);
        $http.post("/data", typedMessage).then(function(response){
            //console.log(response);
            $scope.message = {};
            $scope.getMessages();
        });
    };
    $scope.getMessages = function(){
        $http.get('/data').then(function(response){
            //console.log(response.data);
            $scope.messageArray = response.data;
            //console.log(messageArray.title);
        });
    };
    $scope.getMessages();
}]);


