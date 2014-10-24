console.log('This would be the main JS file.');

$(document).ready(function(){
    $(".sh").click(function(){
        var $pn=$(".sh p:eq(0)");
        //var pn = document.getElementsByClassName("sh")[0].getElementsByTagName('p');
        var nap = $pn.text();
        if(nap==="OPEN"){
            $pn.text("私の箱");
        } else {
            $pn.text("OPEN");
        }
        $(".prob").slideToggle("slow");
    });
});
