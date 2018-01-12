(function () {
    angular.module('App.AccessControl.Permission.Create', [
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.pagination',
        'api.permissions'
        ])
        .controller('PermissionCreateCtrl', function($scope, $http, $state, permissionApi)
        {
           
            $scope.initializePermissionCreateScreen = function () {
                $scope.permission = {};
                $scope.permission.successful = false;
                $scope.permission.error = false;
            };

            $scope.initializePermissionCreateScreen();

            $scope.gotoPermissionListScreen = function () {
                $state.go('app.permissionList',{});
            };  

            $scope.savePermission = function () {
                
                permissionApi.post($scope.permission).then(function (data) {
                    $scope.permission.successful = true;
                    $scope.gotoPermissionListScreen();
                }, function (error) {
                    $scope.permission.error = true;
                });

            };

        });
}());