<template>
   <vue-scroll class="page-vehiculos-create">
       <h1>Vehiculos - Detalles/Editar</h1>
       <el-form label-position="top" ref="form" label-width="120px">
        <el-row>
            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Placa">
                        <el-input 
                        @input="setPlaca"
                        placeholder="Placa"
                        :value="vehiculo.placa"
                        v-model="vehiculo.placa"
                        >
                        
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Numero chasis">
                        <el-input 
                        :value="vehiculo.numero_chasis"
                        v-model="vehiculo.numero_chasis"
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
                        :value="vehiculo.tipo_de_vehiculo"
                        v-model="vehiculo.tipo_de_vehiculo"
                        @input="setTipoDeVehiculo"
                        placeholder="Tipo">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo configuracion">
                        <el-input 
                        :value="vehiculo.tipo_configuracion"
                        v-model="vehiculo.tipo_configuracion"
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
                        :value="vehiculo.modelo"
                        v-model="vehiculo.modelo"
                        @input="setModelo"
                        placeholder="Peter Jackson..">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Numero Motor">
                        <el-input 
                        :value="vehiculo.numero_motor"
                        v-model="vehiculo.numero_motor"
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
                        :value="vehiculo.tipo_de_flota"
                        v-model="vehiculo.tipo_de_flota"
                        @input="setTipoDeFlota"
                        placeholder="flota">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Marca cabezote">
                        <el-input 
                        :value="vehiculo.marca_cabezote"
                        v-model="vehiculo.marca_cabezote"
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
                        :value="vehiculo.linea_cabezote"
                        v-model="vehiculo.linea_cabezote"
                        @input="setLineaCabezote"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de combustible">
                        <el-input 
                        :value="vehiculo.tipo_de_combustible"
                        v-model="vehiculo.tipo_de_combustible"
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
                        :value="vehiculo.color"
                        v-model="vehiculo.color"
                        @input="setColor"
                        placeholder="Negro..">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-col :span="12" :md="12" :sm="24" :xs="24">
                        <el-form-item label="Peso (Toneladas)">
                        <el-input-number 
                        :value="vehiculo.peso"
                        v-model="vehiculo.peso" 
                        controls-position="right" 
                        @change="setPeso" 
                        :min="1" 
                        :max="50">
                        </el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :md="12" :sm="24" :xs="24">
                        <el-form-item label="Capasidad de carga (Toneladas)">
                        <el-input-number 
                        :value="vehiculo.capasidad_de_carga"
                        v-model="vehiculo.capasidad_de_carga" 
                        controls-position="right" 
                        @change="setCapasidadCarga" 
                        :min="1" 
                        :max="50">
                        </el-input-number>
                        </el-form-item>
                    </el-col>
				</el-col>
			</el-col>

            <el-col class="col-p pull-right">
                <el-form-item>
                    <el-button :disabled="(permisos['Vehiculos'].editar)? false:true" type="primary" @click="editVehiculo">Actualizar</el-button>
                    <el-button  @click="back">Cancelar</el-button>
                    <el-button :disabled="(permisos['Vehiculos'].eliminar)? false:true" type="text" @click="del">Eliminar</el-button>
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
	name: 'VehiculoEditForm',
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
            'dataReady',
            'vehiculo',
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
            'editVehiculo',
            'delVehiculo',
        ]),
        del(){
            this.$confirm('Esta operacion eliminara permanentemente este registro. Continuar?', 'Atencion!', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancelar',
                type: 'warning'
            }).then(() => {
                this.delVehiculo()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Cancelado'
                });          
            });
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
