
(function () {

    var moduleDependencies = [
        'api-users', 'ngStorage'
    ];
    var controllerDependencies = [
        '$scope', 'userApi', '$http', '$localStorage', '$location'
    ];
    
    angular.module('AppAuthentication', moduleDependencies)

        .controller('ActivityDetailCtrl', AuthenticationCtrl);

        AuthenticationCtrl.$inject = controllerDependencies;

        function AuthenticationCtrl($scope, userApi, $http, $localStorage, $location)
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
                        url: 'http://fixedasset:8000/api/v1/users',
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

            $scope.login();
        }

}());