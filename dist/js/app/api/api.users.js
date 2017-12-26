(function()
{
    angular.module('api.users', [
            'api.base'
        ])
        .factory('userApi', [
            'baseApi'
            ,function(baseApi) {
                return baseApi.withConfig(function(Configurer) {
                    Configurer.setRestangularFields({"id": "id"})
                }).all('users');
            }
        ]);
})();
