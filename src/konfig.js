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
      when('/akceleratorlist', {
        templateUrl: 'akceleratorlist.html',
        controller: 'AkceleratorCtrl',
        controllerAs: 'ctrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);
