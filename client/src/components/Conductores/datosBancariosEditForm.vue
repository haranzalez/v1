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
                        :value="datosBancarios.titular"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de ID">
                        <el-input size="mini" 
                        @input="setTipoDeId"
                        :value="datosBancarios.tipo_de_id"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Numero cuenta bancaria">
                        <el-input size="mini" 
                        :value="datosBancarios.numero_cuenta_bancaria"
                        @input="setNumeroCuentaBancaria"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
		
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo cuenta bancaria">
                        <el-input size="mini" 
                        :value="datosBancarios.tipo_cuenta_bancaria"
                        @input="setTipoCuentaBancaria"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Banco">
                        <el-input size="mini" 
                        :value="datosBancarios.banco"
                        @input="setBanco"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
		
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Cuanta propia"> 
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
