import {baseHtml,mainContainer, clearMainContainer} from './base.js';

export const renderHomePage = (html)=>{
    clearMainContainer();
    mainContainer.insertAdjacentHTML('afterbegin',html);
}