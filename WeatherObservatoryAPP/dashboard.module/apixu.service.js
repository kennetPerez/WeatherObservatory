angular.module('WeatherApp').service("ApixuService", function ($http, $q) {

    var defered = $q.defer();
    var promise = defered.promise;
    var res = {};

    this.get = function (lat, lon) {

        $http({
            method: 'GET',
            url: "http://api.apixu.com/v1/forecast.json?key=02c94d02506a4d92b0a165013160803&q="+lat+","+lon+"&days=1"
        })
            .success(function (response) {

            res.climate = {'date':response.location.localtime,
                           'weatherText': response.current.condition.text,
                           'iconURL': response.current.condition.icon,
                           'windKmH': response.current.wind_kph,
                           'windDir': response.current.wind_dir,
                           'temp': response.current.temp_c,
                           'humidity': response.current.humidity,
                           'precipitation': response.current.precip_mm,
                           'pressure': response.current.pressure_mb,
                           'feelslike': response.current.feelslike_c,
                          };

            var ast = response.forecast.forecastday[0].astro;

            res.astronomic =  {'sunrise': (ast.sunrise.slice(6, 8) == 'PM' ? ( ( parseInt(ast.sunrise.slice(0, 2)) + 12 ) + ast.sunrise.slice(2, 5)) : ast.sunrise.slice(0, 5)),
                               'sunset': (ast.sunset.slice(6, 8) == 'PM' ? ( ( parseInt(ast.sunset.slice(0, 2)) + 12 ) + ast.sunset.slice(2, 5)) : ast.sunset.slice(0, 5)),
                               'moonrise': (ast.moonrise.slice(6, 8) == 'PM' ? ( ( parseInt(ast.moonrise.slice(0, 2)) + 12 ) + ast.moonrise.slice(2, 5)) : ast.moonrise.slice(0, 5)),
                               'moonset': (ast.moonset.slice(6, 8) == 'PM' ? ( ( parseInt(ast.moonset.slice(0, 2)) + 12 ) + ast.moonset.slice(2, 5)) : ast.moonset.slice(0, 5))
                              };

            defered.resolve(res);
        });

        return promise;
    }
});
