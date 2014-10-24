console.log('This would be the main JS file.');

//document.write("<script src=‘../javascripts/jquery-2.1.1.min.js’></script>");
$(document).ready(function(){
    $(".sh").click(function(){
        $(".prob").slideToggle("slow");
    });
});
