(function()
{
    angular.module('api-permissionroles', [
            'api-base'
        ])
        .factory('permissionRoleApi', [
            'baseApi'
            ,function(baseApi) {
                return baseApi.withConfig(function(Configurer) {
                    Configurer.setRestangularFields({"id": "id"})
                }).all('permissionroles');
            }
        ]);
})();
