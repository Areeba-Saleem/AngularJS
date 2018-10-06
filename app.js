(function(){
    'use strict';
    angular.module('AngularApp', [])
    .controller('LunchCheckController', LunchCheckController);
    LunchChecktController.$inject = ['$scope'];
    function LunchCheckController($scope){
        $scope.items = "";
        $scope.message = "";
        $scope.textColor = {};
        $scope.boxColor = {};     
        $scope.checkItems = function(){
            if($scope.items){
                var itemList = $scope.items.split(',');
                for(var i = 0; i<itemList.length; i++)
                {
                    if(itemList[i]==""||" ")
                    {
                        itemList.splice(i,1);
                        console.log(itemList);
                    }
                }
                if(itemList.length <=3){
                    $scope.message = "Enjoy!";
                    $scope.textColor = {
                        "color": "green"
                    }
                    $scope.boxColor = {
                        "border-color": "green"
                    }
                }
                else{
                    $scope.message = "Too much!";
                    $scope.textColor = {
                        "color": "orange"
                     }
                     $scope.boxColor = {
                        "border-color": "orange"
                    }
                 }
            }
            else{
                $scope.message = "Please enter the items first.";
                $scope.textColor = {
                    "color": "red"
                }
                $scope.boxColor = {
                    "border-color": "red"
                }
            }

        }

    }
})();