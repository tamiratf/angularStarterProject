angular.module("api-users",["api-base"]).factory("userApi",["baseApi",function(i){return i.withConfig(function(i){i.setRestangularFields({id:"id"})}).all("users")}]);