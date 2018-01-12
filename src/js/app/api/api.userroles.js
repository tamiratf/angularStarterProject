(function()
{
    angular.module('api.userroles', [
            'api.base'
        ])
        .factory('userRoleApi', [
            'baseApi'
            ,function(baseApi) {
                return baseApi.withConfig(function(Configurer) {
                    Configurer.setRestangularFields({"id": "id"})
                }).all('userroles');
            }
        ]);
})();
