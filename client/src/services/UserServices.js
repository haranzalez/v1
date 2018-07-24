
export default {
    getRoleIds(obj){
        let pkg = []
        obj.forEach(r => {
            pkg.push(r.id);
        })
        return pkg;
    },
}