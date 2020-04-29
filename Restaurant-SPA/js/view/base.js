export const baseUrl = {
    home : '../snippets/home-snippet.html',
    menuCategoryTitle : '../snippets/categories-title-snippet.html',
    menuCategory : '../snippets/category-snippet.html',
    menuSingleItemsTitle : '../snippets/menu-items-title.html',
    menuSingleItems : '../snippets/menu-items.html',
}

export const mainContainer = document.getElementById('main-content');

export const showLoader = (container)=>{
    const html = `<div class='text-center'>
                    <img src='images/ajax-loader.gif'>
                </div>`;
    container.innerHTML = html;

}


export const sleep = (ms) =>{
	return new Promise(resolve => setTimeout(resolve,ms));
}