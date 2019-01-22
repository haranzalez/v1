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
                        @input="setTipo_de_id"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Numero cuneta bancaria">
                        <el-input size="mini" 
                        @input="setNumero_cuenta_bancaria"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
		
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo cuneta bancaria">
                        <el-input size="mini" 
                        @input="setTipo_cuenta_bancaria"
                        placeholder="">
                        </el-input>
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
	name: 'ConductorDatosBancarios - crear',
	data () {
      	return {
            
		}
	},
	computed: {
        
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('conductores', [
            'conductor',
            'datosBancarios',
            'cuentaPropiaSwitchCreate',
            'radicaRndcSwitchCreate'
        ]),
        cuentaPropiaSwitch: {
            get(value){
                return this.cuentaPropiaSwitchCreate
            },
            set(value){
                console.log(value)
                this.setCuenta_propia({value: value, op: 'create'})
            }
        },
        radicaRndcSwitch: {
            get(value){
                return this.radicaRndcSwitchCreate
            },
            set(value){
                this.setRadica_rndc({value: value, op: 'create'})
            }
        }
	},
	components: {
	},
    methods: {
         handleAction(e){
            if(e == 'create'){
                this.createConductor()
            }
            if(e == 'back'){
                this.back()
            }
        },
        ...mapMutations('conductores', [
            'setTitular',
            'setTipo_de_id',
            'setNumero_cuenta_bancaria',
            'setTipo_cuenta_bancaria',
            'setBanco',
            'setCuenta_propia',
            'setRadica_rndc',
        ]),
        title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
        },
        ...mapActions('conductores',[
            'create_datos_bancarios',
        ]),
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
