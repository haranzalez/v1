
export default {
    removeDuplicatesFromObj(o){
        var obj = {};
        for ( var i=0; i < o.length; i++ ){
            obj[o[i]['id']] = o[i];
        }
        return obj
    },
}