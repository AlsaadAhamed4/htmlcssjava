import {baseUrl,showLoader,mainContainer,sleep} from './view/base.js';
import HomeModel from './model/HomeModel.js';
import * as HomeView  from './view/HomeView.js'; 


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

//Event to loader page
document.addEventListener('DOMContentLoaded',function(){
  HomeController();
})