<template>
   <vue-scroll class="page-cuadro-viaje-create">
       <el-form :inline="true" label-position="top" ref="form" label-width="120px">
                    <el-form-item label="Vehiculo">
                        <el-select size="mini" :value.sync="selectedCreateVehiculo" placeholder="Seleccione.." @change="setSelectedCreateVehiculo">
                            <el-option
                            v-for="item in vehiculosList"
                            :key="item.id"
                            :label="item.placa"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Producto">
                        <el-select size="mini" :value.sync="selectedCreateProducto" placeholder="Seleccione.." @change="setSelectedCreateProducto">
                            <el-option
                            v-for="item in productosList"
                            :key="item.id"
                            :label="item.nombre"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Ruta">
                        <el-select size="mini" :value.sync="selectedCreateRuta" placeholder="Seleccione.." @change="setSelectedCreateRuta">
                            <el-option
                            v-for="item in rutasList"
                            :key="item.id"
                            :label="item.nombre_municipio"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Valor flete">
                        <el-input
                            size="mini"
                            placeholder="$0"
                            @input="setFlete">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="Anticipo">
                        <el-input
                            size="mini"
                            placeholder="$0"
                            @input="setAnticipo">
                        </el-input>
                    </el-form-item>
                    
                   
        </el-form>
   </vue-scroll>
</template>

<script>
import HTTP from '../../http';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import moment from 'moment-timezone'
import router from '../../router'

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
	},
    methods: {
        back() {
			router.push('/cuadre-viajes')
		},
        ...mapMutations('cuadreViajes', [
            'setConsolidacionId',
            'setRutaId',
            'setFlete',
            'setAnticipo',
            'setSelectedCreateVehiculo',
            'setSelectedCreateRuta'
        ]),
        ...mapActions('rutas', [
            'fetchRutasList',
        ]),
        ...mapActions('vehiculos', [
            'fetchVehiculosList',
        ]),
         ...mapActions('cuadreViajes',[
            'createCuadre',
        ]),
         ...mapActions('productos',[
            'fetchProductosList',
        ]),
        title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
        },
       
    },
    created: function(){
       this.fetchRutasList()
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

</style>
