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
            this.menuItemSingleResults = data;
        })
        .catch(error=>{
            console.error('Error:', error);
        });
    }
}