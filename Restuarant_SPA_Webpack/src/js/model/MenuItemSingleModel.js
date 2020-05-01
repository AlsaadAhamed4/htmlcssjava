import {baseUrl} from '../view/base.js';
import axios from 'axios';

export default class MenuItemSingle{
    constructor(query){
        this.query = query;
    }

    async getMenuItemSingle(){
        try{
            const menuItems = await axios(baseUrl.menuSingleItemsUrl + this.query,{
                method : "GET",
                credentials : 'include',
                headers:{
                    "content-Type" : "application/json",
                }
            });
            
            this.menuItemSingleMenuItems = menuItems.data.menu_items;
            this.menuItemSingleCategory = menuItems.data.category;
        }
        catch(error){
            this.error = error;
            console.error('Error:', error);
        };
    }
}