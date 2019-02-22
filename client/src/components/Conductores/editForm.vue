<template>

  <vue-scroll class="page-conductores-edit">
       <el-form label-position="top" ref="form" label-width="120px">
        <el-row>
            
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Codigo">
                    <el-input size="mini" 
                    :value="conductor.codigo"
                    :disabled="(permisos['Conductores'].editar)? false:true"
                    
                    @input="setCodigo"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
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
    
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Cedula">
                    <el-input size="mini"
                    :value="conductor.cedula"
                    :disabled="(permisos['Conductores'].editar)? false:true"
                    
                    @input="setCedula"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Municipio documento">
                    <el-input size="mini" 
                    :value="conductor.municipio_documento"
                    :disabled="(permisos['Conductores'].editar)? false:true"
                    
                    @input="setMunicipioDocumento"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
    
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Nombres">
                    <el-input size="mini" 
                    :value="conductor.nombres"
                    :disabled="(permisos['Conductores'].editar)? false:true"
                    
                    @input="setNombres"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Primer apellido">
                    <el-input size="mini" 
                    :value="conductor.primer_apellido"
                    :disabled="(permisos['Conductores'].editar)? false:true"
                    
                    @input="setPrimerApellido"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
    
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Segundo apellido">
                    <el-input size="mini" 
                    :value="conductor.segundo_apellido"
                    :disabled="(permisos['Conductores'].editar)? false:true"
                    
                    @input="setSegundoApellido"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Tipo de conductor" prop="tipo_conductor">
                    <el-select 
                    size="mini" 
                    filterable 
                    v-model="tipo_conductor_selected"
                    placeholder="Seleccione">
                        <el-option
                        v-for="item in tipo_de_conductor_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
    
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Direccion">
                    <el-input size="mini" 
                    :value="conductor.direccion"
                    :disabled="(permisos['Conductores'].editar)? false:true"
                    
                    @input="setDireccion"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Municipio">
                    <el-input size="mini" 
                    :value="conductor.municipio"
                    :disabled="(permisos['Conductores'].editar)? false:true"
                    
                    @input="setMunicipio"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
    
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Telefono 1">
                    <el-input size="mini" 
                    :value="conductor.telefono_1"
                    :disabled="(permisos['Conductores'].editar)? false:true"
                    
                    @input="setTelefono1"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Telefono 2">
                    <el-input size="mini" 
                    :value="conductor.telefono_2"
                    :disabled="(permisos['Conductores'].editar)? false:true"
                    
                    @input="setTelefono2"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
    
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Celular">
                    <el-input size="mini" 
                    :value="conductor.celular"
                    :disabled="(permisos['Conductores'].editar)? false:true"
                    
                    @input="setCelular"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Transportadora">
                    <el-select size="mini" filterable v-model="transportadora_selected" placeholder="Seleccione">
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
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Estado">
                        <el-switch
                        v-model="estado"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-text="Activo"
                        inactive-text="Inactivo">
                        </el-switch>
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
        tipo_conductor_selected: {
            get(){
                return this.conductor.tipo_de_conductor
            },
            set(value){
                this.setTipoDeConductor(value)
            }
        },
        estado: {
            get(){
                return this.conductor.estado
            },
            set(value){
                this.setEstado(value)
            }
        },
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
        ...mapState('transportadoras', [
			'transportadorasList',
        ]),
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('conductores', [
            'conductor',
        ]),
        ...mapState('sharedValues', [
			'tipo_de_conductor_options',
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
            'setRadicaRndc',
            'setAnticipo',
            'setEstado',
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
        ...mapActions('transportadoras',[
            'fetchTransportadorasList',
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
        this.fetchTransportadorasList()
    },

}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';
.el-select{
    width: 100%;
}
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
