<template>
   <vue-scroll class="page-summary-viaje">
           <h3 style="text-align:left;width:70%;margin-left:auto;">Valor por defecto</h3>
           <el-row style="width:70%;margin-left:auto;" v-for="(value, key) in summary" :key="key" >
               <el-col style="font-size: 15px;font-weigth: bold;" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  {{key}}
               </el-col>
               <el-col style="font-size: 25px;font-weigth: bold;color:green;" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  {{value}}
               </el-col>
           </el-row>
           <el-row style="width:70%;margin-left:auto;margin-top:15px;">
               <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <el-button :disabled="btnEnabled" size="mini" type="success" @click="setDefaultValues">Aplicar valores</el-button>
               </el-col>
           </el-row>
   </vue-scroll>
</template>

<script>
import HTTP from '../../http';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import moment from 'moment-timezone'
import router from '../../router'

export default {
	name: 'summaryViaje',
	data () {
      	return {
             
		}
	},
	computed: {
        btnEnabled(){
            if(this.producto.precio > 0){
                return false
            }else{
                return true
            }
        },
        ...mapState('rutas', [
            'ruta',
        ]),
        ...mapState('productos', [
            'producto',
        ]),
        ...mapState('cuadreProductos', [
            'cuadre',
        ]),
        summary(){
            let producto = (this.producto.precio != null)?Number(this.producto.precio):0
            return {
                producto,
            }
        }
	},
	components: {
	},
    methods: {
        setDefaultValues(){
            this.setPrecioCuadreProducto(this.producto.precio)
        },
        ...mapMutations('cuadreProductos', [
            'setAjuste',
            'setPrecioCuadreProducto',
        ])
    },
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
