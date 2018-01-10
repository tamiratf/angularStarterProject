(function () {
    angular.module('App.AccessControl.User.Create', [
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.pagination',
        'api.users',
        'xeditable'
        ])
        .controller('UserCreateCtrl', function($scope, $http, $state, userApi)
        {
           
            $scope.initializeUserCreateScreen = function () {
                $scope.user = {};
                $scope.user.successful = false;
                $scope.user.error = false;
            };

            $scope.initializeUserCreateScreen();

            $scope.gotoUserListScreen = function () {
                $state.go('app.userList',{});
            };  

            $scope.saveUser = function () {
                $scope.user.confirmInvalid = false; 
                if ($scope.user.password && $scope.user.confirmPassword)
                {
                    if ($scope.user.password !== $scope.user.confirmPassword)
                    {
                        $scope.user.confirmInvalid = true;
                        return false;
                    }    
                }
                
                userApi.post($scope.user).then(function (data) {
                    $scope.user.successful = true;
                    $scope.gotoUserListScreen();
                }, function (error) {                    
                    $scope.user.error = true;
                });

            }; 

        });
}());