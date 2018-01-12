(function () {
    angular.module('App.AccessControl.User.Detail', [
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.pagination',
        'api.users',
        'xeditable',
        'api.roles',
        'api.userroles'
        ])
        .controller('UserDetailCtrl', function($scope, $http, $state,$stateParams, userApi, roleApi,userRoleApi)
        {
           
            $scope.initializeUserDetailScreen = function () {
                $scope.user = {};
                $scope.user.successful = false;
                $scope.user.error = false;
                $scope.roles = [];

                $scope.refreshScreen();
                
                roleApi.getList().then(function (data) {
                    $scope.roles = data;
                }, function (error) {
                    $scope.roles = [];
                });
            };

            $scope.refreshScreen = function () {
                userApi.getList({ "whereid": $stateParams.id, "with[]": 'Roles' } ).then(function (data) {
                    $scope.user = data[0];
                }, function (error) {
                    $scope.user = {}
                    });
            }; 

            $scope.initializeUserDetailScreen();

            $scope.gotoUserListScreen = function () {
                $state.go('app.userList',{});
            };  

            $scope.updateUser = function () {
                $scope.user.confirmInvalid = false;                                                
                $scope.user.put().then(function (data) {
                    $scope.user.successful = true;
                }, function (error) {                    
                    $scope.user.error = true;
                });
            }; 

            $scope.deleteUser = function () {
                $result = confirm("are you sure you want to delete the user?", true, false);
                if ($result) {
                    $scope.user.remove().then(function (data) {
                        $scope.gotoUserListScreen();
                    }, function (error) {
                        $scope.user.error = true;
                    });
                }    
            };

            $scope.addRole = function (role) {
                var isRoleExists = _.some($scope.user.roles, { id: role });
                if (!isRoleExists)
                {
                    userRoleApi.post({userId: $stateParams.id, roleId: role.id}).then(function (response) {
                        $scope.refreshScreen();
                    });
                }    
            };    

            $scope.deleteRole = function (role) {
                $result = confirm("are you sure you want to delete the user?", true, false);
                if ($result) {
                    var userRole = {};
                    userRoleApi.getList({ "whereuserId": $stateParams.id, "whereroleId": role.id }).then(function (data) {
                        userRole = data[0];

                        if (userRole && _.has(userRole, 'remove')) {
                            userRole.remove().then(function (response) {
                                $scope.refreshScreen();
                            });
                        }
                    });
                }    
                  
            };    

        });
}());