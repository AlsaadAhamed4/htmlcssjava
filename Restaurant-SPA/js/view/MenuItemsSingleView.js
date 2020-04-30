import {baseUrl, mainContainer, clearMainContainer,clearFixHtml} from './base.js';



const renderMenuItemSingle = (item,short_name,index) =>{
    
    const menuItem = `<div class="menu-item-tile col-md-6">
                    <div class="row">
                        <div class="col-sm-5">
                            <div class="menu-item-photo">
                            <div>${item.short_name}</div>
                            <img class="img-responsive" width="250" height="150" src="images/menu/${short_name}/${item.short_name}.jpg" alt="${item.name}">
                            </div>
                             <div class="menu-item-price">
                                ${amount(item)}
                            </div>
                        </div>
                        <div class="menu-item-description col-sm-7">
                            <h3 class="menu-item-title">${item.name}</h3>
                            <p class="menu-item-details">${item.description}</p>
                        </div>
                    </div>
                    <hr class="visible-xs">
                </div>`;
    mainContainer.insertAdjacentHTML('beforeend',menuItem);
    
    if(index % 2 !==0){
        mainContainer.insertAdjacentHTML('beforeend',clearFixHtml);
    }
}

const amount = (item)=>{
    if(item.price_small=== null){
        return `$${item.price_large}`;
    }
    else{
       return `$${item.price_small}<span>(${item.small_portion_name})</span>&nbsp;$${item.price_large}<span>(${item.large_portion_name})</span>`;
   }
}

const renderMenuItemSingleTilte = (category)=>{
    const title = `<h2 id="menu-categories-title" class="text-center">${category.name} Menu</h2>
                    <div class="text-center">${category.special_instructions}`;
    
    mainContainer.insertAdjacentHTML('afterbegin',title);
}

export const renderResults = (category,menuItems)=>{

    clearMainContainer();
    renderMenuItemSingleTilte(category);
    menuItems.map((item,index) => {
        renderMenuItemSingle(item,category.short_name,index);
    });
    
}