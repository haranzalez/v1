<template>
   <vue-scroll class="page-trailers-create">
       <el-form label-position="top" ref="form" label-width="120px">
        <el-row>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <h3>Informacion basica</h3>
                </el-col>
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="NIT">
                        <el-input 
                        size="mini"
                        :value="transportadora.nit"
                        @input="setNit"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Razon social">
                        <el-input 
                        size="mini"
                        :value="transportadora.razon_social"
                        @input="setRazonSocial"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Direccion">
                        <el-input 
                        size="mini"
                        :value="transportadora.direccion"
                        @input="setDireccion"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Telefono">
                        <el-input 
                        size="mini"
                        :value="transportadora.telefono"
                        @input="setTelefono"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Contacto">
                        <el-input 
                        size="mini"
                        :value="transportadora.contacto"
                        @input="setContacto"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Anticipo">
                        <el-switch
                            v-model="trans_anticipo"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-text="Si"
                            inactive-text="No">
                        </el-switch>
                    </el-form-item>
				</el-col>
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Pgos">
                        <el-switch
                            v-model="trans_pagos"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-text="Si"
                            inactive-text="No">
                        </el-switch>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Radica RNDC">
                        <el-switch
                            v-model="radica_rndc"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-text="Si"
                            inactive-text="No">
                        </el-switch>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <h3>Informacion bancaria</h3>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Banco">
                        <el-input
                        size="mini" 
                        :value="transportadora.banco"
                        @input="setBanco"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Numero de cuenta">
                        <el-input
                        size="mini" 
                        :value="transportadora.numero_de_cuenta"
                        @input="setNumeroDeCuenta"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de cuenta">
                       <el-select size="mini" v-model="tipo_de_cuenta_selected" placeholder="Select">
                            <el-option
                            v-for="item in tipo_de_cuenta_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
				</el-col>
                
				
        </el-row>
        
        
            
        </el-form>
   </vue-scroll>
</template>

<script>
import HTTP from '../../http';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import moment from 'moment-timezone'
import router from '../../router'

export default {
	name: 'TransportadorasEditForm',
	data () {
      	return {
              tipo_de_cuenta_options: [
                {
                    value: 'Corriente',
                    label: 'Corriente'
                }, 
                {
                    value: 'Ahorros',
                    label: 'Ahorros'
                }, 
            ],
		}
	},
	computed: {
        radica_rndc: {
            get(){
                return this.transportadora.radica_rndc
            },
            set(value){
                this.setRadicaRndc(value)
            }
        },
         trans_pagos: {
             get(){
                return this.transportadora.pagos
            },
            set(value){
                this.setPagos(value)
            }
        },
        trans_anticipo: {
             get(){
                return this.transportadora.anticipo
            },
            set(value){
                this.setAnticipo(value)
            }
        },
        tipo_de_cuenta_selected: {
            get(){
                return this.transportadora.tipo_de_cuenta
            },
            set(value){
                this.setTipoDeCuenta(value)
            }
        },
        
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('transportadoras', [
			'transportadora',
        ]),

	},
	components: {
	},
    methods: {
   
    
        ...mapActions('transportadoras',[
        ]),
        ...mapMutations('transportadoras', [
            'setNit',
            'setRazonSocial',
            'setDireccion',
            'setTelefono',
            'setContacto',
            'setBanco',
            'setNumeroDeCuenta',
            'setPagos',
            'setAnticipo',
            'setTipoDeCuenta',
            'setRadicaRndc',
        ]),
        title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
        },
        
    },
    created: function(){
       
	}

}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';
.page-trailers-create {
	.label-switch-box {
		display: block;
		clear: both;
		width: 100%;
		text-align: right;
		margin-bottom: 20px;
	}
	.col-p {
		padding: 0 10px;
		box-sizing: border-box;
	}
	.select-wide {
		width: 100%;
	}
	.pull-right {
		text-align: right;
	}
}

</style>
