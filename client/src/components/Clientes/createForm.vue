<template>
   <vue-scroll class="page-vehiculos-create">
       <el-form size="mini" label-position="top" ref="form" label-width="120px">
        <el-row>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <h3>Info</h3>
                </el-col>
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Nombre razon social">
                        <el-input size="mini" 
                        @input="setNombreRazonSocial"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="NIT">
                        <el-input size="mini" 
                        @input="setNit"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Digito de verificacion">
                        <el-input size="mini" 
                        @input="setDigitoDeVerificacion"
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
                        <el-input size="mini" 
                        @input="setCiudad"
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
                    <el-form-item label="Persona de contacto">
                        <el-input size="mini" 
                        @input="setPersonaDeContacto"
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
