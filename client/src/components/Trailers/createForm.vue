<template>
   <vue-scroll class="page-trailers-create">
       <el-form label-position="top" ref="trailersCreateForm" label-width="120px">
        <el-row>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <h3>Informacion basica</h3>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Placa">
                    <el-input 
                    size="mini"
                    @input="setPlaca"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Modelo">
                    <el-input 
                    size="mini"
                    @input="setModelo"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Marca trailer">
                    <el-select 
                    size="mini" 
                    filterable 
                    remote
                    width="100%"
                    clearable
                    :loading="marcasSemiRemolquesListLoading"
                    :remote-method="searchMarcasSemiRemolquesList"
                    v-model="marca_trailer_selected"
                    placeholder="Porfavor escriba palabra clave">
                        <el-option
                        v-for="item in marcas_semiremolques_options"
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
                <el-col :span="6" :md="6" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de id">
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
                    <el-form-item :label="trailer.tipo_de_id_propietario">
                        <el-input size="mini" 
                        @input="setCedulaPropietario"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="4" :md="4" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="DV">
                        <el-input :disabled="(trailer.tipo_de_id_propietario == 'Cedula')?true:false" size="mini" 
                        @input="setDigitoDeVerificacionPropietario"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item :label="(trailer.tipo_de_id_propietario == 'Cedula')?'Nombres y apellidos':'Nombre razon social'">
                        <el-input 
                        size="mini"
                        @input="setPropietario"
                        placeholder="">
                        </el-input>
                    </el-form-item>
                </el-col>
                

                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <h3>Tenedor</h3>
                </el-col>
                <el-col :span="6" :md="6" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de id">
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
                    <el-form-item :label="trailer.tipo_de_id_tenedor">
                        <el-input size="mini" 
                        @input="setCedulaTenedor"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="4" :md="4" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="DV">
                        <el-input :disabled="(trailer.tipo_de_id_tenedor == 'Cedula')?true:false" size="mini" 
                        @input="setDigitoDeVerificacionTenedor"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item :label="(trailer.tipo_de_id_tenedor == 'Cedula')?'Nombres y apellidos':'Nombre razon social'">
                        <el-input 
                        size="mini"
                        @input="setTenedor"
                        placeholder="">
                        </el-input>
                    </el-form-item>
                </el-col>
                
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Transportadora" prop="transportadora">
                    <el-select 
                    size="mini" 
                    filterable 
                    clearable
                    @change="setTransportadora"
                    :value="trailer.transportadora_id"
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
                <el-form-item label="Tipo de vehiculo">
                     <el-select clearable size="mini" v-model="tipo_de_vehiculo_selected" placeholder="Select">
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
                    <el-select clearable size="mini" v-model="tipo_de_flota_selected" placeholder="Select">
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
                <el-form-item label="Tipo de configuracion">
                    <el-select clearable size="mini" v-model="tipo_de_configuracion_selected" placeholder="Select">
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
                <el-form-item label="Peso en Kg.">
                    <el-input 
                    size="mini"
                    @input="setPeso"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Radica RNDC">
                    <el-switch
                    v-model="radicaRn"
                    @change="radicaChange"
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
              radicaRn: false,
              capacidadNum: 1,
              pesoNum: 1,
		}
	},
	computed: {
        color_selected: {
            get(){
                return this.trailer.color
            },
            set(value){
                this.setColor(value)
            }
        },
        tipo_de_id_propietario: {
            get(){
                return this.trailer.tipo_de_id_propietario
            },
            set(value){
                this.setTipoDeIdPropietario(value)
            }   
        },
        tipo_de_id_tenedor: {
            get(){
                return this.trailer.tipo_de_id_tenedor
            },
            set(value){
                this.setTipoDeIdTenedor(value)
            }   
        },
        marca_trailer_selected: {
            get(){
                return this.trailer.marca_trailer
            },
            set(value){
                this.setMarcaTrailer(value)
            }
        },
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
            'marcas_semiremolques_options',
            'marcasSemiRemolquesListLoading',
            'tipoCarroceriaListLoading',
            'tipo_carroceria_options',
            'tipo_de_id_options',
            'colores_vehiculos_options',
            'coloresVehiculoListLoading',
        ]),
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('trailers', [
			'trailer',
        ]),
        estado_selected: {
            get(){
                return this.trailer.estado
            },
            set(value){
                this.setEstado(value)
            }
        },
        tipo_carroceria_selected: {
            get(){
                return this.trailer.tipo_carroceria
            },
            set(value){
                this.setTipoCarroceria(value)
            }
        },
        tipo_de_vehiculo_selected: {
            get(){
                return this.trailer.tipo_de_vehiculo
            },
            set(value){
                this.setTipoDeVehiculo(value)
            }
        },
        tipo_de_flota_selected: {
            get(){
                return this.trailer.tipo_de_flota
            },
            set(value){
                this.setTipoDeFlota(value)
            }
        },
        tipo_de_configuracion_selected: {
            get(){
                return this.trailer.tipo_de_configuracion
            },
            set(value){
                this.setTipoDeConfiguracion(value)
            }
        },

	},
	components: {
	},
    methods: {
        radicaChange(e){
            this.setRadicaRndc(e)
            this.radicaRn = e
        },
        back() {
			router.push('/Trailers')
		},
        ...mapMutations('trailers', [
            'setPlaca',
            'setTipoDeVehiculo',
            'setTipoDeConfiguracion',
            'setTenedor',
            'setModelo',
            'setPropietario',
            'setTipoDeFlota',
            'setPoseedor',
            'setColor',
            'setMarcaTrailer',
            'setPeso',
            'setTipoCarroceria',
            'setEstado',
            'setRadicaRndc',
            'setCedulaPropietario',
            'setCedulaPoseedor',
            'setCedulaTenedor',
            'setTransportadora',
            'setDigitoDeVerificacionPropietario',
            'setDigitoDeVerificacionTenedor',
            'setTipoDeIdTenedor',
            'setTipoDeIdPropietario',
        ]),
        title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
        },
        ...mapActions('trailers',[
            'createTrailer',
        ]),
        ...mapActions('transportadoras',[
            'fetchTransportadorasList',
        ]),
        ...mapActions('sharedValues',[
            'searchMarcasSemiRemolquesList',
            'searchTipoCarroceria',
            'searchColoresVehiculosList',
        ]),
    },
    created: function(){
       this.fetchTransportadorasList()
	}

}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';
.el-select{
    width: 100%;
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
