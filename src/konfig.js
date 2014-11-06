var Masarnia = angular.module('Masarnia', ['ngSelect', 'yaru22.md', 'ngRoute', 'kontrolabloga']);

Masarnia.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'sercz.html',
        controller: 'TekstyController'
      }).
      when('/teksty/:tytul', {
        templateUrl: 'lektura.html',
        controller: 'LekturaController',
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);
