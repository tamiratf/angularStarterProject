(function()
{
    angular.module('api.base', [
            'restangular',
            'ngStorage'
        ])
        .factory('baseApi', [
            'Restangular',
            '$localStorage'
            ,function(Restangular, $localStorage) {
                return Restangular.withConfig(
                    function(Configurer) {
                        Configurer.setBaseUrl('/api/v1');

                        Configurer.addResponseInterceptor(
                            function(data, operation, what, url, response, deferred) {
                                // We cannot presume that the response will always be JSON.
                                // Some API end points respond with base64 encoded PDF, raw image, or raw CSV data

                                // .. to look for getList operations
                                if (operation === "getList") {
                                    // .. and handle the data
                                    data = data.data;
                                }

                                var r = {
                                    'status': response.status,
                                    'data': data,
                                    'operation': operation,
                                    'url': url,
                                    'params': response.config.params ? response.config.params : {}
                                };

                                if (data.success) {
                                    var ret = data['data'];
                                    if(data.count != undefined) ret.count = data.count;
                                    return ret;
                                }

                                return data;
                            }
                        );

                        Configurer.setDefaultHeaders(
                            {
                                'Authorization': 'Bearer ' + $localStorage.token
                            }
                        );
                    }

                );

            }
        ]);
})();
