/**
 * Created by panyanhong on 14-11-16.
 */

/**
 * 项目数据
 * @type {{label: string, category: string, img: string, value: string, desc: string, picon: string, name: string, ticon: string, time: string}[]}
 */
var compObj = [
    {"label":"compObj","category":"创业项目","img":"imgs/img1.png","value":"创见","desc":"聚焦行业报导与创业公司挖掘的科技媒体","picon":"imgs/fcon3.png","name":"王先生","ticon":"imgs/fcon2.png","time":"2012-11-20"},
    {"label":"compObj","category":"创业项目","img":"imgs/img1.png","value":"创见100","desc":"聚焦创业公司的孵化器","picon":"imgs/fcon3.png","name":"王某某","ticon":"imgs/fcon2.png","time":"2012-11-20"},
    {"label":"compObj","category":"创业项目","img":"imgs/img2.png","value":"创见","desc":"聚焦行业报导与创业公司挖掘的科技媒体","picon":"imgs/fcon3.png","name":"王先生","ticon":"imgs/fcon2.png","time":"2012-11-20"},
    {"label":"compObj","category":"创业项目","img":"imgs/img2.png","value":"创见100","desc":"聚焦创业公司的孵化器","picon":"imgs/fcon3.png","name":"王某某","ticon":"imgs/fcon2.png","time":"2012-11-20"}
];

/**
 * 投资人数据
 * @type {{label: string, category: string, img: string, value: string, typeName: string, desc: string, concept: string}[]}
 */
var personObj = [
    {"label":"personObj","category":"投资人","img":"imgs/img1.png","value":"创宁宇","typeName":"天使投资人","desc":"北京 执行官 专注...","concept":"投资理念：投资梦想"},
    {"label":"personObj","category":"投资人","img":"imgs/img3.png","value":"创见","typeName":"天使投资人","desc":"北京 执行官 专注...","concept":"投资理念：寻找靠谱创业者"},
    {"label":"personObj","category":"投资人","img":"imgs/img4.png","value":"创飞","typeName":"天使投资人","desc":"北京 执行官 专注...","concept":"投资理念"}
];


/**
 * 关键字描红
 * @param node
 * @param str
 */
function setRed(node, str){
    if(node&&str) {
        var reg = new RegExp('(' + str + ')', 'g');
        node.innerHTML = node.innerHTML.replace(reg, "<span class='mark'>$1</span>");
    }
}
/**
 * 过滤项目数据
 * @returns {Array}
 */
function filterCompanyInfo(){
    var result = [];
    for (var i = 0,j=0; i < compObj.length; i++) {
        if (compObj[i].value.toLowerCase().indexOf(paraSet.ser) != -1) {
            result[j++] = compObj[i];
        }
    }
    return result;
}

/**
 * 过滤投资人数据
 * @returns {Array}
 */
function filterPersonInfo(){
    var result = [];
    for (var i = 0,j=0; i < personObj.length; i++) {
        if (personObj[i].value.toLowerCase().indexOf(paraSet.ser) != -1) {
            result[j++] = personObj[i];
        }
    }
    return result;
}

/**
 * 添加最后一个section
 * @param $sec
 * @returns {*}
 */
function addLastSec($sec){
    paraSet.count++;
    if(paraSet.count==paraSet.max){
        var $lasec = $( "<section>查看更多...</section>" );
        $lasec.attr("class","lastsec");
        paraSet.reSet();
    }
    return $lasec.after($sec);
}

/**
 * 一些全局数据保存与重置
 * @type {{ser: string, count: number, max: number, compCount: number, personCount: number, reSet: reSet}}
 */
var paraSet = {
    ser:"",
    count:0,
    max:0,
    compCount:0,
    personCount:0,
    reSet: function(){
        this.max=0;
        this.count=0;
        this.compCount=0;
        this.personCount=0;

    }
};

/**
 * 列表填充与渲染
 */
