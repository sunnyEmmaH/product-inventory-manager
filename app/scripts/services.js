'use strict';
angular.module('inventoryApp')
    .service('myService', ['$http', function($http){
    
    var editId=null;

    this.getProducts = function($scope){
        $http.get("products").then(           
            function(response){
                $scope.products=response.data;
            },
            function errorCallback(response){
                
            }
        );        
    };
    this.deleteProduct = function($scope, index){
        $http.delete('product/'+index).then(           
            function(response){
                $http.get('products').then(
                    function(response){
                         $scope.products=response.data;     
                    },
                    function errorCallback(response){
                
                    }
                )
            },
            function errorCallback(response){
                
            }
        );
    };
        
    this.postProduct = function($scope){
        $http.post('products', {
            "name" : $scope.name,
            "description": $scope.description,
            "price": $scope.price,
            "stock": $scope.stock,
            "packing": $scope.packing,
            "status": true
        }).then(
            function(response){
                $http.get('products').then(
                    function(response){
                        console.log(response.data);
                        $scope.products=response.data; 
                    },
                    function errorCallback(response){
                        
                    }
                );
            },
            function errorCallback(response){

            }
        );
    };
        
        
    this.getProduct = function ($scope, index) {
        editId=index;
        console.log(editId);
        $http.get("product/"+index).then(
            function(response){
                $scope.product=response.data;
                console.log($scope.product);
            },
            function errorCallback(response){
                        
            }
        );
    }; 
    
    this.updateProduct = function($scope){
        $http.put('product/'+editId, {
            "name" : $scope.name,
            "description": $scope.description,
            "price": $scope.price,
            "stock": $scope.stock,
            "packing": $scope.packing,
            "status": true
        }).then(
            function(response){
                $http.get('products').then(
                    function(response){
                        console.log(response.data);
                        $scope.products=response.data; 
                    },
                    function errorCallback(response){
                        
                    }
                );
            },
            function errorCallback(response){

            }
        );
    };
    
    this.changeActive = function($scope, index){
        $http.get('product/'+index).then(
            function(response){
                var prd=response.data;
                var flag=response.data.status;
                console.log(flag);
                $http.put('product/'+index,{
                    "name" : prd.name,
                    "description": prd.description,
                    "price": prd.price,
                    "stock": prd.stock,
                    "packing": prd.packing,
                    "status": !flag
                }).then(
                    function(response){
                        $http.get('products').then(
                            function(response){
                                console.log(response.data);
                                $scope.products=response.data; 
                            },
                            function errorCallback(response){

                            }
                        );
                    },
                    function errorCallback(response){

                    }
                )
            },
            function errorCallback(response){
                
            }
        );
    };
    
    
        
}]);