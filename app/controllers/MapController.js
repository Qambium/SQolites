SQolites.controller('MapController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http){

  // $scope.map = {
  //
  //   layers : L.FeatureGroup([])
  //
  //
  // };

  $scope.config = {
    forets : [],
    couches : [],
    data : []
  };


  var satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={token}', {
    id : 'satellite-streets-v9',
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    token : 'pk.eyJ1IjoibWFyY3VzMzAiLCJhIjoiMEpkelY2MCJ9.1UcP37Y9h40RGC7LRaFLaQ'
  });

  var outdoor = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={token}', {
    id : 'outdoors-v9',
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    token : 'pk.eyJ1IjoibWFyY3VzMzAiLCJhIjoiMEpkelY2MCJ9.1UcP37Y9h40RGC7LRaFLaQ'
  });

  var onf_f = L.tileLayer.wms('http://ws.carmencarto.fr/WMS/105/ONF_Forets?', {
    layers: 'FOR_PUBL_FR',
    format : 'image/png',
    transparent : true
  });

  var onf_p = L.tileLayer.wms('http://ws.carmencarto.fr/WMS/105/ONF_Forets?', {
    layers: 'PARC_PUBL_FR',
    format : 'image/png',
    transparent : true
  });

  $scope.map =  L.map('map', [satellite, outdoor]);

  $scope.layers = L.featureGroup();
  $scope.layers.addTo($scope.map);

  $scope.$watch('foret', function(foret){
    $scope.config.forets.forEach(function(f){
      if(f.code == foret){
        $scope.map.setView(L.latLng(f.center), 15);
      }
    });
  });

  $scope.$watch('fond', function(fond){
    switch (fond) {
      case 'satellite':
        outdoor.remove();
        satellite.addTo($scope.map);
        // De façon à ce que le fond de carte
        // ne soit pas au dessus du wms.
        satellite.bringToBack();
        break;
      case 'outdoor':
        satellite.remove();
        outdoor.addTo($scope.map);
        // De façon à ce que le fond de carte
        // ne soit pas au dessus du wms.
        outdoor.bringToBack();
        break;
    }
  });

  $scope.$watch('showONFForets', function(showONFForets){
    if(showONFForets){
      onf_f.addTo($scope.map);
    } else {
      onf_f.remove();
    }
  });

  $scope.$watch('showONFParcelles', function(showONFParcelles){
    if(showONFParcelles){
      onf_p.addTo($scope.map);
    } else {
      onf_p.remove();
    }
  });



  $scope.updateCouches = function(){

    console.log('---');

    $scope.layers.clearLayers();
    var layers = {type : 'FeatureCollection', features : []};

    $scope.config.couches.forEach(function(couche){
      if(couche.display){
        console.log('Afficher  : ' + couche.nom);

        $scope.config.data.forEach(function(feature){
          if(feature.properties['PERIODE'] == couche.code){
            layers.features.push(feature);
          }
        });
      }
    });

    L.geoJSON(layers, {
      style : function(feature){
        var style = {};
        style.color = $scope.config.couleurs[feature.properties['PERIODE']];
        style.fillOpacity = 1;
        style.fillColor = style.color;
        return style;
      },
      pointToLayer : function(geoJsonPoint, latlng) {
        console.log(latlng);
        return L.circle(latlng, {radius: 10}); // L.circleMarker(latlng, 1);
      },
      onEachFeature : function(feature, layer){
        $scope.layers.addLayer(layer);
      }
    });

  }



  // Chargement de la configuration.
  $http({
    method: 'GET',
    url: 'config.json'
  }).then(function successCallback(response) {
    $scope.config = response.data;



    // Chargement des données.
    $http({
      method: 'GET',
      url: 'data.geojson'
    }).then(function successCallback(response) {

      $scope.config.data = response.data.features;

      $scope.foret = $scope.config.forets[0].code;
      $scope.config.couches[0].display = true;
      $scope.updateCouches();
      $scope.fond = 'outdoor';
      $scope.showONFParcelles = true;

    }, function errorCallback(response) {
      console.err(response);
    });

  }, function errorCallback(response) {
    console.err(response);
  });






}]);
