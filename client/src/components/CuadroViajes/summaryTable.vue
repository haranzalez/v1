<template>
   <vue-scroll class="page-summary-viaje">
       <el-container>
           <el-row v-for="(value, key) in summary" :key="value.id" >
               <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                   <strong>{{key}}</strong>
               </el-col>
               <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                   <p>{{value}}</p>
               </el-col>
           </el-row>
       </el-container>
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
        ...mapState('cuadreViajes', [
            'cuadre',
        ]),
        summary(){
            let valor_real = Number(this.ruta.valor_flete)
            let valor_cuadre = Number(this.cuadre.flete)
            let anticipo = Number(this.cuadre.anticipo)
             let ajuste = valor_real - valor_cuadre
             let debe = valor_cuadre - anticipo
            console.log(valor_real, valor_cuadre, ajuste)
           
            return {
                valor_real,
                valor_cuadre,
                ajuste,
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
