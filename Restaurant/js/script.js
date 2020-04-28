$(function (){

    $('.navbar-toggle').on('blur',function(){
        let screenWidth =  window.innerWidth;
        if(screenWidth < 768){
            $('#collapsable-nav').collapse('hide');
        }
    });

}); 


//to make the menu load dynamically

(function(global){

    //to be a global object to access
    const dc= {};

    //path of the main content
    const homeHtml = 'snippets/home-snippet.html';

    //url where menu category data is available
    const allCategoriesUrl ="https://davids-restaurant.herokuapp.com/categories.json";
    //snippet for menu tile (heading with some message)
    const categoriesTitleHtml = "snippets/categories-title-snippet.html";
    //html for each menu category
    const categoryHtml = "snippets/category-snippet.html";

    //menu single caregories
    const menuItemsUrl ="https://davids-restaurant.herokuapp.com/menu_items.json?category=";
    const menuItemsTitleHtml = "snippets/menu-items-title.html";
    const menuItemHtml = "snippets/menu-item.html";


    //a function to insert html 
    const insertHtml = (selector,html) =>{
        const targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    }

    //showing the loader before the contents gets loaded
    const showLoader = (selector)=>{
        const html = `<div class='text-center'>
                        <img src='images/ajax-loader.gif'>
                      </div>`;
        insertHtml(selector,html);
    } 

    // Return substitute of '{{propName}}'
    // with propValue in given 'string'
    //this function replace the template to actual value
    const insertProperty = function (string, propName, propValue) {
        const propToReplace = "{{" + propName + "}}";
        string = string.replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    }

    //on page load (before css and images)
    document.addEventListener('DOMContentLoaded',function(event){

        //first show loader
        showLoader('#main-content');
        $ajaxUtils.sendGetRequest(
            homeHtml,
            function(responseText){
            document.querySelector('#main-content').innerHTML = responseText;
            },
            false); //false means dont want to process as json
    });


    // Load the menu categories view
    dc.loadMenuCategories = function () {
        showLoader("#main-content");
        document.getElementById('navMenuButton').classList.add('active');
        document.getElementById('homeMenuButton').removeAttribute('class');
        $ajaxUtils.sendGetRequest(allCategoriesUrl,buildAndShowCategoriesHTML);
    };

    // Load the menu items view
    // 'categoryShort' is a short_name for a category
    dc.loadMenuItems = function (categoryShort) {
        showLoader("#main-content");
        $ajaxUtils.sendGetRequest(menuItemsUrl + categoryShort,buildAndShowMenuItemsHTML); //url + LA or L
    };

    // Builds HTML for the categories page based on the data
    // from the server
    function buildAndShowCategoriesHTML (categories) {
        // Load title snippet of categories page
        $ajaxUtils.sendGetRequest(
        categoriesTitleHtml,
        function (categoriesTitleHtml) {
            // Retrieve single category snippet
            $ajaxUtils.sendGetRequest(
            categoryHtml,
            function (categoryHtml) {
                const categoriesViewHtml = buildCategoriesViewHtml(categories, categoriesTitleHtml,categoryHtml);
                insertHtml("#main-content", categoriesViewHtml);
            },
            false);
        },
        false);
    }
  
  
    // Using categories data and snippets html
    // build categories view HTML to be inserted into page
    function buildCategoriesViewHtml(categories,categoriesTitleHtml,categoryHtml) {
    
        var finalHtml = categoriesTitleHtml;
        finalHtml += "<section class='row'>";
    
        // Loop over categories
        for (let i = 0; i < categories.length; i++) {
            // Insert category values
            let html = categoryHtml;
            let name = "" + categories[i].name;
            let short_name = categories[i].short_name;
            
            html =insertProperty(html, "name", name);

            html = insertProperty(html,"short_name",short_name);
            finalHtml += html;
        }
    
        finalHtml += "</section>";
        return finalHtml;
    }


    // Builds HTML for the single category page based on the data
    // from the server
    function buildAndShowMenuItemsHTML (categoryMenuItems) {
        // Load title snippet of menu items page
        $ajaxUtils.sendGetRequest(
        menuItemsTitleHtml,
        function (menuItemsTitleHtml) {
            // Retrieve single menu item snippet
            $ajaxUtils.sendGetRequest(
            menuItemHtml,
            function (menuItemHtml) {
                var menuItemsViewHtml =
                buildMenuItemsViewHtml(categoryMenuItems,
                                        menuItemsTitleHtml,
                                        menuItemHtml);
                insertHtml("#main-content", menuItemsViewHtml);
            },
            false);
        },
        false);
    }

    // Using category and menu items data and snippets html
    // build menu items view HTML to be inserted into page
    function buildMenuItemsViewHtml(categoryMenuItems,menuItemsTitleHtml,menuItemHtml) {

        menuItemsTitleHtml =insertProperty(menuItemsTitleHtml,"name",categoryMenuItems.category.name);
        menuItemsTitleHtml =insertProperty(menuItemsTitleHtml,"special_instructions",categoryMenuItems.category.special_instructions);

        var finalHtml = menuItemsTitleHtml;
        finalHtml += "<section class='row'>";

        // Loop over menu items
        var menuItems = categoryMenuItems.menu_items;
        var catShortName = categoryMenuItems.category.short_name;
        for (var i = 0; i < menuItems.length; i++) {
            // Insert menu item values
            var html = menuItemHtml;
            html =insertProperty(html, "short_name", menuItems[i].short_name);
            html =insertProperty(html,"catShortName",catShortName);
            html =insertItemPrice(html,"price_small",menuItems[i].price_small);
            html =insertItemPortionName(html,"small_portion_name",menuItems[i].small_portion_name);
            html =insertItemPrice(html,"price_large",menuItems[i].price_large);
            html =insertItemPortionName(html,"large_portion_name",menuItems[i].large_portion_name);
            html =insertProperty(html,"name",menuItems[i].name);
            html =insertProperty(html,"description",menuItems[i].description);

            // Add clearfix after every second menu item
            if (i % 2 != 0) {
                html +=
                "<div class='clearfix visible-lg-block visible-md-block'></div>";
            }

            finalHtml += html;
        }

        finalHtml += "</section>";
        return finalHtml;
    }


    // Appends price with '$' if price exists
    function insertItemPrice(html,pricePropName,priceValue) {
    // If not specified, replace with empty string
        if (!priceValue) {
        return insertProperty(html, pricePropName, "");;
        }

        priceValue = "$" + priceValue.toFixed(2);
        html = insertProperty(html, pricePropName, priceValue);
        return html;
    }


    // Appends portion name in parens if it exists
    function insertItemPortionName(html,portionPropName,portionValue) {
        // If not specified, return original string
        if (!portionValue) {
            return insertProperty(html, portionPropName, "");
        }

        portionValue = "(" + portionValue + ")";
        html = insertProperty(html, portionPropName, portionValue);
        return html;
    }
  

    //here global is window , so that we make dc object available in window
    global.$dc = dc;

})(window);