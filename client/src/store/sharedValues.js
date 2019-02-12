import HTTP from '../http';
import router from '../router'
import UserServices from '../services/UserServices'
import { Notification, Message, Confirm, Loading } from 'element-ui'
import { mapGetters } from 'vuex';

export default {
    namespaced: true,
    state: {
        loading_options: {
            lock: true,
            fullscreen: true,
            text: 'Trabajando',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        },
        tipo_licencia_options: [
            {
                value: 'C2',
                label: 'C2'
            }, 
            {
                value: 'C3',
                label: 'C3'
            },
        ],
        tipo_negociacion_options: [
            {
                value: 'Flete X Kg.',
                label: 'Flete X Kg.'
            }, 
            {
                value: 'Flete X Valor.',
                label: 'Flete X Valor.'
            }, 
        ],
        estado_options: [
            {
                value: 'Activo',
                label: 'Activo'
            }, 
            {
                value: 'Desactivo',
                label: 'Desactivo'
            }, 
            {
                value: 'Taller',
                label: 'Taller'
            }, 
        ],
        corroceria_options: [
            {
                value: 'Tanque',
                label: 'Tanque'
            }, 
            {
                value: 'Plancha',
                label: 'Plancha'
            }, 
            {
                value: 'Carroceria',
                label: 'Carroceria'
            }, 
            {
                value: 'Camabaja',
                label: 'Camabaja'
            }, 
        ],
        tipo_de_vehiculo_options: [
            {
                value: 'Tracto Camion',
                label: 'Tracto Camion'
            }, 
            {
                value: 'Doble Troque',
                label: 'Doble Troque'
            }, 
            {
                value: 'Sencillo',
                label: 'Sencillo'
            }, 
            {
                value: 'Turbo',
                label: 'Turbo'
            }, 
            {
                value: 'Camioneta',
                label: 'Camioneta'
            }
        ],
        tipo_de_flota_options: [
            {
                value: 'Propio',
                label: 'Propio'
            }, 
            {
                value: 'Tercero',
                label: 'Tercero'
            }, 
            {
                value: 'Cabezote',
                label: 'Cabezote'
            }, 
            {
                value: 'Fidelizado',
                label: 'Fidelizado'
            }, 
        ],
        tipo_de_configuracion_options: [
            {
                value: '2',
                label: '2'
            }, 
            {
                value: '3',
                label: '3'
            }, 
            {
                value: '4',
                label: '4'
            }, 
            {
                value: '2S1',
                label: '2S1'
            }, 
            {
                value: '2S3',
                label: '2S3'
            }, 
            {
                value: '3S1',
                label: '3S1'
            }, 
            {
                value: '3S2',
                label: '3S2'
            }, 
            {
                value: '3S3',
                label: '3S3'
            }, 
            {
                value: 'R2',
                label: 'R2'
            }, 
            {
                value: '2R2',
                label: '2R2'
            }, 
            {
                value: '2R3',
                label: '2R3'
            }, 
            {
                value: '3R2',
                label: '3R2'
            }, 
            {
                value: '3R3',
                label: '3R3'
            }, 
            {
                value: '4R2',
                label: '4R2'
            }, 
            
        ],
        tipo_de_combustible_options: [
            {
                value: 'Corriente',
                label: 'Corriente'
            }, 
            {
                value: 'Extra',
                label: 'Extra'
            }, 
            {
                value: 'Diesel',
                label: 'Diesel'
            },
        ],
        tipo_de_poliza_options: [
            {
                value: 'SOAT',
                label: 'SOAT'
            }, 
            {
                value: 'Hidrocarburos',
                label: 'Hidrocarburos'
            }, 
        ]
    },

    actions: {
    },
    mutations: {
    },

};