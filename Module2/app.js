(function(){
    'use strict;'
    angular.module('ShoppingListApp', [])
    .controller('shoppingList1', shoppingList1)
    .controller('shoppingList2', shoppingList2)
    .service('customService', customService);
    shoppingList1.$inject = ['customService'];
    shoppingList2.$inject = ['customService'];
/******************************* To Buy Shopping List ************************************************/
    function shoppingList1(customService){
        var list1 = this;
        list1.itemName = "";
        list1.itemQuantity = "";
        list1.items = [];
        list1.boughtItems = [];
        list1.newItem = "";
        list1.newItemQuantity = "";
        
        //Adding Items in the list
        list1.addItem = function(){
            try {
            customService.addItem(list1.itemName, list1.itemQuantity);
            
                    }
                    catch(error){
                        list1.errorMessage = error.message;
                }
                    };               
        list1.items = customService.getitems();
        list1.boughtItems = customService.getBoughtItems();
        
        //Removing items from the list
        list1.removeItem = function(index){
            console.log(list1.bought);
            customService.removeItem(index);
            list1.errorMessage = "";
        };
        
        //Updating items in the list
        list1.updateItem = function(index){
            customService.updateItem(index, list1.newItem, list1.newItemQuantity);
            list1.newItem = "";
            list1.newItemQuantity = "";
        };
        list1.showUpdateInput = function(index){
            list1.items[index].updateList = true;
        };

        list1.buyItem = function(index){
            customService.buyItem(index);
            list1.errorMessage = "";
        };
    };
    /*************************** Already Bought Shopping List ****************************************/
    function shoppingList2(customService){
        var list2 = this;
        list2.items = [];
        list2.items = customService.getBoughtItems();
        
    };

    /*************************** Custom Service Function ***********************************/
        function customService(){
        var itemList = this;
        var maxItem = 5;
        var items = [{
            name: 'soft drinks',
            quantity: 5,
            updateList: false
        },
        {
            name: 'cookie bags',
            quantity: 10,
            updateList: false
        },
        {
            name: 'chips packs',
            quantity: 4,
            updateList: false
        },
        {
            name: 'noodles',
            quantity: 8,
            updateList: false
        },
        {
            name: 'nuggets',
            quantity: 5,
            updateList: false
        },
    ];
        var boughtItems = [];
        //Add Items
        itemList.addItem = function(itemName, itemQuantity){
            if((maxItem == undefined) || 
              (maxItem !==undefined) && (items.length<maxItem))
              {
                var item = {
                name: itemName,
                quantity: itemQuantity,
                updateList: false,
            };
            items.push(item);
            console.log(items);
        }
        else{
            throw new Error('Max limit reached. Can\'t add more than '+ maxItem + ' items.')
        }
        }
        //Return List Items
        itemList.getitems = function(){
            return items;
        }
        //Remove List Items
        itemList.removeItem = function(index){
            items.splice(index, 1);
        }
        //Update List Items
        itemList.updateItem = function(index, newItem, newItemQuantity){
            var item = {
                name: newItem,
                quantity: newItemQuantity,
                updateList: false,
            };
            items[index] = item;

        }
        //Buy List Items
        itemList.buyItem = function(index){
            boughtItems.push(items[index]);
            itemList.removeItem(index);
        }
        //Return Already Bought List
        itemList.getBoughtItems = function(){
            return boughtItems;
        }
    };
})();