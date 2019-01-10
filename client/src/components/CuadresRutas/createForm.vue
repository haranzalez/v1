<template>
   <vue-scroll class="page-cuadro-viaje-create">
        <el-form :inline="false" label-position="top" ref="createCuadreRutaForm" label-width="120px">
            <el-row>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="Ruta">
                            <el-select
                            class="selectWidth" 
                            size="mini" 
                            :value.sync="selectedCreateRuta" 
                            placeholder="Seleccione.." 
                            @change="rutaChange">
                                <el-option
                                v-for="item in rutasList"
                                :key="item.id"
                                :label="item.nombre_ruta"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                   
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="Cuadre">
                            <el-input
                                class="inputWidth"
                                size="mini"
                                placeholder="$0"
                                @input="setFlete">
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
        
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('cuadreViajes', [
            'headings',
            'dataReady',
            'selectedCreateVehiculo',
            'selectedCreateRuta',
            'selectedCreateProducto',
        ]),
         ...mapState('rutas', [
            'rutasList',
        ]),
        ...mapState('vehiculos', [
            'vehiculosList',
        ]),
          ...mapState('productos', [
            'productosList',
        ]),

	},
	components: {
        summaryTable,
	},
    methods: {
        back() {
			router.push('/cuadre-viajes')
		},
        ...mapMutations('cuadreViajes', [
            'setConsolidacionId',
            'setRutaId',
            'setFlete',
            'setPrecioProducto',
            'setAnticipo',
            'setSelectedCreateVehiculo',
            'setSelectedCreateRuta',
            'setSelectedCreateProducto',
        ]),
        ...mapActions('rutas', [
            'fetchRutasList',
            'fetchRuta',
        ]),
        ...mapActions('vehiculos', [
            'fetchVehiculosList',
        ]),
         ...mapActions('cuadreViajes',[
            'createCuadre',
        ]),
         ...mapActions('productos',[
            'fetchProductosList',
            'fetchProducto'
        ]),
        title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
        },
        rutaChange(value){
            this.fetchRuta(value)
            this.setSelectedCreateRuta(value)
        },
        productoChange(value){
            this.fetchProducto(value)
            this.setSelectedCreateProducto(value)
        },
       
    },
    created: function(){
       this.fetchRutasList()
       console.log(this.rutasList)
       this.fetchVehiculosList()
       this.fetchProductosList()
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
