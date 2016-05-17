angular.module('WeatherApp').service("climogramsService", function ($http, $q, $timeout, API_URL) {

    this.dataFromPromise = function(){
        var deferred = $q.defer();

        var dataProvider = [

            {
                "month": "2015-01",
                "precipitation": 28,
                "temperature": 10.4
            },
            {
                "month": "2015-02",
                "precipitation": 29,
                "temperature": 11.6
            },
            {
                "month": "2015-03",
                "precipitation": 34,
                "temperature": 12.4
            },
            {
                "month": "2015-04",
                "precipitation": 30,
                "temperature": 16.3
            },
            {
                "month": "2015-05",
                "precipitation": 39,
                "temperature": 19.4
            },
            {
                "month": "2015-06",
                "precipitation": 23,
                "temperature": 23
            },
            {
                "month": "2015-07",
                "precipitation": 9,
                "temperature": 26.2
            },
            {
                "month": "2015-08",
                "precipitation": 21,
                "temperature": 26.2
            },
            {
                "month": "2015-09",
                "precipitation": 57,
                "temperature": 24.5
            },
            {
                "month": "2015-10",
                "precipitation": 99,
                "temperature": 19.6
            },
            {
                "month": "2015-11",
                "precipitation": 39,
                "temperature": 14.2
            },
            {
                "month": "2015-12",
                "precipitation": 43,
                "temperature": 9.4
            }

        ];

        deferred.resolve(dataProvider)
        return deferred.promise;
    };

});
