//UI
import { Notification } from 'element-ui'

export default {
    renderTableHeadings(list){
        let pkg = []
       
        for(let prop2 in list){
            if(prop2 == 'created_at' || prop2 == 'updated_at'){
               continue;
            }else{
                prop2 = prop2.split('_').join(' ')
                prop2 = prop2.charAt(0).toUpperCase() + prop2.slice(1)
                pkg.push(prop2)
            }
            
        }
        console.log(pkg)
        return pkg;
    },
}