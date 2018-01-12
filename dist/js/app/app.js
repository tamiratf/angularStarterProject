(function () {
angular
  .module('app', [
    'ui.router',
    'ncy-angular-breadcrumb',
    'angular-loading-bar',
    'angular-jwt',
    'ngStorage',
    'AppAuthentication'
  ])
  .run(['$rootScope', '$state', '$stateParams', '$localStorage', 'jwtHelper', function ($rootScope, $state, $stateParams, $localStorage, jwtHelper) {
    $rootScope.$on('$locationChangeStart', function () {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
  
    $rootScope.$on('$locationChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      var token = $localStorage.token;
      var currentStateHash = angular.copy(window.location.hash);
      if (!token || jwtHelper.isTokenExpired(token)) {
        window.location.href = window.location.origin + "/#/login";
        if (currentStateHash !== '#/login')
        {
          window.location.reload();
        }  
      }
    });
    $rootScope.$state = $state;
    return $rootScope.$stateParams = $stateParams;
  }])
  .config(['$locationProvider', 'cfpLoadingBarProvider', '$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider',
    function ($locationProvider, cfpLoadingBarProvider, $stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {
    $locationProvider.hashPrefix('');
    $urlRouterProvider.otherwise('/login');
    
      $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: true
      });
    
      $breadcrumbProvider.setOptions({
        prefixStateName: 'app.main',
        includeAbstract: true,
        template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
      });
    
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 1;

    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl: 'views/common/layouts/full.html',
        ncyBreadcrumb: {
          label: 'Root',
          skip: true
        }
      })
      .state('app.main', {
        url: '/dashboard',
        templateUrl: 'views/main.html',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Home',
        },
        //page subtitle goes here
        params: { subtitle: 'Welcome to ROOT powerfull Bootstrap & AngularJS UI Kit' }
      })
      // Additional Pages
      .state('app.login', {
        url: '/login',
        templateUrl: 'views/pages/login.html',
        Controller: 'AuthenticationCtrl',
        ncyBreadcrumb: {
          label: 'Login',
        }
      })
    }]);
}());
