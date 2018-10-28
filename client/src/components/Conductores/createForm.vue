<template>

   <vue-scroll class="page-conductores-create">
       <el-form label-position="top" ref="form" :rules="rules" label-width="120px" clearValidate> 
        <el-row>
            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Codigo" prop="codigo">
                        <el-input 
                        @input="setCodigo"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de identificacion" prop="tipo_de_identificacion">
                        <el-select 
                        v-model="conductor.tipo_de_identificacion" 
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
			</el-col>

            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Cedula" prop="cedula">
                        <el-input 
                        @input="setCedula"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Municipio documento" prop="municipio_documento">
                        <el-input 
                        @input="setMunicipioDocumento"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
			</el-col>

            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Nombres" prop="nombres">
                        <el-input 
                        @input="setNombres"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Primer apellido" prop="primer_apellido">
                        <el-input 
                        @input="setPrimerApellido"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
			</el-col>

            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Segundo apellido" prop="segundo_apellido"> 
                        <el-input 
                        @input="setSegundoApellido"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de conductor" prop="tipo_conductor">
                        <el-input 
                        @input="setTipoDeConductor"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
			</el-col>

            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Direccion" prop="direccion">
                        <el-input 
                        @input="setDireccion"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Municipio" prop="municipio">
                        <el-input 
                        @input="setMunicipio"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
			</el-col>

            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Telefono 1" prop="telefono_1"> 
                        <el-input 
                        @input="setTelefono1"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Telefono 2" prop="telefono_2">
                        <el-input 
                        @input="setTelefono2"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
			</el-col>

            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Celular" prop="celular">
                        <el-input 
                        @input="setCelular"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Transportadora" prop="transportadora">
                        <el-input 
                        @input="setTransportadora"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
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
                    { required: true, message: 'Porfavor ingrese codigo', trigger: 'blur' }
                ],
                tipo_de_identificacion: [
                    { required: true, message: 'Porfavor ingrese tipo de identificacion', trigger: 'blur' }
                ],
                cedula: [
                    { required: true, message: 'Porfavor ingrese cedula', trigger: 'blur' }
                ],
                municipio_documento: [
                    { required: true, message: 'Porfavor ingrese municipio del documento', trigger: 'blur' }
                ],
                nombres: [
                    { required: true, message: 'Porfavor ingrese nombres', trigger: 'blur' }
                ],
                primer_apellido: [
                    { required: true, message: 'Porfavor ingrese primer apellido', trigger: 'blur' }
                ],
                segundo_apellido: [
                    { required: true, message: 'Porfavor ingrese segundo apellido', trigger: 'blur' }
                ],
                tipo_conductor: [
                    { required: true, message: 'Porfavor ingrese tipo conductor', trigger: 'blur' }
                ],
                direccion: [
                    { required: true, message: 'Porfavor ingrese direccion', trigger: 'blur' }
                ],
                municipio: [
                    { required: true, message: 'Porfavor ingrese municipio', trigger: 'blur' }
                ],
                telefono_1: [
                    { required: true, message: 'Porfavor ingrese telefono 1', trigger: 'blur' }
                ],
                telefono_2: [
                    { required: true, message: 'Porfavor ingrese telefono 2', trigger: 'blur' }
                ],
                celular: [
                    { required: true, message: 'Porfavor ingrese celular', trigger: 'blur' }
                ],
                transportadora: [
                    { required: true, message: 'Porfavor ingrese transportadora', trigger: 'blur' }
                ],
            }
		}
	},
	computed: {
        
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('conductores', [
			'conductor',
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
        back() {
			router.push('/COnductores')
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
        ]),
        title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
        },
        ...mapActions('conductores',[
            'createConductor',
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
