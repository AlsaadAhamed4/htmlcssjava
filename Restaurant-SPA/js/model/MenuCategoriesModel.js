import { baseUrl,baseHtml } from '../view/base.js';


export default class MenuCategoriesModel{
    constructor(){
    }

    getMenuCategories(){
        fetch(baseUrl.allMenuCategoriesUrl,{
            method : "GET",
            credentials: 'include',
            headers:{
                'content-Type': 'application/json',
            }
        })
        .then(res => {
            return res.json();
        })
        .then(data =>{
            this.categories = data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
} 