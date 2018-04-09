'use strict';

angular.module('myApp.controller', ['ngTagsInput'])
    .controller('ctrl', [ '$scope', 'services',
        function($scope, services) {
            $scope.stopwords = [];
            $scope.errorMessage = '';
            $scope.page = 'form.ejs';
            $scope.result = [];
            $scope.getTopN = function (n, url) {
                $scope.page = 'loader.ejs';
                if(n>0 && url !== '') {
                    let stopword = $scope.stopwords.map(i => i.text);
                    services.topn(url, n, stopword)
                        .then(response => {
                            if(response.hasOwnProperty('data')) {
                                angular.forEach(response.data.data, (value, key) => {
                                    angular.forEach(value, (element) => {
                                        $scope.result.push([key,element]);
                                    });
                                });
                                $scope.page = 'table.ejs';
                            } else {
                                $scope.page = 'form.ejs';
                                $scope.errorMessage = 'some problem occur';
                            }
                        })
                        .catch(err => {
                            $scope.page = 'form.ejs';
                            if(err.hasOwnProperty('error')) {
                                $scope.errorMessage = err;
                            } else {
                                console.log(err);
                                $scope.errorMessage = 'some problem occur';
                            }
                        });
                }
            };

            $scope.getStopwords = function (stopword) {
                if(stopword === true) {
                    services.getDefaultStopwords().then(response => {
                        $scope.stopwords = response.data.split(',').map(word => {
                            return {'text': word};
                        });
                    }).catch(err => {
                        alert('cant get default stopwords');
                        $scope.errorMessage = err.message;
                    });
                } else {
                    $scope.stopwords = [];
                }
            };
        }
    ]);