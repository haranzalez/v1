<template>
   <vue-scroll class="page-conductores-create">
       <el-form label-position="top" ref="form" :status-icon="true" :show-message="false" label-width="120px" clearValidate> 
        <el-row>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <h3>Datos bancarios</h3>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Titular" >
                    <el-input size="mini" 
                    @input="setTitular"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Tipo de ID">
                    <el-input size="mini" 
                    @input="setTipoDeId"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Numero cuenta bancaria">
                    <el-input size="mini" 
                    @input="setNumeroCuentaBancaria"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Tipo cuenta bancaria">
                    <el-select size="mini" v-model="tipo_de_cuenta" placeholder="Select">
                        <el-option
                        v-for="item in tipo_de_cuenta_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Banco">
                    <el-input size="mini" 
                    @input="setBanco"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
    
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Cuenta propia"> 
                    <el-switch
                    v-model="cuentaPropiaSwitch"
                    active-text="Si"
                    inactive-text="No">
                    </el-switch>
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
	name: 'conductorDatosBancariosCrear',
	data () {
      	return {
            
		}
	},
	computed: {
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('datosBancariosConductor', [
            'datosBancarios',
        ]),
        ...mapState('sharedValues', [
            'tipo_de_cuenta_options',
        ]),
        tipo_de_cuenta: {
            get(value){
                return this.datosBancarios.tipo_cuenta_bancaria
            },
            set(value){
                this.setTipoCuentaBancaria(value)
            }
        },
        cuentaPropiaSwitch: {
            get(value){
                return this.datosBancarios.cuenta_propia
            },
            set(value){
                this.setCuentaPropia(value)
            }
        },
	},
	components: {
	},
    methods: {
        ...mapMutations('datosBancariosConductor', [
            'setTitular',
            'setTipoDeId',
            'setNumeroCuentaBancaria',
            'setTipoCuentaBancaria',
            'setBanco',
            'setCuentaPropia',
            'datosBancariosConductorFormReset',
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
.page-conductores-create {
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
