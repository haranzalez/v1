<template>
   <vue-scroll class="page-vehiculos-create">
       <el-form size="mini" label-position="top" ref="form" label-width="120px">
        <el-row>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <h3>Info</h3>
                </el-col>
				
                <el-col :span="6" :md="6" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo">
                        <el-select size="mini" v-model="tipo_de_id" placeholder="">
                            <el-option
                            v-for="item in tipo_de_id_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
				</el-col>
                <el-col :span="14" :md="14" :sm="24" :xs="24" class="col-p">
                    <el-form-item :label="cliente.tipo_de_id">
                        <el-input size="mini" 
                        @input="setNit"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="4" :md="4" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="DV">
                        <el-input :disabled="(cliente.tipo_de_id == 'Cedula')?true:false" size="mini" 
                        @input="setDigitoDeVerificacion"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item :label="(cliente.tipo_de_id == 'NIT')?'Nombre razon social':'Nombre y apellidos'">
                        <el-input size="mini" 
                        @input="setNombreRazonSocial"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Direccion">
                        <el-input size="mini" 
                        @input="setDireccion"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Ciudad">
                        <el-select 
                        size="mini" 
                        filterable 
                        remote
                        clearable
                        :loading="municipiosListLoading"
                        :remote-method="searchMunicipios"
                        v-model="municipio_selected"
                        placeholder="Porfavor escriba palabra clave">
                            <el-option
                            v-for="item in municipios_options"
                            :key="item.id"
                            :label="item.nombre_municipio"
                            :value="item.nombre_municipio">
                            </el-option>
                        </el-select>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Sede">
                        <el-input size="mini" 
                        @input="setSede"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Email">
                        <el-input size="mini" 
                        @input="setEmail"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Telefono">
                        <el-input size="mini" 
                        @input="setTelefono"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Celular">
                        <el-input size="mini" 
                        @input="setCelular"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Direccion envio de factura">
                        <el-input size="mini" 
                        @input="setDireccionEnvioDeFactura"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <h3>Tipo de contrato</h3>
                </el-col>
                   <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                        <el-form-item label="Contrato">
                            <el-select v-model="selectedContrato" placeholder="Select">
                                <el-option
                                v-for="item in contratoOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                        <el-form-item label="Dias">
                            <el-select v-model="selectedDias" placeholder="Select">
                                <el-option
                                v-for="item in diasOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                        <el-form-item label="Cupo">
                            <el-input size="mini" 
                            @input="setCupo"
                            placeholder="">
                            </el-input>
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
	name: 'RutasCreateForm',
	data () {
      	return {
          
		}
	},
	computed: {
        tipo_de_id: {
            get(){
                return this.cliente.tipo_de_id
            },
            set(value){
                this.setTipoDeId(value)
            }   
        },
        municipio_selected: {
            get(){
                return this.cliente.ciudad
            },
            set(value){
                this.setCiudad(value)
            }
        },
        selectedContrato: {
            get(){
                return this.cliente.contrato
            },
            set(value){
                this.setSelectedContrato(value)
            }   
        },
        selectedDias: {
            get(){
                return this.cliente.dias
            },
            set(value){
                this.setSelectedDias(value)
            }   
        },
        radicaRn: {
            get(){
                return this.cliente.radica_rndc
            },
            set(value){
                this.setRadicaRndc(value)
            }
        },
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('clientes', [
            'cliente',
            'contratoOptions',
            'diasOptions',
        ]),
        ...mapState('sharedValues', [
            'municipios_options',
            'municipiosListLoading',
            'tipo_de_id_options',
        ]),

    },
	components: {
	},
    methods: {
        ...mapActions('sharedValues',[
            'searchMunicipios',
        ]),
        ...mapMutations('clientes', [
            'setNombreRazonSocial',
            'setNit',
            'setDireccion',
            'setEmail',
            'setTelefono',
            'setCelular',
            'setCiudad',
            'setPersonaDeContacto',
            'setDireccionEnvioDeFactura',
            'setTipoContrato',
            'setCelular',
            'setSelectedContrato',
            'setSelectedDias',
            'setCupo',
            'setRadicaRndc',
            'setDigitoDeVerificacion',
            'setSede',
            'setTipoDeId',
        ]),
       
    },
 


}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';
.padding{
    padding:0px 5px;
}
.el-select{
    width: 100%;
}
.page-vehiculos-create {
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
