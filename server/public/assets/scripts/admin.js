/**
 * Created by PaulZimmel on 11/8/15.
 */

//ADMIN JS page//
var myApp = angular.module('myApp', []);

myApp.controller("messageController", ["$scope", "$http", function($scope, $http){
    $scope.message = {};
    $scope.messageArray = [];

    $scope.submitMessage = function(typedMessage){
        console.log(typedMessage);
        $http.post("/data", typedMessage).then(function(response){
            console.log(response);
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
    //delete message with put call
    $scope.deleteMessage = function(someMessage){
        console.log(someMessage);
        $http.put('/admin/data',someMessage).then(function(response){
            console.log(response);
            $scope.getMessages();
        });
    };
    //$scope.deleteMessage = function(someMessage){
    //    console.log(someMessage);
    //    $http.delete('/admin/data/'+someMessage.id).then(function(response){
    //        console.log(response.data);
    //        $scope.getMessages();
    //        });
    //};

    $scope.getMessages();
}]);
