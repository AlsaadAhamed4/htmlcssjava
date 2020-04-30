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
  await sleep(1500);

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
//here i am using array to loop, in each loop I assign a event whith repect to the condition in menu function
[mainContainer,NavList].forEach(ele => ele.addEventListener('click', isMenu));




//menu-Category controller

const MenuCategoriesController = () =>{

  //clear the container 
  clearMainContainer();
  //show Loader
  showLoader(mainContainer);
  //create object from class for menu
  const menuCategoriesObj = new MenuCategoriesModel();
  //sometimes fecth fails and return undefined to handle that
  //TODO axios should be used for better error handling
  checkFectchForMenu(menuCategoriesObj);
}

const checkFectchForMenu =  async (menuCategoriesObj)=>{
  //call method of the class to fecth data
  menuCategoriesObj.getMenuCategories();
  //sleep for 1.5 sec
  await sleep(1500);
  //handling if fecth returns undefined
  if(menuCategoriesObj.categories === undefined){
      alert(`There was an error while Fetching Menu, We will try again!`);
      menuCategoriesObj.getMenuCategories();
      await sleep(1500);
  }
  //display in UI
  MenuCategoriesView.renderMenuCategoryResults(menuCategoriesObj.categories);
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
  menuItemSingleObj.getMenuItemSingle();
  //sleep for 1.5 sec so that data is retrived from the server
  await sleep(1500);
  //display in UI
  MenuItemSingleView.renderResults(menuItemSingleObj.menuItemSingleCategory,menuItemSingleObj.menuItemSingleMenuItems);
}

