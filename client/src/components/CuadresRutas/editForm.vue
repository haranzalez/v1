<template>
   <vue-scroll class="page-cuadro-viaje-create">
        <el-form :inline="false" label-position="top" ref="createCuadreRutaForm" label-width="120px">
            <el-row>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="Tipo de vehiculo">
                            <el-select size="mini" v-model="tipo_de_vehiculo_selected" placeholder="Seleccione..">
                                <el-option
                                v-for="item in tipo_de_vehiculo_options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="Ruta">
                            <el-select
                            :disabled="rutasEnabled"
                            class="selectWidth" 
                            size="mini" 
                            v-model="ruta_selected" 
                            placeholder="Seleccione..">
                                <el-option
                                v-for="item in filteredRutasList"
                                :key="item.id"
                                :label="item.nombre_ruta"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                   <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="Tipo de negociacion">
                            <el-select size="mini" v-model="tipo_de_negociacion_selected" placeholder="Seleccione..">
                                <el-option
                                v-for="item in tipo_negociacion_options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="Flete">
                            <el-input
                                class="inputWidth"
                                size="mini"
                                :value="cuadre.flete"
                                placeholder="$0"
                                @input="setFlete">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="Pago conductor">
                            <el-input
                                :value="cuadre.pago_conductor"
                                class="inputWidth"
                                size="mini"
                                placeholder="$0"
                                @input="setPagoConductor">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="Pago tercero">
                            <el-input
                                :value="cuadre.pago_tercero"
                                class="inputWidth"
                                size="mini"
                                placeholder="$0"
                                @input="setPagoTercero">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="Pago cabezote">
                            <el-input
                                :value="cuadre.pago_cabezote"
                                class="inputWidth"
                                size="mini"
                                placeholder="$0"
                                @input="setPagoCabezote">
                            </el-input>
                        </el-form-item>
                    </el-col>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <summaryTable></summaryTable>
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
import summaryTable from './summaryTable.vue'

export default {
	name: 'CuadreViajeCreateForm',
	data () {
      	return {
              capacidadNum: 1,
              pesoNum: 1,
		}
	},
	computed: {
        ...mapState('sharedValues', [
            'tipo_de_vehiculo_options',
            'tipo_negociacion_options',
        ]),
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('cuadreViajes', [
            'cuadre',
            'headings',
            'dataReady',
            'selectedCreateVehiculo',
            'selectedCreateRuta',
            'selectedCreateProducto',
        ]),
         ...mapState('rutas', [
            'rutasList',
            'filteredRutasList',
        ]),
        rutasEnabled(){
            if(this.cuadre.tipo_de_vehiculo !== null){
                return false
            }else{
                return true
            }
        },
        tipo_de_vehiculo_selected: {
            get(){
                return this.cuadre.tipo_de_vehiculo
            },
            set(value){
                this.setRutaId(null)
                this.fetchFilteredByTipoVehiculoRutasList(value)
                this.setTipoDeVehiculo(value)
            }
        },
        tipo_de_negociacion_selected: {
            get(){
                return this.cuadre.tipo_de_negociacion
            },
            set(value){
                console.log(value)
                this.setTipoDeNegociacion(value)
            }
        },
        ruta_selected: {
            get(){
                return this.cuadre.ruta_id
            },
            set(value){
                this.fetchRuta(value)
                this.setRutaId(value)
            }
        },

	},
	components: {
        summaryTable,
	},
    methods: {
        
        ...mapMutations('cuadreViajes', [
            'setConsolidacionId',
            'setRutaId',
            'setFlete',
            'setSelectedCreateRuta',
            'setTipoDeVehiculo',
            'setPagoConductor',
            'setPagoTercero',
            'setPagoCabezote',
            'setTipoDeNegociacion',
        ]),
        ...mapActions('rutas', [
            'fetchRutasList',
            'fetchRuta',
            'fetchFilteredByTipoVehiculoRutasList',
        ]),
         ...mapActions('cuadreViajes',[
            'createCuadre',
        ]),
        title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
        },
     
       
    },
    created: function(){
       this.fetchRutasList()
	}

}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';
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
.inputWidth{
    width: 100px;
}

</style>
