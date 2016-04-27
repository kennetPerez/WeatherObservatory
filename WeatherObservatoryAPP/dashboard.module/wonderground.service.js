angular.module('WeatherApp').service("WondergroundService", function ($http, $q) {

    var defered = $q.defer();
    var promise = defered.promise;

    var res = {};

    this.get = function (lat, lon) {

        var conditions = undefined;
        var astronomic = undefined;

        $http({
            method: 'GET',
            url: "http://api.wunderground.com/api/073663611ee62e30/conditions/lang:SP/q/"+lat+","+lon+".json"
        })
            .success(function (response) {
            conditions = response;

            $http({
                method: 'GET',
                url: "http://api.wunderground.com/api/073663611ee62e30/astronomy/lang:SP/q/"+lat+","+lon+".json"
            })
                .success(function (response) {
                astronomic = response;
                cond(conditions);
                astro(astronomic);
                defered.resolve(res);
            });
        });

        return promise;
    }


    function cond(cond){

        var cond = cond.current_observation;

        var date = new Date(Date.parse(cond.local_time_rfc822));
        var str = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes();


        res.climate = {'date': str,
                       'weatherText': cond.weather,
                       'iconURL': cond.icon_url,
                       'windKmH': cond.wind_kph,
                       'windDir': cond.wind_dir,
                       'temp': cond.temp_c,
                       'humidity': cond.relative_humidity,
                       'precipitation': cond.precip_today_in,
                       'pressure': cond.pressure_mb,
                       'feelslike': cond.feelslike_c,
                      };


    }


    function astro (astro){
        var ast = astro.moon_phase;

        res.astronomic =  {'sunrise': (ast.sunrise.hour+":"+ast.sunrise.minute),
                           'sunset': (ast.sunset.hour+":"+ast.sunset.minute),
                           'moonrise': (ast.moonrise.hour+":"+ast.moonrise.minute),
                           'moonset': (ast.moonset.hour+":"+ast.moonset.minute)
                          };
    }


});
