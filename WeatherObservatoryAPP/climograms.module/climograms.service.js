angular.module('WeatherApp').service("climogramsService", function ($http, $q, $timeout, API_URL) {

    this.dataFromPromise = function(){
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: API_URL + "climate/climograms"
        })
            .success(function (response) {
                var data = [];
                var año = new Date().getFullYear();

                for (mes in response) {
                    var date = año+"-"+mes
                    var precipitation = 0;
                    var temp = 0;
                    response[mes].forEach(function (value) {
                        precipitation += parseFloat(value.precipitation)
                        temp += parseFloat(value.temp)
                    })

                    temp = temp/response[mes].length
                    precipitation = precipitation/response[mes].length
                    data.push({"date": date,"temp":temp , "precipitation": precipitation})
                }

                deferred.resolve(data);
            });

        return deferred.promise;
    };

});
