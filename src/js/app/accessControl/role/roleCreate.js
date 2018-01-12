(function () {
    angular.module('App.AccessControl.Role.Create', [
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.pagination',
        'api.roles'
        ])
        .controller('RoleCreateCtrl', function($scope, $http, $state, roleApi)
        {
           
            $scope.initializeRoleCreateScreen = function () {
                $scope.role = {};
                $scope.role.successful = false;
                $scope.role.error = false;
            };

            $scope.initializeRoleCreateScreen();

            $scope.gotoRoleListScreen = function () {
                $state.go('app.roleList',{});
            };  

            $scope.saveRole = function () {                
                
                roleApi.post($scope.role).then(function (data) {
                    $scope.role.successful = true;
                    $scope.gotoRoleListScreen();
                }, function (error) {                    
                    $scope.role.error = true;
                });

            }; 

        });
}());