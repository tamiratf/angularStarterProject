(function () {
    angular.module('AppAuthentication',['ngStorage'])
        .controller('AuthenticationCtrl', function($scope, $http, $localStorage, $location, $state)
        {
            $scope.login = function()
            {
                return $http(
                    {
                        method: 'POST',
                        url: 'http://fixedasset:8000/authenticate',
                        data: $scope.user
                    }).then(function(response)
                    {
                        $localStorage.token = response.data.token;
                        $state.go('app.main');
                        
                    }, function(error)
                    {
                        console.log("error : " + error.data.error);
                    });
            };
        });
}());