var application_key = "e6...69";
var client_key = "65...47";

var ncmb = new NCMB(application_key, client_key);

var World = {
  init: function () {
    navigator.geolocation.getCurrentPosition( function(position) {
      var geoPoint = new ncmb.GeoPoint(position.coords.latitude, position.coords.longitude);
      var WikitudeGeo = ncmb.DataStore("WikitudeGeo");
      WikitudeGeo.withinKilometers("point", geoPoint, 1)
        .fetchAll()
        .then(function(ary) {
          
          var modelEarth = new AR.Model("assets/dragon_floating.wt3", {
                                        scale: {
                                          x: 0.001,
                                          y: 0.001,
                                          z: 0.001
                                        },
                                        rotate: {
                                          roll: 25,
                                          tilt: 50.0,
                                        }
                                      });
          for (var i in ary) {
            var geo = ary[i];
            var location = new AR.GeoLocation(geo.point.latitude, geo.point.longitude);
            console.log(location);
            var obj = new AR.GeoObject(location, {
                                        drawables: {
                                          cam: [modelEarth],
                                        }
                                      });
          }
        });
        
    });
  },
};

World.init();