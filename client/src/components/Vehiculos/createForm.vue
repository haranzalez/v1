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
                        <el-select 
                        size="mini" 
                        filterable 
                        remote
                        width="100%"
                        clearable
                        :loading="marcasVehiculoListLoading"
                        :remote-method="searchMarcasVehiculosList"
                        v-model="marca_cabezote_selected"
                        placeholder="Porfavor escriba palabra clave">
                            <el-option
                            v-for="item in marcas_vehiculos_options"
                            :key="item.id"
                            :label="item.descripcion"
                            :value="item.descripcion">
                            </el-option>
                        </el-select>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Linea cabezote">
                        <el-select 
                        size="mini" 
                        filterable 
                        remote
                        clearable
                        :loading="lineaVehiculoListLoading"
                        :remote-method="searchLineaVehiculosList"
                        v-model="linea_cabezote_selected"
                        placeholder="Porfavor escriba palabra clave">
                            <el-option
                            v-for="item in linea_cabezotes_options"
                            :key="item.id"
                            :label="item.descripcion"
                            :value="item.descripcion">
                            </el-option>
                        </el-select>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Color">
                        <el-select 
                        size="mini" 
                        filterable 
                        remote
                        clearable
                        :loading="coloresVehiculoListLoading"
                        :remote-method="searchColoresVehiculosList"
                        v-model="color_selected"
                        placeholder="Porfavor escriba palabra clave">
                            <el-option
                            v-for="item in colores_vehiculos_options"
                            :key="item.id"
                            :label="item.nombrecolor"
                            :value="item.nombrecolor">
                            </el-option>
                        </el-select>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <h3>Propietario</h3>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item :label="(vehiculo.tipo_de_id_propietario == 'Cedula')?'Nombres y apellidos':'Nombre razon social'">
                        <el-input 
                        size="mini"
                        @input="setPropietario"
                        placeholder="">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :md="6" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo id">
                        <el-select size="mini" v-model="tipo_de_id_propietario" placeholder="">
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
                    <el-form-item :label="vehiculo.tipo_de_id_propietario">
                        <el-input size="mini" 
                        @input="setCedulaPropietario"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="4" :md="4" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="DV">
                        <el-input :disabled="(vehiculo.tipo_de_id_propietario == 'Cedula')?true:false" size="mini" 
                        @input="setDigitoDeVerificacionPropietario"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>

                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <h3>Tenedor</h3>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item :label="(vehiculo.tipo_de_id_tenedor == 'Cedula')?'Nombres y apellidos':'Nombre razon social'">
                        <el-input 
                        size="mini"
                        @input="setTenedor"
                        placeholder="">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :md="6" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo id">
                        <el-select size="mini" v-model="tipo_de_id_tenedor" placeholder="">
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
                    <el-form-item :label="vehiculo.tipo_de_id_tenedor">
                        <el-input size="mini" 
                        @input="setCedulaTenedor"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="4" :md="4" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="DV">
                        <el-input :disabled="(vehiculo.tipo_de_id_tenedor == 'Cedula')?true:false" size="mini" 
                        @input="setDigitoDeVerificacionTenedor"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>

               
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <h3>Informacion adicional</h3>
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
                    <el-form-item label="Numero de ejes">
                    <el-input-number size="mini" v-model="ejesNum" controls-position="right" @change="setNumeroDeEjes" :min="1" :max="1000"></el-input-number>
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
                    <el-form-item label="Tipo de carroceria">
                        <el-select 
                        size="mini" 
                        filterable 
                        remote
                        clearable
                        :loading="tipoCarroceriaListLoading"
                        :remote-method="searchTipoCarroceria"
                        v-model="tipo_carroceria_selected"
                        placeholder="Porfavor escriba palabra clave">
                            <el-option
                            v-for="item in tipo_carroceria_options"
                            :key="item.id"
                            :label="item.descripcion"
                            :value="item.descripcion">
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
                    <el-form-item label="Conductor">
                        <el-select size="mini" v-model="conductor_selected" placeholder="Select">
                            <el-option
                            v-for="item in conductoresList"
                            :key="item.id"
                            :label="item.nombres+' '+item.primer_apellido+' '+item.segundo_apellido"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Trailer">
                        <el-select size="mini" v-model="trailer_selected" placeholder="Select">
                            <el-option
                            v-for="item in trailersList"
                            :key="item.id"
                            :label="item.placa"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Estado">
                        <el-select clearable size="mini" v-model="estado_selected" placeholder="Select">
                            <el-option
                            v-for="item in estado_options"
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
            ejesNum: 1,
           
		}
	},
	computed: {
        tipo_de_id_propietario: {
            get(){
                return this.vehiculo.tipo_de_id_propietario
            },
            set(value){
                this.setTipoDeIdPropietario(value)
            }   
        },
        tipo_de_id_tenedor: {
            get(){
                return this.vehiculo.tipo_de_id_tenedor
            },
            set(value){
                this.setTipoDeIdTenedor(value)
            }   
        },
        tipo_carroceria_selected: {
            get(){
                return this.vehiculo.tipo_de_carroceria
            },
            set(value){
                this.setTipoDeCarroceria(value)
            }
        },
        linea_cabezote_selected: {
            get(){
                return this.vehiculo.linea_cabezote
            },
            set(value){
                this.setLineaCabezote(value)
            }
        },
        color_selected: {
            get(){
                return this.vehiculo.color
            },
            set(value){
                this.setColor(value)
            }
        },
        marca_cabezote_selected: {
            get(){
                return this.vehiculo.marca_cabezote
            },
            set(value){
                this.setMarcaCabezote(value)
            }
        },
        trailer_selected: {
            get(){
                return this.selectedTrailer
            },
            set(value){
                this.setSelectedTrailer(value)
            }
        },
        conductor_selected: {
            get(){
                return this.selectedConductor
            },
            set(value){
                this.setSelectedConductor(value)
            }
        },
        estado_selected: {
            get(){
                return this.vehiculo.estado
            },
            set(value){
                this.setEstado(value)
            }
        },
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
            'full_loading',
            'marcas_vehiculos_options',
            'colores_vehiculos_options',
            'linea_cabezotes_options',
            'lineaVehiculoListLoading',
            'coloresVehiculoListLoading',
            'marcasVehiculoListLoading',
            'tipo_carroceria_options',
            'tipoCarroceriaListLoading',
            'tipo_de_id_options',
        ]),
        ...mapState('vehiculos', [
            'vehiculo',
            'headings',
            'vehiculosList',
            'dataReady',
            'selectedConductor',
            'selectedTrailer',
        ]),
        ...mapState('conductores', [
            'conductoresList',
        ]),
        ...mapState('trailers', [
            'trailersList',
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
            'setTenedor',
            'setCedulaTenedor',
            'setCedulaPropietario',
            'setCedulaPoseedor',
            'setTransportadora',
            'setEstado',
            'setSelectedTrailer',
            'setSelectedConductor',
            'resetVehicleVariables',
            'setTipoDeCarroceria',
            'setNumeroDeEjes',
            'setDigitoDeVerificacionTenedor',
            'setDigitoDeVerificacionPropietario',
            'setTipoDeIdPropietario',
            'setTipoDeIdTenedor',
        ]),
        title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
        },
        ...mapActions('sharedValues',[
            'searchMarcasVehiculosList',
            'searchColoresVehiculosList',
            'searchLineaVehiculosList',
            'searchTipoCarroceria',
        ]),
        ...mapActions('vehiculos',[
            'fetchVehiculosList',
            'assignConductor',
            'assignTrailer',
            'createVehiculo',
        ]),
        ...mapActions('conductores',[
            'fetchConductoresList',
        ]),
        ...mapActions('trailers',[
            'fetchTrailersList',
        ]),
        ...mapActions('transportadoras',[
            'fetchTransportadorasList',
        ]),
    },
    created: function(){
        this.fetchTransportadorasList()
        this.fetchConductoresList()
        this.fetchTrailersList()
	}

}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

.el-select{
    width: 100%;
}
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
