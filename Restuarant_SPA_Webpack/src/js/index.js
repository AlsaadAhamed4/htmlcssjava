import {showLoader,mainContainer,homeTilesDiv,clearMainContainer,NavList,errorMsg,toggleCollapse} from './view/base.js';

import MenuCategoriesModel from './model/MenuCategoriesModel.js';
import * as MenuCategoriesView from './view/MenuCategoriesView.js';

import MenuItemSingleModel from './model/MenuItemSingleModel.js';
import * as MenuItemSingleView from './view/MenuItemsSingleView.js';

const state = {};

toggleCollapse(); //to toggle the collapse button when lost focus in xs devices

//main Controller

//event deligation for menu
const isMenu = (e)=>{
  (e.target.matches('#menu-tile, #menu-tile *')||e.target.matches('#navMenuButton, #navMenuButton *')) ? MenuCategoriesController() : '';
  (e.target.matches('#specials-tile, #specials-tile *')) ? loadMenuItems('SP') : ''; //special tiles uses same API as menuSingleItem
  if(e.currentTarget.id === 'main-content' && e.target.closest('.menuItemSingle')){
    loadMenuItems(e.target.closest('.menuItemSingle').dataset.shortname);
  }
}
//here i am using array to loop, in each loop I assign a event whith repect to the condition in menu function
[mainContainer,NavList].forEach(ele => ele.addEventListener('click', isMenu));




//menu-Category controller

const MenuCategoriesController = async () =>{

  //clear the container 
  clearMainContainer();
  //show Loader
  showLoader(mainContainer);
  //create object from class for menu
  const menuCategoriesObj = new MenuCategoriesModel();

  await menuCategoriesObj.getMenuCategories();
  //display in UI
  if(!menuCategoriesObj.error){
    MenuCategoriesView.renderMenuCategoryResults(menuCategoriesObj.categories);
    MenuCategoriesView.ActiveMenuNavList();
  }else{
      errorMsg(menuCategoriesObj.error);
  }
  
}


//menu-Items single page  as we have passed the onclick on html with shortName as per API

const loadMenuItems = async (shortName)=>{
  //clear container 
  clearMainContainer();
  //show loader
  showLoader(mainContainer);
  //create object from class for menu-items-single
  const menuItemSingleObj = new MenuItemSingleModel(shortName);
  //call method of the class to fecth data
  await menuItemSingleObj.getMenuItemSingle();
  //display in UI
  if(!menuItemSingleObj.error){
    MenuItemSingleView.renderResults(menuItemSingleObj.menuItemSingleCategory,menuItemSingleObj.menuItemSingleMenuItems);
    MenuCategoriesView.ActiveMenuNavList();
  }
  else{
    errorMsg(menuItemSingleObj.error);
  }
}
