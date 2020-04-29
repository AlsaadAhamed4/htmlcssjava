export const baseHtml = {
    homeHtml : '../snippets/home-snippet.html',
}

export const baseUrl = {
    allMenuCategoriesUrl : "https://davids-restaurant.herokuapp.com/categories.json",
    menuSingleItemsUrl :"https://davids-restaurant.herokuapp.com/menu_items.json?category=",
}

export const mainContainer = document.getElementById('main-content');
export const homeTilesDiv = document.getElementById('home-tiles'); 
export const NavList =  document.getElementById('nav-list');

export const showLoader = (container)=>{
    const html = `<div class='text-center'>
                    <img src='images/ajax-loader.gif'>
                </div>`;
    container.innerHTML = html;

}


export const sleep = (ms) =>{
    return new Promise(resolve => setTimeout(resolve,ms));
}

export const clearMainContainer = () =>{
    mainContainer.innerHTML = '';
}