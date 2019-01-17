<template>
   <vue-scroll class="page-vehiculos-create">
       <el-form label-position="top" ref="form" label-width="120px">
         <el-row>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <h3>Informacion basica</h3>
                </el-col>
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Placa">
                        <el-input size="mini"
                        :value="vehiculo.placa"
                        @input="setPlaca"
                        placeholder="Placa">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Modelo">
                        <el-input size="mini"
                        :value="vehiculo.modelo"
                        @input="setModelo"
                        placeholder="Peter Jackson..">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Marca cabezote">
                        <el-input size="mini"
                        :value="vehiculo.marca_cabezote"
                        @input="setMarcaCabezote"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Color">
                        <el-input size="mini"
                        :value="vehiculo.color"
                        @input="setColor"
                        placeholder="Negro..">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Propietario">
                        <el-row>
                            <el-col :span="11" :md="11" :sm="24" :xs="24">
                                <el-input 
                                size="mini"
                                :value="vehiculo.propietario"
                                @input="setPropietario"
                                placeholder="Nombre">
                                </el-input>
                            </el-col>
                            <el-col style="text-align: center;" :span="2" :md="2" :sm="24" :xs="24">
                                |
                            </el-col>
                            <el-col :span="11" :md="11" :sm="24" :xs="24">
                                <el-input 
                                size="mini"
                                :value="vehiculo.cedula_propietario"
                                @input="setCedulaPropietario"
                                placeholder="Nit/Cedula">
                                </el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Poseedor">
                        <el-row>
                            <el-col :span="11" :md="11" :sm="24" :xs="24">
                                <el-input 
                                size="mini"
                                @input="setPoseedor"
                                :value="vehiculo.poseedor"
                                placeholder="Nombre">
                                </el-input>
                            </el-col>
                            <el-col style="text-align: center;" :span="2" :md="2" :sm="24" :xs="24">
                                |
                            </el-col>
                            <el-col :span="11" :md="11" :sm="24" :xs="24">
                                <el-input 
                                size="mini"
                                :value="vehiculo.cedula_poseedor"
                                @input="setCedulaPoseedor"
                                placeholder="Nit/Cedula">
                                </el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Transportadora" prop="transportadora">
                        <el-select 
                        size="mini" 
                        filterable 
                        clearable
                        @change="setTransportadora"
                        :value="vehiculo.transportadora_id"
                        placeholder="Seleccione">
                            <el-option
                            v-for="item in transportadorasList"
                            :key="item.id"
                            :label="item.razon_social"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <h3>Informacion adicional</h3>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Linea cabezote">
                        <el-input size="mini"
                        :value="vehiculo.linea_cabezote"
                        @input="setLineaCabezote"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Numero Motor">
                        <el-input size="mini"
                        :value="vehiculo.numero_motor"
                        @input="setNumeroMotor"
                        placeholder="No. Motor">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Numero chasis">
                        <el-input size="mini"
                        :value="vehiculo.numero_chasis"
                        @input="setNumeroChasis"
                        placeholder="No. Chasis">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <h3>Configuraciones</h3>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Peso">
                    <el-input-number :value="vehiculo.peso" size="mini" v-model="pesoNum" controls-position="right" @change="setPeso" :min="1" :max="1000"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Capasidad de carga">
                    <el-input-number :value="vehiculo.capasidad_carga" size="mini" v-model="capacidadNum" controls-position="right" @change="setCapasidadCarga" :min="1" :max="1000"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de vehiculo">
                        <el-input size="mini"
                        :value="vehiculo.tipo_de_vehiculo"
                        @input="setTipoDeVehiculo"
                        placeholder="Tipo">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de flota">
                        <el-input size="mini"
                        :value="vehiculo.tipo_de_flota"
                        @input="setTipoDeFlota"
                        placeholder="flota">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo configuracion">
                        <el-input size="mini"
                        :value="vehiculo.tipo_configuracion"
                        @input="setTipoConfiguracion"
                        placeholder="Configuracion">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de combustible">
                        <el-input size="mini"
                        :value="vehiculo.tipo_de_combustible"
                        @input="setTipoDeCombustible"
                        placeholder="Diesel..">
                        </el-input>
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
        ...mapState('transportadoras', [
			'transportadorasList',
        ]),
        ...mapState('vehiculos', [
            'dataReady',
            'vehiculo',
        ]),

	},
	components: {
	},
    methods: {
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
            'setRadicaRndc',
            'setPoseedor',
            'setPropietario',
            'setCedulaPropietario',
            'setCedulaPoseedor',
            'setTransportadora',
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
        ...mapActions('transportadoras',[
            'fetchTransportadorasList',
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
    created: function(){
        this.fetchTransportadorasList()
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
