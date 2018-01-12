(function () {
    angular.module('App.AccessControl.Permission.List', [
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.pagination',
        'api.permissions'
        ])
        .controller('PermissionListCtrl', function($scope, $http, $state, permissionApi)
        {
            $scope.myAppScopeProvider = {
                openDetail: function(permission) {    
                    $state.go('app.permissionDetail', {
                        id: permission.entity.id
                    });
                }
            };
            
            $scope.permissions = {
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
    
            $scope.permissions.columnDefs = [
                {
                    name: "Id",
                    field: 'id',
                    width: 150
                }, {
                    displayName: "Permission Name",
                    field: "name",
                    type: "string"
                }, {
                    displayName: "Description",
                    field: "description",
                    type: "string"
                }
            ];

            

            $scope.permissions.data = [];

            $scope.refreshPermission = function () {
                permissionApi.getList().then(function (data) {
                    $scope.permissions.data = data;
                }, function (error) {
                        console.log(error);
                    });
            };    

            $scope.initializePermissionScreen = function () {

                $scope.refreshPermission();
                
            };

            $scope.initializePermissionScreen();

            $scope.searchPermission = function () {
                var txtSearchFields = {
                    'likename': $scope.permission.name
                };

                if (!$scope.permission.name) {
                    delete txtSearchFields.likename;
                }

                permissionApi.getList(txtSearchFields).then(function (data) {
                    $scope.permissions.data = data;
                }, function (error) {
                        console.log(error);
                    });
                
            };  
            
            $scope.resetSearch = function () {
                $scope.permission = {};
                $scope.refreshPermission();
            }; 

            $scope.gotoCreatePermission = function () {
                $state.go('app.permissionCreate',{});
            };  

        });
}());