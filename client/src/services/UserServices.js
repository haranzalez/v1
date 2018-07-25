
export default {
    removeDuplicatesFromObj(a){
        var obj = {};
        for ( var i=0, len=a.length; i < len; i++ )
            obj[a[i]['id']] = a[i];
        return obj
    },
}