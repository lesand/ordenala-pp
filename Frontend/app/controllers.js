'use strict';
app
.controller('HomeController', function($scope) {
 $scope.items = [];

 var item = {
 	name:'Baleada 1',
 	lat: 15.98,
 	lon: -86.98
 };
 var item2 = {
 	name:'Baleada 2',
 	lat: 15.98,
 	lon: -86.98
 };

 var item3 = {
 	name:'Baleada 3',
 	lat: 15.98,
 	lon: -86.98
 };

 var item4 = {
 	name:'Baleada 4',
 	lat: 15.98,
 	lon: -86.98
 };


 var item5 = {
 	name:'Baleada 5',
 	lat: 15.98,
 	lon: -86.98
 };

$scope.items.push(item);
$scope.items.push(item2);
$scope.items.push(item3);
$scope.items.push(item4);
$scope.items.push(item5);


});

app.controller('PrincipalController', function($scope) {

$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

   /*$scope.mapCreated = function(map) {
    $scope.map = map;
  };

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };*/

});
