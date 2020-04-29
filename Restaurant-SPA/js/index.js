import {baseHtml,showLoader,mainContainer,sleep,homeTilesDiv,clearMainContainer,NavList} from './view/base.js';

import HomeModel from './model/HomeModel.js';
import * as HomeView  from './view/HomeView.js'; 

import MenuCategoriesModel from './model/MenuCategoriesModel.js';
import * as MenuCategoriesView from './view/MenuCategoriesView.js';

import MenuItemSingleModel from './model/MenuItemSingleModel.js';
import * as MenuItemSingleView from './view/MenuItemsSingleView.js';


//main Controller

const HomeController = async () =>{

  //create a object of Home Class
  const homeObj = new HomeModel() ;

  //fetching html page by Calling gethomePage of homeClass
  homeObj.getHomePage();

  //displaying the loader 
  showLoader(mainContainer);

  //sleep for 1sec because to fetch homepage it takes time to respond
  await sleep(1000);

  //show the html in UI
  HomeView.renderHomePage(homeObj.results);

}

//Event to loader page for home page
document.addEventListener('DOMContentLoaded',function(){
  HomeController();
})

//event deligation for menu
const isMenu = (e)=>{
  (e.target.matches('#menu-tile, #menu-tile *')||e.target.matches('#navMenuButton, #navMenuButton *')) ? MenuCategoriesController() : '';
  if(e.currentTarget.id === 'main-content' && e.target.closest('.menuItemSingle')){
    loadMenuItems(e.target.closest('.menuItemSingle').dataset.shortname);
  }
}
[mainContainer,NavList].forEach(ele => ele.addEventListener('click', isMenu));

//menu-Category controller

const MenuCategoriesController = async () =>{

  clearMainContainer();
  showLoader(mainContainer);
  const menuCategoriesObj = new MenuCategoriesModel();
  menuCategoriesObj.getMenuCategories();
  await sleep(1000);
  MenuCategoriesView.renderMenuCategoryResults(menuCategoriesObj.categories);

}


//menu-Items single page  as we have passed the onclick on html with shortName as per API

const loadMenuItems = async (shortName)=>{
  clearMainContainer();
  showLoader(mainContainer);
  const menuItemSingleObj = new MenuItemSingleModel(shortName);
  menuItemSingleObj.getMenuItemSingle();
  await sleep(1000);
  console.log(menuItemSingleObj.menuItemSingleResults);


}

