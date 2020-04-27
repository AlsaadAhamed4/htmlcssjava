$(function (){

    $('.navbar-toggle').on('blur',function(){
        let screenWidth =  window.innerWidth;
        if(screenWidth < 768){
            $('#collapsable-nav').collapse('hide');
        }
    });

}); 