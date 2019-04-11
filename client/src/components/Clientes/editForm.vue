<template>
   <vue-scroll class="page-trailers-create">
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
                        :value="cliente.nit"
                        @input="setNit"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="4" :md="4" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="DV">
                        <el-input :disabled="(cliente.tipo_de_id == 'Cedula')?true:false" size="mini" 
                        @input="setDigitoDeVerificacion"
                        :value="cliente.digito_de_verificacion"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item :label="(cliente.tipo_de_id == 'NIT')?'Nombre razon social':'Nombre y apellidos'">
                        <el-input size="mini" 
                        :value="cliente.nombre_razon_social"
                        @input="setNombreRazonSocial"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Direccion">
                        <el-input size="mini" 
                        :value="cliente.direccion"
                        @input="setDireccion"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Ciudad">
                        <el-input size="mini" 
                        :value="cliente.ciudad"
                        @input="setCiudad"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                 <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Sede">
                        <el-input size="mini" 
                        @input="setSede"
                        :value="cliente.sede"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Email">
                        <el-input size="mini" 
                        :value="cliente.email"
                        @input="setEmail"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Telefono">
                        <el-input size="mini" 
                        :value="cliente.telefono"
                        @input="setTelefono"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Celular">
                        <el-input size="mini" 
                        :value="cliente.celular"
                        @input="setCelular"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Direccion envio de factura">
                        <el-input size="mini" 
                        :value="cliente.direccion_envio_de_factura"
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
                        :value="(cliente.tipo_negociacion !== null)?cliente.tipo_negociacion.cupo:0"
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
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <h3>Personas de contacto</h3>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <personaDeContactoTable></personaDeContactoTable>
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
//components
import personaDeContactoTable from './personaDeContactoTable'

export default {
	name: 'ClientesEditForm',
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
            'tipo_de_id_options',
        ]),

	},
	components: {
        personaDeContactoTable,
	},
    methods: {
        del(){
            this.$confirm('Esta operacion eliminara permanentemente este registro. Continuar?', 'Atencion!', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancelar',
                type: 'warning'
            }).then(() => {
                this.delCliente()
            }).catch(() => {
                this.$message({
                    type: 'success',
                    message: 'Cancelado'
                });          
            });
        },
        ...mapActions('personaDeContactoClientes',[
			'fetchContactosList',
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
        title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
        },
       
    },
    created(){
        this.fetchContactosList()
    }


}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';
.padding{
    padding:0px 5px;
}
.page-trailers-create {
	.label-switch-box {
		display: block;
		clear: both;
		width: 100%;
		text-align: right;
		margin-bottom: 20px;
	}
	.col-p {
        padding: 0px 10px;
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
