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
	name: 'summaryServicio',
	data () {
      	return {
             
		}
	},
	computed: {
        ...mapState('servicios', [
            'servicio',
        ]),
        ...mapState('cuadreServicios', [
            'cuadre',
            'cuadreServicioEdit',
            'summaryType',
        ]),
        summary(){
            if(this.summaryType == 'edit'){
                console.log(this.cuadreServicioEdit, this.servicio)
                let cuadre = (this.cuadreServicioEdit.precio != null)?Number(this.cuadreServicioEdit.precio):0
                let servicio = (this.servicio.precio != null)?Number(this.servicio.precio):0
                let ajuste = (cuadre > 0 && servicio > 0)?cuadre - servicio:0
                let total = servicio + ajuste
                this.setAjusteEdit(ajuste)
                console.log(ajuste)
                return {
                    servicio,
                    ajuste,
                    cuadre,
                    total
                }
            }
            if(this.summaryType == 'create'){
                console.log(this.cuadre, this.servicio)
                let cuadre = (this.cuadre.precio != null)?Number(this.cuadre.precio):0
                let servicio = (this.servicio.precio != null)?Number(this.servicio.precio):0
                let ajuste = (cuadre > 0 && servicio > 0)?cuadre - servicio:0
                let total = servicio + ajuste
                this.setAjuste(ajuste)
                console.log(ajuste)
                return {
                    servicio,
                    ajuste,
                    cuadre,
                    total
                }
            }
            
        }
	},
	components: {
	},
    methods: {
        ...mapMutations('cuadreServicios', [
            'setAjuste',
            'setAjusteEdit',
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
