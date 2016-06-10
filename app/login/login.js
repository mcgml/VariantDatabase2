'use strict';

angular.module('variantdatabase.login', ['ngResource', 'ngRoute', 'ui-notification'])

    .controller('LoginCtrl', ['$rootScope', '$scope', '$http', '$location', 'Notification', function($rootScope, $scope, $http, $location, Notification) {

        // Register the login() function
        $scope.login = function(){
            $http.post('/login', {
                    username: $scope.email,
                    password: $scope.password
                })
                .success(function(user){
                    $rootScope.user = user;
                    Notification('Welcome ' + $rootScope.user.properties.fullName);
                    $location.url('/report');
                })
                .error(function(){
                    Notification.error('Username or password incorrect');
                    $location.url('/login');
                });
        };

    }]);