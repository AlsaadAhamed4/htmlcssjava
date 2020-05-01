import {mainContainer,clearMainContainer,NavHomeList,NavMenuList} from './base.js'

const renderCategory = (cat)=>{

    let html =  `<div class="col-md-3 col-sm-4 col-xs-6 col-xxs-12">
                        <div class="category-tile menuItemSingle" data-shortName='${cat.short_name}'>
                            <img width="200" height="200" src="images/menu/${cat.short_name}/${cat.short_name}.jpg" alt="${cat.name}">
                            <span>${cat.name}</span>
                        </div>
                </div>`;
    mainContainer.insertAdjacentHTML('beforeend',html);

}

const renderMenuTitle = ()=>{
    const html1 = `<h2 id="menu-categories-title" class="text-center">Menu Categories</h2>
                    <div class="text-center">
                        Substituting white rice with brown rice or fried rice after 3:00pm will be $1.50 for a pint and $2.50 for a quart.
                    </div>`;

    mainContainer.insertAdjacentHTML('afterbegin',html1);
}

export const renderMenuCategoryResults = (categories) =>{

    clearMainContainer();
    renderMenuTitle();
    categories.forEach(category =>renderCategory(category));

}

export const ActiveMenuNavList = ()=>{
    NavHomeList.classList.remove('active');
    NavMenuList.classList.add('active');
}