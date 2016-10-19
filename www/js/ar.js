var application_key = "e6..69";
var client_key = "65..47";

var ncmb = new NCMB(application_key, client_key);


var World = {
  init: function () {
    
    var PoiRadar = {
      hide: function hideFn() {
          AR.radar.enabled = false;
      },
      show: function initFn() {
          // the div defined in the index.htm
          AR.radar.container = document.getElementById("radarContainer");
          // set the back-ground image for the radar
          AR.radar.background = new AR.ImageResource("assets/radar_bg.png");
          // set the north-indicator image for the radar 
          // (not necessary if you don't want to display a north-indicator)
          AR.radar.northIndicator.image = new AR.ImageResource("assets/radar_north.png");
          // center of north indicator and radar-points in the radar asset, 
          // usually center of radar is in the exact middle of the background, 
          // meaning 50% X and 50% Y axis --> 0.5 for centerX/centerY
          AR.radar.centerX = 0.5;
          AR.radar.centerY = 0.5;
          AR.radar.radius = 0.3;
          AR.radar.northIndicator.radius = 0.0;
          AR.radar.enabled = true;
      },

      updatePosition: function updatePositionFn() {
          if (AR.radar.enabled) {
              AR.radar.notifyUpdateRadarPosition();
          }
      },
      setMaxDistance: function setMaxDistanceFn(maxDistanceMeters) {
          AR.radar.maxDistance = maxDistanceMeters;
      }
    };
    PoiRadar.show();
    
    radarCircle = new AR.Circle(0.03, {
        horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.CENTER,
        opacity: 0.8,
        style: {
            fillColor: "#ffffff"
        }
    }); 
    radardrawables = [];
    radardrawables.push(radarCircle);
    
    navigator.geolocation.getCurrentPosition( function(position) {
      console.log(position);
      var geoPoint = new ncmb.GeoPoint(position.coords.latitude, position.coords.longitude);
      var WikitudeGeo = ncmb.DataStore("WikitudeGeo");
      WikitudeGeo.withinKilometers("point", geoPoint, 1)
        .fetchAll()
        .then(function(ary) {
          console.log(ary);
          
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
                                          radar: radardrawables
                                        }
                                      });
          }
        });
        
    });
  },
};

World.init();