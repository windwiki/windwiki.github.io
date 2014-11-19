/**
 * Created by panyanhong on 14-11-19.
 */

/**
 * 判断元素是否相等
 * @param a
 * @param b
 * @returns {boolean}
 */
function equals(a, b){
    if(a===b){
        return true;
    }
    if(!a||!b){
        return false;
    }
    var result = true;
    for(var i in a){
        console.log("i"+i)
        if(!b[i]){
            return false;
        }
        if((typeof a[i])==="Object"){

            result = equals(a, b);
        } else if(a[i]!==b[i]){
            return false;
        }

    }
    return result;
}

function unique(array){

    var result = [];
    var flag = {};

    for(var i in array){
        if(!equals(flag[array[i]], array[i])){

            result.push(array[i]);
            flag[array[i]]=array[i];
        }
    }
    return result;
}

var result = unique([1,2,3,[1],[1],null,null,undefined,[12],[12],"3","se"]);
console.log(result);

var xx=[1,2,undefined,"df"];
for(var  i in xx){
    console.log(xx[i]);
}