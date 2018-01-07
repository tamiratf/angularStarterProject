(function()
{
    angular.module('api-permissions', [
            'api-base'
        ])
        .factory('permissionApi', [
            'baseApi'
            ,function(baseApi) {
                return baseApi.withConfig(function(Configurer) {
                    Configurer.setRestangularFields({"id": "id"})
                }).all('permissions');
            }
        ]);
})();
