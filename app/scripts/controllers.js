'use strict';
var app = angular.module('inventoryApp',['ui.bootstrap'])

app.controller('indexController', ['$scope', '$rootScope', 'myService', '$uibModal', '$document', '$log', function($scope, $rootScope, myService, $uibModal, $document, $log) {
    $scope.loadList = function(){
        myService.getProducts($scope);
        console.log("hahaha");
    }
    $rootScope.$on("LoadWholeList", function(){
        $scope.loadList();
    });
    
    $scope.loadList();
    
    $scope.delete = function(index){
        myService.deleteProduct($scope, index);
    };
    $scope.openAddNew = function(){        
        var modalInstance = $uibModal.open({
            templateUrl: 'new.html',
            controller: 'ModalInstanceCtrl',
            scope: $scope,
            resolve: {
                userForm: function () {
                    return $scope.userForm;
                }
            }
        });
        
        modalInstance.result.then(function(){
            myService.getProducts($scope);
        });
    };
    $scope.openEdit = function(index){
        myService.getProduct($scope, index);
        var modalInstance = $uibModal.open({
            templateUrl: 'edit.html',
            controller: 'ModalInstanceCtrl',
            scope: $scope,
            resolve: {
                userForm: function () {
                    return $scope.userForm;
                }
            }
        });
        modalInstance.result.then(function(){
            myService.getProducts($scope);
        });
    }; 
    $scope.changeActive = function(index){
        myService.changeActive($scope, index);
    };
    
}]);

app.controller('ModalInstanceCtrl', ['$scope', '$rootScope', 'myService', '$uibModalInstance', function($scope, $rootScope, myService, $uibModalInstance) {

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.saveNew = function(){
        myService.postProduct($scope);
        $uibModalInstance.close('close');
        $rootScope.$emit("LoadWholeList", {});
    };
    
    $scope.saveEdit = function(){
        myService.updateProduct($scope);
        $uibModalInstance.close('close');
        $rootScope.$emit("LoadWholeList", {});
    }
}]);