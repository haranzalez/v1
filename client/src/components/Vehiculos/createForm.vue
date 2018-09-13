<template>
   <vue-scroll class="page-vehiculos-create">
       <h1>Vehiculos - Crear</h1>
       <el-form label-position="top" ref="form" :model="form" label-width="120px">
        <el-row>
            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Placa">
                        <el-input 
                        @input="setPlaca"
                        placeholder="Placa">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Numero chasis">
                        <el-input 
                        @input="setNumeroChasis"
                        placeholder="No. Chasis">
                        </el-input>
                    </el-form-item>
				</el-col>
			</el-col>

            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de vehiculo">
                        <el-input 
                        @input="setTipoDeVehiculo"
                        placeholder="Tipo">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo configuracion">
                        <el-input 
                        @input="setTipoConfiguracion"
                        placeholder="Configuracion">
                        </el-input>
                    </el-form-item>
				</el-col>
			</el-col>

            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Modelo">
                        <el-input 
                        @input="setModelo"
                        placeholder="Peter Jackson..">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Numero Motor">
                        <el-input 
                        @input="setNumeroMotor"
                        placeholder="No. Motor">
                        </el-input>
                    </el-form-item>
				</el-col>
			</el-col>

            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de flota">
                        <el-input 
                        @input="setTipoDeFlota"
                        placeholder="flota">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Marca cabezote">
                        <el-input 
                        @input="setMarcaCabezote"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
			</el-col>

            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Linea cabezote">
                        <el-input 
                        @input="setLineaCabezote"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de combustible">
                        <el-input 
                        @input="setTipoDeCombustible"
                        placeholder="Diesel..">
                        </el-input>
                    </el-form-item>
				</el-col>
			</el-col>

            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Color">
                        <el-input 
                        @input="setColor"
                        placeholder="Negro..">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-col :span="12" :md="12" :sm="24" :xs="24">
                        <el-form-item label="Peso (Toneladas)">
                        <el-input-number v-model="pesoNum" controls-position="right" @change="setPeso" :min="1" :max="50"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12" :sm="24" :xs="24">
                        <el-form-item label="Capasidad de carga (Toneladas)">
                        <el-input-number v-model="capacidadNum" controls-position="right" @change="setCapasidadCarga" :min="1" :max="50"></el-input-number>
                        </el-form-item>
                    </el-col>
				</el-col>
			</el-col>

            <el-col class="col-p pull-right">
                <el-form-item>
                    <el-button type="primary" @click="createVehiculo">Crear</el-button>
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
	name: 'VehiculoCreateForm',
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
        ...mapState('vehiculos', [
            'headings',
            'vehiculosList',
            'dataReady',
            'selectedConductor',
            'selectedTrailer',
        ]),

	},
	components: {
	},
    methods: {
        back() {
			router.push('/Vehiculos')
		},
        ...mapMutations('vehiculos', [
            'setVehicleId',
            'setPlaca',
            'setNumeroChasis',
            'setTipoDeVehiculo',
            'setTipoConfiguracion',
            'setModelo',
            'setNumeroMotor',
            'setTipoDeFlota',
            'setMarcaCabezote',
            'setLineaCabezote',
            'setTipoDeCombustible',
            'setColor',
            'setPeso',
            'setCapasidadCarga',
        ]),
        title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
        },
        ...mapActions('vehiculos',[
            'fetchVehiculosList',
            'assignConductor',
            'assignTrailer',
            'createVehiculo',
        ]),
    },
    created: function(){
        this.fetchVehiculosList()
        this.fetchConductoresList()
        this.fetchTrailersList()
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
