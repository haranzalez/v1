<template>
   <vue-scroll class="page-vehiculos-create">
       <h1>Cuadre Viaje - Crear</h1>
       <el-form label-position="top" ref="form" :model="form" label-width="120px">
        <el-row>
            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Placa">
                        <el-input 
                        @input="setConsolidacionId"
                        placeholder="Consolidacion">
                        </el-input>
                    </el-form-item>
				</el-col>
            </el-col>
				
            <el-col class="col-p pull-right">
                <el-form-item>
                    <el-button  type="primary" @click="createVehiculo">Crear</el-button>
                    <el-button  @click="back">Cancelar</el-button>
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
	name: 'CuadreViajeoCreateForm',
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
        ...mapState('cuadreViaje', [
            'headings',
            'dataReady',
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
        ]),
        title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
        },
        ...mapActions('cuadreViajes',[
            'createCuadre',
        ]),
    },
    created: function(){
       
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
