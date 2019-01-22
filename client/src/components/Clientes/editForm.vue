<template>
   <vue-scroll class="page-trailers-create">
       <el-form size="mini" label-position="top" ref="form" label-width="120px">
        <el-row>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <h3>Info</h3>
                </el-col>
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Nombre razon social">
                        <el-input size="mini" 
                        :value="cliente.nombre_razon_social"
                        @input="setNombreRazonSocial"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="NIT">
                        <el-input size="mini" 
                        :value="cliente.nit"
                        @input="setNit"
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
                    <el-form-item label="Persona de contacto">
                        <el-input size="mini" 
                        :value="cliente.persona_de_contacto"
                        @input="setPersonaDeContacto"
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
	name: 'RutasEditForm',
	data () {
      	return {

		}
    },
	computed: {
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

	},
	components: {
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
        ]),
        title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
        },
       
    },
    created(){
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
