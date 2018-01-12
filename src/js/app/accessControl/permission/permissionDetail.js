(function () {
    angular.module('App.AccessControl.Permission.Detail', [
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.pagination',
        'api.permissions'
        ])
        .controller('PermissionDetailCtrl', function($scope, $http, $state,$stateParams, permissionApi)
        {
           
            $scope.initializePermissionDetailScreen = function () {
                $scope.permission = {};
                $scope.permission.successful = false;
                $scope.permission.error = false;

                $scope.refreshScreen();
            };

            $scope.refreshScreen = function () {
                permissionApi.getList({ "whereid": $stateParams.id } ).then(function (data) {
                    $scope.permission = data[0];
                }, function (error) {
                    $scope.permission = {}
                    });
            }; 

            $scope.initializePermissionDetailScreen();

            $scope.gotoPermissionListScreen = function () {
                $state.go('app.permissionList',{});
            };  

            $scope.updatePermission = function () {
                $scope.permission.confirmInvalid = false;                                                
                $scope.permission.put().then(function (data) {
                    $scope.permission.successful = true;
                }, function (error) {                    
                    $scope.permission.error = true;
                });
            }; 

            $scope.deletePermission = function () {
                $result = confirm("are you sure you want to delete the permission?", true, false);
                if ($result) {
                    $scope.permission.remove().then(function (data) {
                        $scope.gotoPermissionListScreen();
                    }, function (error) {
                        $scope.permission.error = true;
                    });
                }    
            };
        });
}());