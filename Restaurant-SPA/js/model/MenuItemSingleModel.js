import {baseUrl} from '../view/base.js';

export default class MenuItemSingle{
    constructor(query){
        this.query = query;
    }

    getMenuItemSingle(){
        fetch(baseUrl.menuSingleItemsUrl + this.query,{
            method : 'GET',
            credentials : 'include',
            headers :{
                'content-Type' : 'application/json',
            }
        })
        .then(res=>{
            return res.json();
        })
        .then(data=>{
            this.menuItemSingleMenuItems = data.menu_items;
            this.menuItemSingleCategory = data.category;
        })
        .catch(error=>{
            console.error('Error:', error);
        });
    }
}