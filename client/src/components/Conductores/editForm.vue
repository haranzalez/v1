<template>

  <vue-scroll class="page-conductores-edit">
       <el-form label-position="top" ref="form" label-width="120px">
        <el-row>
            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Codigo">
                        <el-input size="mini" 
                        :value="conductor.codigo"
                        :disabled="(permisos['Conductores'].editar)? false:true"
                        
                        @input="setCodigo"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de identificacion">
                        <el-select size="mini" 
                        :value="conductor.tipo_de_identificacion"
                        :disabled="(permisos['Conductores'].editar)? false:true"
                        
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
                    <el-form-item label="Cedula">
                        <el-input size="mini"
                        :value="conductor.cedula"
                        :disabled="(permisos['Conductores'].editar)? false:true"
                        
                        @input="setCedula"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Municipio documento">
                        <el-input size="mini" 
                        :value="conductor.municipio_documento"
                        :disabled="(permisos['Conductores'].editar)? false:true"
                        
                        @input="setMunicipioDocumento"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
			</el-col>

            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Nombres">
                        <el-input size="mini" 
                        :value="conductor.nombres"
                        :disabled="(permisos['Conductores'].editar)? false:true"
                       
                        @input="setNombres"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Primer apellido">
                        <el-input size="mini" 
                        :value="conductor.primer_apellido"
                        :disabled="(permisos['Conductores'].editar)? false:true"
                       
                        @input="setPrimerApellido"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
			</el-col>

            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Segundo apellido">
                        <el-input size="mini" 
                        :value="conductor.segundo_apellido"
                        :disabled="(permisos['Conductores'].editar)? false:true"
                       
                        @input="setSegundoApellido"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de conductor">
                        <el-input size="mini" 
                        :value="conductor.tipo_de_conductor"
                        :disabled="(permisos['Conductores'].editar)? false:true"
                        
                        @input="setTipoDeConductor"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
			</el-col>

            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Direccion">
                        <el-input size="mini" 
                        :value="conductor.direccion"
                        :disabled="(permisos['Conductores'].editar)? false:true"
                       
                        @input="setDireccion"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Municipio">
                        <el-input size="mini" 
                        :value="conductor.municipio"
                        :disabled="(permisos['Conductores'].editar)? false:true"
                      
                        @input="setMunicipio"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
			</el-col>

            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Telefono 1">
                        <el-input size="mini" 
                        :value="conductor.telefono_1"
                        :disabled="(permisos['Conductores'].editar)? false:true"
                        
                        @input="setTelefono1"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Telefono 2">
                        <el-input size="mini" 
                        :value="conductor.telefono_2"
                        :disabled="(permisos['Conductores'].editar)? false:true"
                        
                        @input="setTelefono2"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
			</el-col>

            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Celular">
                        <el-input size="mini" 
                        :value="conductor.celular"
                        :disabled="(permisos['Conductores'].editar)? false:true"
                        
                        @input="setCelular"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Transportadora">
                        <el-input size="mini" 
                        :value="conductor.transportadora"
                        :disabled="(permisos['Conductores'].editar)? false:true"
                        
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
	name: 'ConductoresEditForm',
	data () {
      	return {
              targetInputEditing: '',
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
            if(e == 'del'){
                this.del()
            }
            if(e == 'edit'){
                this.editConductor()
            }
            if(e == 'back'){
                this.back()
            }
        },
        back() {
			router.push('/Conductores')
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
            'editConductor',
            'delConductor',
        ]),
        del(){
            this.$confirm('Esta operacion eliminara permanentemente este registro. Continuar?', 'Atencion!', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancelar',
                type: 'warning'
            }).then(() => {
                this.delConductor()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Cancelado'
                });          
            });
        }
    },
    created(){
        console.log(this.permisos)
    },

}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';
.page-conductores-edit {
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
