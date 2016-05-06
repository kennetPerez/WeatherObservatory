angular.module('WeatherApp').controller('climogramsController', ['$rootScope', '$scope', 'settings', 'climogramsService', function($rootScope, $scope, settings, climogramsService) {
    $scope.$on('$viewContentLoaded', function() {
        Layout.setSidebarMenuActiveLink('set', $('#sidebar_menu_link_informes'));
    });



    $scope.amChartOptions =
    {
        data: climogramsService.dataFromPromise(),
        type: "serial",
        theme: 'light',
        "language": "sp",
        "fontFamily": 'Open Sans',
        "color":    '#888888',

        "legend":
        {
            "equalWidths": false,
            "useGraphSettings": true,
            "valueAlign": "left",
            "valueWidth": 120
        },

        "valueAxes": [
            {
                "id": "pricipitationAxis",
                "axisAlpha": 0,
                "gridAlpha": 0,
                "position": "left",
                "title": "Precipitación"
            },
            {
                "id": "temperatureAxis",
                "axisAlpha": 0,
                "gridAlpha": 0,
                "labelsEnabled": true,
                "position": "right",
                "title": "Temperatura"
            }
        ],
        "graphs": [
            {
                "alphaField": "alpha",
                "balloonText": "[[value]] mm",
                "dashLengthField": "dashLength",
                "fillAlphas": 0.7,
                "legendPeriodValueText": "Total: [[value.sum]] mm",
                "legendValueText": "[[value]] mm",
                "title": "Precipitación",
                "type": "column",
                "valueField": "precipitation",
                "valueAxis": "pricipitationAxis"
            },
            {
                "bullet": "square",
                "balloonText": "[[value]] C°",
                "bulletBorderAlpha": 1,
                "bulletBorderThickness": 1,
                "dashLengthField": "dashLength",
                "legendValueText": "[[value]] C°",
                "title": "Temperatura",
                "fillAlphas": 0,
                "valueField": "temperature",
                "valueAxis": "temperatureAxis"
            }
        ],
        "chartCursor":
        {
            "categoryBalloonDateFormat": "MMMM",
            "cursorAlpha": 0.1,
            "cursorColor": "#000000",
            "fullWidth": true,
            "valueBalloonsEnabled": true,
            "zoomable": true,
        },
        "dataDateFormat": "YYYY-MM",
        "categoryField": "month",



        "categoryAxis":
        {

            "dateFormats": [
                {
                    "period": "DD",
                    "format": "DD"
                },
                {
                    "period": "WW",
                    "format": "MMM DD"
                },
                {
                    "period": "MM",
                    "format": "MMMM"
                },
                {
                    "period": "YYYY",
                    "format": "YYYY"
                }
            ],
            "parseDates": true,
            "minPeriod": "MM",
            "autoGridCount": false,
            "axisColor": "#555555",
            "gridAlpha": 0.1,
            "gridColor": "#FFFFFF",
            "gridCount": 50
        }
    }


    $rootScope.settings.layout.pageBodySolid = true;
    $rootScope.settings.layout.pageSidebarClosed = false;



}]);
