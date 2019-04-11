//UI
import { Notification } from 'element-ui'

export default {
    checkIfRecordSelected(disable){
        if(disable){
             Notification.warning({
                title: 'Atencion!',
                dangerouslyUseHTMLString: true,
                message: '<p style="text-align: left;">Porfavor asegurese de seleccionar un registro para activar las funciones desabilitadas.</p>',
                position: 'bottom-right',
            });
        }
    },
}