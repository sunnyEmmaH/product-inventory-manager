'use strict';
angular.module('inventoryApp', ['ngRoute'])
.config(function($routeProvider) {
        $routeProvider
            // route for the contactus page
            .when('/', {
                templateUrl : 'index.html',
                controller  : 'indexController'
            /*template : "<h1>Main</h1><p>Click on the links to change this content</p>"*/
            })
            
});