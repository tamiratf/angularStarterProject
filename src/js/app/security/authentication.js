(function () {
    angular.module('app.authenticate',['api.users', 'ngStorage'])
        .controller('loginCtrl', function($scope, userApi, $http, $localStorage, $location)
        {
            $scope.login = function()
            {
                var user = {
                    email: $scope.email,
                    password: $scope.password
                };

                return $http(
                    {
                        method: 'POST',
                        url: 'authenticate',
                        data: user
                    }).then(function(response)
                    {
                        $localStorage.token = response.data.token;
                        window.location.href = window.location.origin + '/#/';
                    }, function(error)
                    {
                        console.log("error : " + error.data.error);
                    });
            };
        });
}());