(function()
{
    angular.module('api-roles', [
            'api-base'
        ])
        .factory('roleApi', [
            'baseApi'
            ,function(baseApi) {
                return baseApi.withConfig(function(Configurer) {
                    Configurer.setRestangularFields({"id": "id"})
                }).all('roles');
            }
        ]);
})();
