angular.module('WeatherApp').service("locationServive", function ($q) {

    var defered = $q.defer();
    var promise = defered.promise;

    this.getLocation = function() {
        if (navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(this.showPosition);
            return promise;
        }
        else
        {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    this.showPosition = function(position) {
        defered.resolve({lat:position.coords.latitude, lon:position.coords.longitude});
    }

});
