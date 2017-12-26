// Default colors
var brandPrimary =  '#20a8d8';
var brandSuccess =  '#4dbd74';
var brandInfo =     '#63c2de';
var brandWarning =  '#f8cb00';
var brandDanger =   '#f86c6b';

var grayDark =      '#2a2c36';
var gray =          '#55595c';
var grayLight =     '#818a91';
var grayLighter =   '#d1d4d7';
var grayLightest =  '#f8f9fa';

angular
  .module('app', [
    'ui.router',
    'oc.lazyLoad',
    'ncy-angular-breadcrumb',
    'angular-loading-bar',
    'angular-jwt',
    'ngStorage'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {
    
    $urlRouterProvider.otherwise('/dashboard');
    
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
        ncyBreadcrumb: {
          label: 'Login',
        }
      })
  }])
  .run(['$rootScope', '$state', '$stateParams', '$localStorage', 'jwtHelper', function ($rootScope, $state, $stateParams, $localStorage, jwtHelper) {
    $rootScope.$on('$stateChangeSuccess', function () {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
  
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      var token = $localStorage.token;

      if (!token || jwtHelper.isTokenExpired(token)) {
        window.location.href = window.location.origin + "/login";
      }
    });
    $rootScope.$state = $state;
    return $rootScope.$stateParams = $stateParams;
  }]);
