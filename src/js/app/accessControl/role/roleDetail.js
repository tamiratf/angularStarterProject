(function () {
    angular.module('App.AccessControl.Role.Detail', [
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.pagination',
        'api.roles',
        'api.permissions',
        'api.permissionroles'
        ])
        .controller('RoleDetailCtrl', function($scope, $http, $state,$stateParams, roleApi,permissionApi, permissionRoleApi)
        {
           
            $scope.initializeRoleDetailScreen = function () {
                $scope.role = {};
                $scope.role.successful = false;
                $scope.role.error = false;
                $scope.permissions = [];

                $scope.refreshScreen();
                
                permissionApi.getList().then(function (data) {
                    $scope.permissions = data;
                }, function (error) {
                    $scope.permissions = [];
                });
            };

            $scope.refreshScreen = function () {
                roleApi.getList({ "whereid": $stateParams.id, "with[]": 'permissions' } ).then(function (data) {
                    $scope.role = data[0];
                }, function (error) {
                    $scope.role = {}
                    });
            }; 

            $scope.initializeRoleDetailScreen();

            $scope.gotoRoleListScreen = function () {
                $state.go('app.roleList',{});
            };  

            $scope.updateRole = function () {
                $scope.role.confirmInvalid = false;                                                
                $scope.role.put().then(function (data) {
                    $scope.role.successful = true;
                }, function (error) {                    
                    $scope.role.error = true;
                });
            }; 

            $scope.filterPermissions = function (permissionName) {
                $scope.filteredPermissions = _.filter($scope.role.permissions, { 'name': '%' + permissionName + '%' });                
            }; 

            $scope.deleteRole = function () {
                $result = confirm("are you sure you want to delete the role?", true, false);
                if ($result) {
                    $scope.role.remove().then(function (data) {
                        $scope.gotoRoleListScreen();
                    }, function (error) {
                        $scope.role.error = true;
                    });
                }    
            };

            $scope.addPermission = function (permission) {
                var isPermissionExists = _.some($scope.role.permissions, { id: permission });
                if (!isPermissionExists)
                {
                    permissionRoleApi.post({roleId: $stateParams.id, permissionId: permission.id}).then(function (response) {
                        $scope.refreshScreen();
                    });
                }    
            };    

            $scope.deletePermission = function (permission) {
                $result = confirm("are you sure you want to revoke the permission?", true, false);
                if ($result) {
                    var permissionRole = {};
                    permissionRoleApi.getList({ "whereroleId": $stateParams.id, "wherepermissionId": permission.id }).then(function (data) {
                        permissionRole = data[0];

                        if (permissionRole && _.has(permissionRole, 'remove')) {
                            permissionRole.remove().then(function (response) {
                                $scope.refreshScreen();
                            });
                        }
                    });
                }    
                  
            };    

        });
}());