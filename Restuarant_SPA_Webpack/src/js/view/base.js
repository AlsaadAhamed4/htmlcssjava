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
export const NavMenuList = document.getElementById('navMenuButton');
export const NavHomeList = document.getElementById('navHomeButton');

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

export const clearFixHtml = "<div class='clearfix visible-lg-block visible-md-block'></div>";

export const errorMsg = (errMsg)=>{
    clearMainContainer();
    const html =  `<div class="text-center" role="alert">
                     There was an error while loading data from the server, ${errMsg}
                    </div>`;
    mainContainer.insertAdjacentHTML('afterbegin',html);
}

//toggle collapse button in xs devices
export const  toggleCollapse =()=>{
    $('.navbar-toggle').on('blur',function(){
        let screenWidth =  window.innerWidth;
        if(screenWidth < 768){
            $('#collapsable-nav').collapse('hide');
        }
});
}