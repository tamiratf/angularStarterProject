(function () {
    angular.module('App.AccessControl.User.List', [
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.pagination',
        'api.users'
        ])
        .controller('UserListCtrl', function($scope, $http, $state, userApi)
        {
            $scope.myAppScopeProvider = {
                openDetail: function(user) {    
                    $state.go('app.userDetail', {
                        id: user.entity.id
                    });
                }
            };
            
            $scope.users = {
                paginationPageSizes: [10, 25, 50, 75],
                paginationPageSize: 10,
                useExternalPagination: true,
                enableSorting: true,
                useExternalSorting: true,
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                multiSelect: false,
                noUnselect: true,
                appScopeProvider: $scope.myAppScopeProvider,
                rowTemplate: '<div ng-dblclick="grid.appScope.openDetail(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" ui-grid-cell></div>',
                onRegisterApi: function(gridApi) {
                    $scope.gridApi = gridApi;
    
                    $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {    
                    });
    
                    gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {                        
                    });
    
                }
            };
    
            $scope.users.columnDefs = [
                {
                    name: "Id",
                    field: 'id',
                    width: 150
                }, {
                    displayName: "First Name",
                    field: "firstName",
                    type: "string"
                }, {
                    displayName: "Last Name",
                    field: "lastName",
                    type: "string"
                }, {
                    displayName: "Username",
                    field: "userName",
                    type: "string"
                }, {
                    displayName: "E-mail",
                    field: "email",
                    type: "string"
                }
            ];

            

            $scope.users.data = [];

            $scope.refreshUser = function () {
                userApi.getList().then(function (data) {
                    $scope.users.data = data;
                }, function (error) {
                        console.log(error);
                    });
            };    

            $scope.initializeUserScreen = function () {

                $scope.refreshUser();
                
            };

            $scope.initializeUserScreen();

            $scope.searchUser = function () {
                var txtSearchFields = {
                    'likeuserName': $scope.user.userName,
                    'likefirstName': $scope.user.firstName,
                    'likeemail': $scope.user.email
                };

                if (!$scope.user.userName) {
                    delete txtSearchFields.likeuserName;
                }
                if (!$scope.user.firstName) {
                    delete txtSearchFields.likefirstName;
                }
                if (!$scope.user.email) {
                    delete txtSearchFields.likeemail;
                }

                userApi.getList(txtSearchFields).then(function (data) {
                    $scope.users.data = data;
                }, function (error) {
                        console.log(error);
                    });
                
            };  
            
            $scope.resetSearch = function () {
                $scope.user = {};
                $scope.refreshUser();
            }; 

            $scope.gotoCreateUser = function () {
                $state.go('app.userCreate',{});
            };  

        });
}());