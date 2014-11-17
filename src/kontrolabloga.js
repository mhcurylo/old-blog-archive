var kontrolabloga = angular.module('kontrolabloga', []);

kontrolabloga.controller('LekturaController', ['$scope', '$http', '$routeParams',  function ($scope, $http, $routeParams) {
    $scope.xyz = $routeParams.tytul;
    $scope.lektura = [];
    $scope.gowno = [11111,2222,3333];
    $http.get('teksty/teksty.json').success(function (jsondata) {jsondata.forEach( function (txt) {
                                                                           $http.head(txt.tresc).success(function(data, status, headers, config) {txt.data = new Date(headers('Last-modified'));  if (txt.tytul == $routeParams.tytul){$scope.lektura = txt; };});  });
                                                                 });

   }]);

kontrolabloga.controller('TekstyController', ['$scope', '$http', function ($scope, $http) {
  $scope.teksty = [];
  $scope.tagi = [];
  $scope.tlo = '';
  var elementytla = [['░', '▒', '▓','▓', '​'], ['░', '▒','▒', '▓', '​'], ['╦', '╬', '╩','╦', '╬', '╩', '​'], ['║', '│', '║', '│', '​'], ['└','┌','┐','┘','├','┤','┬','┴','┼','​'], ['▄', '█', '▀','​']];
  var typtla = Math.floor(Math.random() * elementytla.length);
  for (var i = 0; i < 10000; i++) {
    $scope.tlo += elementytla[typtla][Math.floor(Math.random() * elementytla[typtla].length)];
   };
    
   $http.get('teksty/teksty.json').success(function (jsondata) {$scope.teksty = jsondata;
                                                                $scope.teksty.forEach( function (tekst){tekst.otwarty = true;
                                                                                                       $http.head(tekst.tresc).success(function(data, status, headers, config) {tekst.data = new Date(headers('Last-modified'))});              });
                                                                    
                                                                   $scope.teksty.forEach(function sprawdztagi(tekst) {
                                                                      tekst.tagi.forEach(function zmientaga(tag) {
                                                                     if ($scope.tagi.indexOf(tag)==-1){
                                                                          $scope.tagi.push(tag);
                                                                      };  
                                                                  });
                                                                 });
                                                                });

    
    $scope.autorzy = [];   
    $http.get('teksty/autorzy.json').success(function (jsondata){$scope.autorzy = jsondata});
    
    $scope.appendixy = {'napisy': ['Medium jest masarzem.', 'Blog o filozofii i mediach.', 'Blog PosTTransNeoHumanistyczny.']};
    $http.get('teksty/cojestem.json').success(function (jsondata){$scope.appendixy.napisy = jsondata});
    
    
    $scope.appendixy.losuj = function (){
        $scope.appendixy.wybrany = $scope.appendixy.napisy[Math.ceil(Math.random()*$scope.appendixy.napisy.length)-1];};
    
  $scope.porzadek = {'wybrany':'-data',
                     'opcje': [{wartosc:'-data',nazwa:'Nowsze'}, {wartosc:'data', nazwa: 'Starsze'}]};
  $scope.porzadek.przyjmowane = [];    
  $scope.porzadek.opcje.forEach(function(opcja){$scope.porzadek.przyjmowane.push(opcja.wartosc)});
  
  
  $scope.filtry= {'autor': [], 'tagi': [], 'styl': {'tagi':{'przyjmowane':['lub','i'], 'wybrany':'lub'}}};    
    
    
  $scope.menushow = {'data': false, 'autor': false, 'temat': false, 'appendix': false, 'sercz': false};
  $scope.pokazall = true;
   $scope.$watch('pokazall', function (){ 
      if (($scope.pokazall != true) && ($scope.pokazall != false)) {$scope.pokazall=true};
      $scope.teksty.forEach(function oo(tekst) {tekst.otwarty = $scope.pokazall});  
   });
   $scope.$watch('porzadek.wybrany', function (){
      if ($scope.porzadek.przyjmowane.indexOf($scope.porzadek.wybrany) == -1) {$scope.porzadek.wybrany='data'}});
   $scope.$watch('filtry.styl.tagi.wybrany', function (){
      if ($scope.filtry.styl.tagi.przyjmowane.indexOf($scope.filtry.styl.tagi.wybrany) == -1) {$scope.filtry.styl.tagi.wybrany='lub'}});
    
   $scope.toggle = function(i) {
       $scope.menushow[i] ^= true;
   };
    $scope.otworz = function(i) {
      i.otwarty ^= true;
   };
     $scope.otworzall = function() {
      $scope.pokazall ^= true;
   };
    
  $scope.porownajtekst = function(tekst) {
      var lub = false;
      var i = true;
      
      if ($scope.filtry.autor.length>0) {
                $scope.filtry.autor.forEach(function(autora){tekst.autor.forEach(function(autorb){if (autora == autorb) {lub=true}})})
                if (lub==false) {return false}
                };
      
      lub = false;
      i = true;
      if ($scope.filtry.tagi.length>0)  {
                var podobne = false;
                 $scope.filtry.tagi.forEach(function(tagia){
                     podobne = false;
                     tekst.tagi.forEach(function(tagib){
                         if (tagia == tagib) {podobne = true};
                     });
                     if (podobne == true) {lub = true} else {i = false};
                 });
                if (($scope.filtry.styl.tagi.wybrany=='i') && (i==false)) {return false};
                if (lub==false) {return false};
                } 
                    else {lub = true};
      return lub;
  };    
}]);
