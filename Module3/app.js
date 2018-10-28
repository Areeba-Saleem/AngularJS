(function(){
    'use strict;'
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .factory('NarrowItDownFactory', NarrowItDownFactory)
    .directive('foundItemsDirective', narrowItDownDirective)
    .directive('listItem', DisplayItemDirective);

    NarrowItDownController.$inject = ['NarrowItDownFactory', '$timeout'];
/********************************* Directive Funtion ********************************/
function DisplayItemDirective(){
    var ddo = {
        template: '<ul><li>Item: {{item.name}}</li> <li> Short Name: {{item.short_name}} </li> <li> Description: {{item.description}} </li> </ul>'
 
    }
    return ddo;
};    
function narrowItDownDirective(){
        var ddo = {
            templateUrl: 'https://areeba-saleem.github.io/AngularJS/Module3/narrowItDownDirective.html',
            controller: ControllerFunction,
            bindToController: true,
            controllerAs: 'searched',
            scope: {
                
                foundItems: '<',
                title: '@',
                remove: '&'
            },
            restrict: 'E'

        }
        return ddo;
    
    };
/********************************* Controller Funtion ********************************/
  
function NarrowItDownController(NarrowItDownFactory, $timeout){
         var Ctrl = this;
         var MenuSearchService = NarrowItDownFactory();
         Ctrl.title = "Narrowed Down List";
         Ctrl.itemToSearch = "";
         Ctrl.getMatchedMenuItems = function(){
            Ctrl.foundItems = [];
             if(Ctrl.itemToSearch.length)
           {var promise =  MenuSearchService.retrieveList();
            
            $timeout(function(){
                promise.then(function(response){
                Ctrl.message = "";
               Ctrl.menuItems = response.data.menu_items;
               console.log(Ctrl.menuItems);
               angular.forEach(Ctrl.menuItems, function(value, index) {
                if(value.description.indexOf(Ctrl.itemToSearch) !==-1){
                     Ctrl.foundItems.push(value);
                }
              });
              Ctrl.itemToSearch = "";
              if(!Ctrl.foundItems.length){
                  Ctrl.message = "Sorry! Item not available";
              }
              console.log(Ctrl.foundItems);
            
         })
         .catch(function(response)
         {
             Ctrl.message = "Error Occurred! Can't retrieve the list";
         });
        }, 2000);
        }
        else{
            Ctrl.message = "Please enter an item to search!";
        }
    };
        Ctrl.removeItem = function(index){
                console.log(index);
                Ctrl.foundItems.splice(index, 1);
        };

     };
     function ControllerFunction(){
         searched = this;
     };   
/********************************* Service Funtion ********************************/

function MenuSearchService($http){
        var service = this;
        
        service.retrieveList = function(){
            var response = $http({
                method:"GET",
                url: "https://areeba-saleem.github.io/AngularJS/Module3/menu_items.json"
            });
            return response;
        };

   };   
/********************************* Factory Funtion ********************************/
NarrowItDownFactory.$inject = ['$http'];    
function NarrowItDownFactory($http){
        var factory = function(){
            return new MenuSearchService($http);
        };
        return factory;
    };
})();