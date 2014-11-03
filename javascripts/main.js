
document.ready(function(){
    var $pn=$(".sh p:eq(0)");
    checkLocalStorage($pn);

    $pn.click({pn:$pn},toggle);
});

function toggle(event){
    var $prob = $(".prob");
    //var $pn = $(".sh p:eq(0)");
    var pn = event.data.pn;
    var nap = pn.text();
    //console.log(nap);
    if (nap === "OPEN") {

        pn.text("私の箱");
        localStorage.setItem("open", "true");
        // $prob.display("inherit");
    } else {
        pn.text("OPEN");
        //$prob.slideToggle("slow");
    }
    $prob.slideToggle("slow");
};
function checkLocalStorage(pn) {

    var status = localStorage.getItem("open");
    if (status && status === "true") {
        // var $pn=$(".sh p:eq(0)");
        pn.text("私の箱");
        var $prob = $(".prob");
        //var prob = document.getElementsByClassName("prob")[0];
        $prob.css("display", "block");
    }
}
function addLoadEvent(func){
    var oldonload = window.onload;
    if(typeof window.onload!='function'){
        window.onload=func;
    } else {
        window.onload=function(){
            oldonload;
            func();
        }
    }
}
/*
 $(document).ready(function(){
 $(".sh").click(function(){
 var $pn=$(".sh p:eq(0)");
 //var pn = document.getElementsByClassName("sh")[0].getElementsByTagName('p');
 var nap = $pn.text();
 var $prob = $(".prob");
 if(nap==="OPEN"){
 $pn.text("私の箱");
 // $prob.display("inherit");
 } else {
 $pn.text("OPEN");
 //$prob.slideToggle("slow");
 }
 $prob.slideToggle("slow");
 });
 });
$(document).ready(function(){
    $(".sdb").click(function(){
        console.log("enter");
        $(".prob").display("inherit");
    });
});*/