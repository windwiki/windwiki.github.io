
document.ready(function(){
    var $pn=$(".sh p:eq(0)");
    checkLocalStorage($pn);

    $pn.click({pn:$pn},toggle);
});

function toggle(event){
    var $prob = $(".prob");
    var pn = event.data.pn;
    var nap = pn.text();
    if (nap === "OPEN") {
        pn.text("私の箱");
        localStorage.setItem("open", "true");
    } else {
        pn.text("OPEN");
        localStorage.setItem("open", "false");
    }
    $prob.slideToggle("slow");
};
function checkLocalStorage(pn) {

    var status = localStorage.getItem("open");
    if (status && status === "true") {
        pn.text("私の箱");
        var $prob = $(".prob");
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
