(function () {
    angular.module('App.AccessControl.User.Detail', [
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.pagination',
        'api.users',
        'xeditable',
        'api.roles'
        ])
        .controller('UserDetailCtrl', function($scope, $http, $state,$stateParams, userApi, roleApi)
        {
           
            $scope.initializeUserDetailScreen = function () {
                $scope.user = {};
                $scope.user.successful = false;
                $scope.user.error = false;
                $scope.roles = [];
                userApi.getList({ "whereid": $stateParams.id, "with[]": 'Roles' } ).then(function (data) {
                    $scope.user = data[0];
                }, function (error) {
                    $scope.user = {}
                    });
                
                roleApi.getList().then(function (data) {
                    $scope.roles = data;
                }, function (error) {
                    $scope.roles = [];
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

        });
}());