/*globals angular*/

var myApp = angular.module('GiphyApp', ['infinite-scroll']);


myApp.controller("searchCtrl", ['$scope', '$http', function($scope, $http) {
    $scope.searchTerm = '';
    $scope.giphyList = [];
    $scope.fetching = false;
    $scope.page = 1;
    $scope.offSet = 0;

    $scope.search = function() {
        var req = {
            url: "http://api.giphy.com/v1/gifs/search",
            method: 'GET',
            params: {
                q: $scope.searchTerm,
                limit: 50,
                api_key: "dc6zaTOxFJmzC"

            }

        }
        console.log($scope.searchTerm);

        $http(req).then(function success(res) {
            $scope.giphyList = res.data.data;
            console.log($scope.giphyList);
            console.log(res);
        }, function error(res) {
            //do something if the response has an error
            console.log(res);
        });
    };

    $scope.scroll = function() {
        $scope.offSet += 25;
        $scope.page++;
        $scope.fetching = true;
        var req = {
            url: 'http://api.giphy.com/v1/gifs/search',
            method: 'GET',
            params: {
                q: $scope.searchTerm,
                offset: $scope.offSet,

                api_key: 'dc6zaTOxFJmzC'
            },
            page: $scope.page
        };
        $http(req).then(function(res) {

            $scope.fetching = false;
            $scope.giphyList = $scope.giphyList.concat(res.data.data);
            console.log(res)
        });
    };

    var debounce = null;
    $scope.$watch('searchTerm', function(newVal, oldVal) {
        if (debounce) {
            clearTimeout(debounce);
        }
        debounce = setTimeout(function() {
            console.log('ran search!');
            $scope.search();
        }, 1000);
    });


}])

.run(function() {
    console.log('App has loaded!');
});
