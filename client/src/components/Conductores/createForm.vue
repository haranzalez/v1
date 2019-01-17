<template>

   <vue-scroll class="page-conductores-create">
       <el-form label-position="top" ref="form" :status-icon="true" :show-message="false" label-width="120px" clearValidate> 
        <el-row>
           
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Codigo" prop="codigo">
                        <el-input size="mini" 
                        @input="setCodigo"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de identificacion" prop="tipo_de_identificacion">
                        <el-select size="mini" 
                        :value="conductor.tipo_de_identificacion" 
                        placeholder="Select"
                        @change="setTipoDeiIdentificacion">
                            <el-option
                            v-for="item in tipoIdentificacionOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
				</el-col>
			
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Cedula" prop="cedula">
                        <el-input size="mini" 
                        @input="setCedula"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Municipio documento" prop="municipio_documento">
                        <el-input size="mini" 
                        @input="setMunicipioDocumento"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
		
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Nombres" prop="nombres">
                        <el-input size="mini" 
                        @input="setNombres"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Primer apellido" prop="primer_apellido">
                        <el-input size="mini" 
                        @input="setPrimerApellido"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
		
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Segundo apellido" prop="segundo_apellido"> 
                        <el-input size="mini" 
                        @input="setSegundoApellido"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de conductor" prop="tipo_conductor">
                        <el-input size="mini" 
                        @input="setTipoDeConductor"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
		
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Direccion" prop="direccion">
                        <el-input size="mini" 
                        @input="setDireccion"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Municipio" prop="municipio">
                        <el-input size="mini" 
                        @input="setMunicipio"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
		
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Telefono 1" prop="telefono_1"> 
                        <el-input size="mini" 
                        @input="setTelefono1"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Telefono 2" prop="telefono_2">
                        <el-input size="mini" 
                        @input="setTelefono2"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
		
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Celular" prop="celular">
                        <el-input size="mini" 
                        @input="setCelular"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Transportadora" prop="transportadora">
                        <el-select 
                        size="mini" 
                        filterable 
                        @change="setTransportadora"
                        :value="conductor.transportadora_id"
                        placeholder="Seleccione">
                            <el-option
                            v-for="item in transportadorasList"
                            :key="item.id"
                            :label="item.razon_social"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Radica RNDC">
                        <el-switch
                        v-model="radicaRn"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-text="Si"
                        inactive-text="No">
                        </el-switch>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Anticipo">
                        <el-switch
                        v-model="anticipoState"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
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
	name: 'VehiculoCreateForm',
	data () {
      	return {
              capacidadNum: 1,
              pesoNum: 1,
              tipoIdentificacionOptions: [
                {
                    value: 'cedula',
                    label: 'Cedula',
                },
                {
                    value: 'pasaporte',
                    label: 'Pasaporte',
                },
              ],
              rules: {
                codigo: [
                    { required: true, trigger: 'blur' }
                ],
                tipo_de_identificacion: [
                    { required: true,  trigger: 'blur' }
                ],
                cedula: [
                    { required: true,  trigger: 'blur' }
                ],
                municipio_documento: [
                    { required: true,  trigger: 'blur' }
                ],
                nombres: [
                    { required: true,  trigger: 'blur' }
                ],
                primer_apellido: [
                    { required: true,  trigger: 'blur' }
                ],
                segundo_apellido: [
                    { required: true,  trigger: 'blur' }
                ],
                tipo_conductor: [
                    { required: true,  trigger: 'blur' }
                ],
                direccion: [
                    { required: true,  trigger: 'blur' }
                ],
                municipio: [
                    { required: true,  trigger: 'blur' }
                ],
                telefono_1: [
                    { required: true,  trigger: 'blur' }
                ],
                telefono_2: [
                    { required: true, trigger: 'blur' }
                ],
                celular: [
                    { required: true, trigger: 'blur' }
                ],
                transportadora: [
                    { required: true, trigger: 'blur' }
                ],
            }
		}
	},
	computed: {
        anticipoState: {
            get(){
                return this.conductor.anticipo
            },
            set(value){
                this.setAnticipo(value)
            }
        },
        radicaRn: {
            get(){
                return this.conductor.radica_rndc
            },
            set(value){
                this.setRadicaRndc(value)
            }
        },
        transportadora_selected: {
            get(){
                return this.conductor.transportadora_id
            },
            set(value){
                this.setTransportadora(value)
            }
        },
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('conductores', [
			'conductor',
        ]),
        ...mapState('transportadoras', [
			'transportadorasList',
        ]),

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
            'setSelectedTipoIdentificacion',
            'setCodigo',
            'setTipoDeiIdentificacion',
            'setCedula',
            'setMunicipioDocumento',
            'setNombres',
            'setPrimerApellido',
            'setSegundoApellido',
            'setTipoDeConductor',
            'setDireccion',
            'setMunicipio',
            'setTelefono1',
            'setTelefono2',
            'setCelular',
            'setTransportadora',
            'setRadicaRndc',
            'setAnticipo',
        ]),
        title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
        },
        ...mapActions('conductores',[
            'createConductor',
        ]),
        ...mapActions('transportadoras',[
            'fetchTransportadorasList',
        ]),
    },
    created: function(){
       this.fetchTransportadorasList()
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
