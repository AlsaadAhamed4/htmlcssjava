import {baseHtml} from '../view/base.js';

export default class HomeModel{
    constructor(){
    }

     getHomePage(){
        fetch(baseHtml.homeHtml,{
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