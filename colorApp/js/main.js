var myApp = angular.module('myModule', []);

var colorArray = ['blue', 'green', 'black', 'pink', 'red', 'yellow'];

myApp.controller('colorController', ['$scope', function($scope) {
  $scope.greeting = 'Hola!';
  $scope.color = colorArray;
}]);