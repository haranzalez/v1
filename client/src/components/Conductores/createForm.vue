<template>

   <vue-scroll class="page-conductores-create">
       <el-form label-position="top" ref="form" :status-icon="true" :show-message="false" label-width="120px" clearValidate> 
        <el-row>
            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Codigo" prop="codigo">
                        <el-input size="mini" 
                        @input="setCodigo"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de identificacion" prop="tipo_de_identificacion">
                        <el-select size="mini" 
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
                        <el-input size="mini" 
                        @input="setCedula"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Municipio documento" prop="municipio_documento">
                        <el-input size="mini" 
                        @input="setMunicipioDocumento"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
			</el-col>

            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Nombres" prop="nombres">
                        <el-input size="mini" 
                        @input="setNombres"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Primer apellido" prop="primer_apellido">
                        <el-input size="mini" 
                        @input="setPrimerApellido"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
			</el-col>

            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Segundo apellido" prop="segundo_apellido"> 
                        <el-input size="mini" 
                        @input="setSegundoApellido"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de conductor" prop="tipo_conductor">
                        <el-input size="mini" 
                        @input="setTipoDeConductor"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
			</el-col>

            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Direccion" prop="direccion">
                        <el-input size="mini" 
                        @input="setDireccion"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Municipio" prop="municipio">
                        <el-input size="mini" 
                        @input="setMunicipio"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
			</el-col>

            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Telefono 1" prop="telefono_1"> 
                        <el-input size="mini" 
                        @input="setTelefono1"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Telefono 2" prop="telefono_2">
                        <el-input size="mini" 
                        @input="setTelefono2"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
			</el-col>

            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Celular" prop="celular">
                        <el-input size="mini" 
                        @input="setCelular"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Transportadora" prop="transportadora">
                        <el-input size="mini" 
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
