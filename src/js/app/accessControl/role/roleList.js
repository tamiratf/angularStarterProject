(function () {
    angular.module('App.AccessControl.Role.List', [
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.pagination',
        'api.roles'
        ])
        .controller('RoleListCtrl', function($scope, $http, $state, roleApi)
        {
            $scope.myAppScopeProvider = {
                openDetail: function(role) {    
                    $state.go('app.roleDetail', {
                        id: role.entity.id
                    });
                }
            };
            
            $scope.roles = {
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
    
            $scope.roles.columnDefs = [
                {
                    name: "Id",
                    field: 'id',
                    width: 150
                }, {
                    displayName: "Role Name",
                    field: "name",
                    type: "string"
                }, {
                    displayName: "Description",
                    field: "description",
                    type: "string"
                }
            ];

            

            $scope.roles.data = [];

            $scope.refreshRole = function () {
                roleApi.getList().then(function (data) {
                    $scope.roles.data = data;
                }, function (error) {
                        console.log(error);
                    });
            };    

            $scope.initializeRoleScreen = function () {

                $scope.refreshRole();
                
            };

            $scope.initializeRoleScreen();

            $scope.searchRole = function () {
                var txtSearchFields = {
                    'likename': $scope.role.name
                };

                if (!$scope.role.name) {
                    delete txtSearchFields.likename;
                }

                roleApi.getList(txtSearchFields).then(function (data) {
                    $scope.roles.data = data;
                }, function (error) {
                        console.log(error);
                    });
                
            };  
            
            $scope.resetSearch = function () {
                $scope.role = {};
                $scope.refreshRole();
            }; 

            $scope.gotoCreateRole = function () {
                $state.go('app.roleCreate',{});
            };  

        });
}());