$.widget( "custom.autocomplete", $.ui.autocomplete, {

    _create: function() {
        this._super();
        this.widget().menu( "option", "items", "> :not(.firstsec)" );
    },
    _renderMenu : function(ul, items) {
        var that = this,
            currentCategory = "";
        $.each( items, function( index, item ) {
            var sec;
            if ( item.category != currentCategory ) {
                //非cache 列表头
                if(item.label==="compObj"&&paraSet.compCount>0||
                    item.label==="personObj"&&paraSet.personCount>0) {
                    ul.append("<section class='firstsec'>搜索<span class='mark'>" + paraSet.ser + "</span>相关的" + item.category + "</section>");

                } else
                //cache 列表头
                if(!paraSet.ser){
                    ul.append("<section class='firstsec'>您最近浏览过得项目</section>");

                }
                currentCategory = item.category;
            }
            sec = that._renderItemData(ul, item );
            if (item.category ) {
                sec.attr( "aria-label", item.label);
            }
        });
    },
    /**
     * 填充筛选后的项目数据
     * @param ul
     * @param item
     * @returns {*}
     * @private
     */
    _renderCompany: function(ul, item){
        var $sec = $( "<section></section>" );
        var $imgs = $( "<img>" );
        $imgs.attr({"src":item.img, "class": "faceimg"});
        $sec.append($imgs);

        var $teDiv = $( "<div></div>" );
        $teDiv.attr("class","tediv");

        var $compName = $( "<p>"+item.value+"</p>" );
        $compName.attr("class","compName");
        setRed($compName[0], paraSet.ser);

        var $discrip = $( "<p>"+item.desc+"</p>" );
        $discrip.attr("class","discrip");

        var $picon = $( "<img>" );
        $picon.attr({"src":item.picon, "class": "fcon"});

        var $pspan = $( "<span>"+"项目创建人：" +item.name+"</span>" );
        $pspan.attr("class","tsp");

        var $ticon = $( "<img>" );
        $ticon.attr({"src":item.ticon, "class": "fcon"});
        var $tspan = $( "<span>"+"加入天使汇时间：" +item.time+"</span>" );
        $tspan.attr("class","tsp");

        $teDiv.append($compName)
            .append($discrip)
            .append($picon)
            .append($pspan)
            .append($ticon)
            .append($tspan);
        var $temp = $sec.data("ui-autocomplete-item", item)
            .append($imgs).append($teDiv);
        paraSet.count++;
        return $temp.appendTo(ul);
    },
    /**
     * 填充筛选后的投资人数据
     * @param ul
     * @param item
     * @returns {*}
     * @private
     */
    _renderPerson: function(ul, item){

        var $sec = $( "<section></section>" );
        var $imgs = $( "<img>" );
        $imgs.attr({"src":item.img, "class": "faceimg"});
        $sec.append($imgs);

        var $teDiv = $( "<div></div>" );
        $teDiv.attr("class","tediv");
        var $compName = $( "<p>"+item.value + " " + item.typeName+"</p>" );
        $compName.attr("class","compName");
        setRed($compName[0], paraSet.ser);

        var $discrip = $( "<p>"+item.desc+"</p>" );
        $discrip.attr("class","discrip");
        var $concept = $( "<p>"+item.concept+"</p>" );
        $concept.attr("class","discrip");

        $teDiv.append($compName)
            .append($discrip)
            .append($concept)
        var $temp = $sec.data("ui-autocomplete-item", item)
            .append($imgs).append($teDiv);
        $temp.appendTo(ul);
        paraSet.count++;
        if(paraSet.count===paraSet.max){
            var $lastsec = $( "<section>查看更多...</section>" );
            $lastsec.attr("id","lastsec");
            paraSet.reSet();
            return ul.append($lastsec);

        }
        return ul;
    },
    /**
     * 根据label分别填充对应数据
     * @param ul
     * @param item
     * @returns {*}
     * @private
     */
    _renderItemData: function(ul, item){
        if(item.label==="compObj") {
            return this._renderCompany(ul, item);
        } else {
            return this._renderPerson(ul, item);
        }
    }
});

$(function() {
    var cache=[]; //缓存
    $("#inp").autocomplete({
        delay:0,
        max: 1000,
        minChars: 0,
        minLength: 0,
        mustMatch:true,
        matchContains: true,
        scroll: true,
        scrollHeight: 300,

        source: function (request, response) {
            paraSet.ser = request.term;
            paraSet.reSet();
            //console.log(paraSet.ser)
            var result=[];
            if (!paraSet.ser&&cache.length>0) {//focus，输入为空且有cache时，显示cache内容
                response(cache);
            } else if(paraSet.ser){
                var resultCom = filterCompanyInfo();
                cache = resultCom;  //只缓存项目数据
                var resultPer = filterPersonInfo();
                result = resultCom.concat(resultPer);
                //分别保存各列表段长度，用来判断是否填充最后一个section
                paraSet.max=result.length;
                paraSet.compCount=resultCom.length;
                paraSet.personCount=resultPer.length;
                response(result);
            }
        }

    }).focus(function(){
        //console.log('search');
        $(this).autocomplete('search',paraSet.ser);
    });
});