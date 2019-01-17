<template>
   <vue-scroll class="page-vehiculos-create">
       <el-form label-position="top" label-width="120px">
        <el-row>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <h3>Informacion basica</h3>
                </el-col>
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Placa">
                        <el-input size="mini"
                        @input="setPlaca"
                        >
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Modelo">
                        <el-input size="mini"
                        @input="setModelo"
                        >
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Marca cabezote">
                        <el-input size="mini"
                        @input="setMarcaCabezote"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Color">
                        <el-input size="mini"
                        @input="setColor"
                        >
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Propietario">
                        <el-row>
                            <el-col :span="11" :md="11" :sm="24" :xs="24">
                                <el-input 
                                size="mini"
                                @input="setPropietario"
                                placeholder="Nombre">
                                </el-input>
                            </el-col>
                            <el-col style="text-align: center;" :span="2" :md="2" :sm="24" :xs="24">
                                |
                            </el-col>
                            <el-col :span="11" :md="11" :sm="24" :xs="24">
                                <el-input 
                                size="mini"
                                @input="setCedulaPropietario"
                                placeholder="Nit/Cedula">
                                </el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Poseedor">
                        <el-row>
                            <el-col :span="11" :md="11" :sm="24" :xs="24">
                                <el-input 
                                size="mini"
                                @input="setPoseedor"
                                placeholder="Nombre">
                                </el-input>
                            </el-col>
                            <el-col style="text-align: center;" :span="2" :md="2" :sm="24" :xs="24">
                                |
                            </el-col>
                            <el-col :span="11" :md="11" :sm="24" :xs="24">
                                <el-input 
                                size="mini"
                                @input="setCedulaPoseedor"
                                placeholder="Nit/Cedula">
                                </el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Transportadora" prop="transportadora">
                        <el-select 
                        size="mini" 
                        filterable 
                        clearable
                        @change="setTransportadora"
                        :value="vehiculo.transportadora_id"
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
                    <h3>Informacion adicional</h3>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Linea cabezote">
                        <el-input size="mini"
                        @input="setLineaCabezote"
                        >
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Numero Motor">
                        <el-input size="mini"
                        @input="setNumeroMotor"
                        >
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Numero chasis">
                        <el-input size="mini"
                        @input="setNumeroChasis"
                        >
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <h3>Configuraciones</h3>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Peso">
                    <el-input-number size="mini" v-model="pesoNum" controls-position="right" @change="setPeso" :min="1" :max="1000"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Capasidad de carga">
                    <el-input-number size="mini" v-model="capacidadNum" controls-position="right" @change="setCapasidadCarga" :min="1" :max="1000"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de vehiculo">
                        <el-select size="mini" v-model="tipo_de_vehiculo_selected" placeholder="Select">
                            <el-option
                            v-for="item in tipo_de_vehiculo_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de flota">
                        <el-select size="mini" v-model="tipo_de_flota_selected" placeholder="Select">
                            <el-option
                            v-for="item in tipo_de_flota_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo configuracion">
                        <el-select size="mini" v-model="tipo_de_configuracion_selected" placeholder="Select">
                            <el-option
                            v-for="item in tipo_de_configuracion_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de combustible">
                        <el-select size="mini" v-model="tipo_de_combustible_selected" placeholder="Select">
                            <el-option
                            v-for="item in tipo_de_combustible_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Radica RNDC">
                        <el-switch
                            v-model="radicaRndc"
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
           
		}
	},
	computed: {
        tipo_de_combustible_selected: {
            get(){
                return this.vehiculo.tipo_de_combustible
            },
            set(value){
                this.setTipoDeCombustible(value)
            }
        },
        tipo_de_vehiculo_selected: {
            get(){
                return this.vehiculo.tipo_de_vehiculo
            },
            set(value){
                this.setTipoDeVehiculo(value)
            }
        },
        tipo_de_flota_selected: {
            get(){
                return this.vehiculo.tipo_de_flota
            },
            set(value){
                this.setTipoDeFlota(value)
            }
        },
        tipo_de_configuracion_selected: {
            get(){
                return this.vehiculo.tipo_configuracion
            },
            set(value){
                this.setTipoConfiguracion(value)
            }
        },
        radicaRndc: {
             get(){
                return this.vehiculo.radica_rndc
            },
            set(value){
                this.setRadicaRndc(value)
            }
        },
        
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('transportadoras', [
			'transportadorasList',
        ]),
        ...mapState('sharedValues', [
			'tipo_de_vehiculo_options',
            'tipo_de_flota_options',
            'tipo_de_configuracion_options',
            'tipo_de_combustible_options',
            'estado_options',
            'corroceria_options',
        ]),
        ...mapState('vehiculos', [
            'vehiculo',
            'headings',
            'vehiculosList',
            'dataReady',
            'selectedConductor',
            'selectedTrailer',
        ]),

	},
	components: {
	},
    methods: {
        back() {
			router.push('/Vehiculos')
		},
        ...mapMutations('vehiculos', [
            'setVehicleId',
            'setPlaca',
            'setNumeroChasis',
            'setTipoDeVehiculo',
            'setTipoConfiguracion',
            'setModelo',
            'setNumeroMotor',
            'setTipoDeFlota',
            'setMarcaCabezote',
            'setLineaCabezote',
            'setTipoDeCombustible',
            'setColor',
            'setPeso',
            'setCapasidadCarga',
            'setRadicaRndc',
            'setPoseedor',
            'setPropietario',
            'setCedulaPropietario',
            'setCedulaPoseedor',
            'setTransportadora',
        ]),
        title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
        },
        ...mapActions('vehiculos',[
            'fetchVehiculosList',
            'assignConductor',
            'assignTrailer',
            'createVehiculo',
        ]),
        ...mapActions('transportadoras',[
            'fetchTransportadorasList',
        ]),
    },
    created: function(){
        this.fetchTransportadorasList()
        this.fetchVehiculosList()
	}

}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';


.el-input-number{
    width: 120px;
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
