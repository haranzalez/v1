<template>
   <vue-scroll class="page-summary-viaje">
           <h3 style="text-align:left;width:60%;margin-left:auto;">Resumen</h3>
           <el-row style="text-align:right;width:60%;margin-left:auto;" v-for="(value, key) in summary" :key="key" >
                
               <el-col style="border-bottom: 1px solid #ccc" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                   <strong>{{key}}</strong>
               </el-col>
               <el-col style="border-bottom: 1px solid #ccc" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  {{value}}
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
        ...mapState('rutas', [
            'ruta',
        ]),
        ...mapState('productos', [
            'producto',
        ]),
        ...mapState('cuadreViajes', [
            'cuadre',
        ]),
        summary(){
            let flete = Number(this.ruta.valor_flete)
            let producto = Number(this.producto.precio)
            let cuadre = Number(this.cuadre.flete)
            let anticipo = Number(this.cuadre.anticipo)
            let ajuste = (cuadre > 0 && flete > 0 && producto > 0)?cuadre - (flete + producto):0
            let total = (flete + producto) + ajuste
            let debe = cuadre - anticipo
            return {
                flete,
                producto,
                ajuste,
                cuadre,
                debe
            }
        }
	},
	components: {
	},
    methods: {
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
