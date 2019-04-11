<template>
   <vue-scroll class="page-summary-viaje">
           <h3 style="text-align:left;width:70%;margin-left:auto;">Valores por defecto</h3>
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
import NumberFormatting from '../../services/NumberFormattingService.js'

export default {
	name: 'summaryViaje',
	data () {
      	return {
             
		}
	},
	computed: {
        btnEnabled(){
            if(this.ruta.valor_flete > 0){
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
        ...mapState('cuadreViajes', [
            'cuadre',
        ]),
        summary(){
            let flete = Number(this.ruta.valor_flete)
            let pago_conductor = Number(this.ruta.pago_conductor_HQ)
            let pago_tercero = Number(this.ruta.pago_tercero)
            let pago_cabezote = Number(this.ruta.pago_cabezote)
            return {
                Flete: '$'+NumberFormatting.formatToCurrencyV2(flete),
                'Pago conductor': '$'+NumberFormatting.formatToCurrencyV2(pago_conductor),
                'Pago tercero': '$'+NumberFormatting.formatToCurrencyV2(pago_tercero),
                'Pago cabezote': '$'+NumberFormatting.formatToCurrencyV2(pago_cabezote),
            }
        }
	},
	components: {
	},
    methods: {
        ...mapMutations('cuadreViajes', [
            'setFlete',
            'setPagoConductor',
            'setPagoTercero',
            'setPagoCabezote',
        ]),
        setDefaultValues(){
            this.setFlete(this.ruta.valor_flete)
            this.setPagoConductor(this.ruta.pago_conductor_HQ)
            this.setPagoTercero(this.ruta.pago_tercero)
            this.setPagoCabezote(this.ruta.pago_cabezote)
        }
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
