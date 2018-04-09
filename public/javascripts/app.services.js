'use strict';

var myModule = angular.module('myApp.services', []);
myModule.factory('services', function($q, $http) {
    return {
        topn: function (url, n, stopwords) {
            return $http({
                method: 'POST',
                url: '/api/v1/topn',
                header: {
                    'content-type': 'application/json'
                },
                data: {
                    'URL': url,
                    'n': n,
                    'stopwords': stopwords
                }
            });
        },
        getDefaultStopwords: function () {
            return $http.get('/stopwords');
        }
    };
});