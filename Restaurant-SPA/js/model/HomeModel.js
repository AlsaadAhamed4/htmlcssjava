import {baseUrl} from '../view/base.js';

export default class HomeModel{
    constructor(){
    }

     getHomePage(){
        const homeHtml = fetch(baseUrl.home,{
            method : "GET",
            credentials : 'same-origin',
            headers : {
                'content-Type': 'text/html'
            }
        })
        .then(res =>{
            return res.text();
        })
        .then(data =>{
            this.results = data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}