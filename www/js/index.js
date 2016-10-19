var application_key = "e6...69";
var client_key = "65...47";

var ncmb = new NCMB(application_key, client_key);

var app = {
  // Application Constructor
  initialize: function() {
      this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
      app.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
      app.wikitudePlugin.isDeviceSupported(app.onDeviceSupported, app.onDeviceNotSupported, [ "geo"]);
      app.receivedEvent('deviceready');
  },
  
  onDeviceSupported: function() {
  },
  onDeviceNotSupported: function(errorMessage) {
      alert(errorMessage);
  },
  onARExperienceLoadedSuccessful: function(loadedURL) {
      /* Respond to successful augmented reality experience loading if you need to */
  },
  onARExperienceLoadError: function(errorMessage) {
      alert('Loading AR web view failed: ' + errorMessage);
  },
      // Update DOM on a Received Event
  receivedEvent: function(id) {
      var parentElement = document.getElementById(id);
      var listeningElement = parentElement.querySelector('.listening');
      var receivedElement = parentElement.querySelector('.received');
      
      listeningElement.setAttribute('style', 'display:none;');
      receivedElement.setAttribute('style', 'display:block;');
      
      console.log('Received Event: ' + id);
  }
};

$(".open").on("click", function(e) {
  e.preventDefault();
  app.wikitudePlugin.loadARchitectWorld(
                                        app.onARExperienceLoadedSuccessful,
                                        app.onARExperienceLoadError,
                                        "www/ar.html",
                                        [ "geo"],
                                        {"camera_position": "back"}
                                        );
  
});

$(".register").on("click", function(e) {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition( function(position) {
    var geoPoint = new ncmb.GeoPoint(position.coords.latitude, position.coords.longitude);
    var WikitudeGeo = ncmb.DataStore("WikitudeGeo");
    var wikitudegeo = new WikitudeGeo();
    wikitudegeo.set("point", geoPoint);
    wikitudegeo.save()
      .then(function(obj) {
        alert("登録しました");
      })
      .catch(function(e) {
        alert(e);
      })
  },
  function(e) { alert(e);} , {enableHighAccuracy: true, maximumAge: 180000} ) ;
});

app.initialize();
