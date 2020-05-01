import { baseUrl,baseHtml } from '../view/base.js';
import axios from 'axios';


export default class MenuCategoriesModel{
    constructor(){
    }

    async getMenuCategories(){
        try{
            const menuCategories = await axios(baseUrl.allMenuCategoriesUrl,{
                method : "GET",
                credentials : 'include',
                headers:{
                    "content-Type" : "application/json",
                }
            });
            this.categories = menuCategories.data;
        }
        catch(error){
            this.error = error;
            console.error('Error:', error);
        };
    }
} 