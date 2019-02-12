<template>
   <vue-scroll class="page-trailers-create">
       <el-form label-position="top" ref="form" label-width="120px">
        <el-row>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <h3>Informacion basica</h3>
                </el-col>
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Placa">
                        <el-input 
                        size="mini"
                        :value="trailer.placa"
                        v-model="trailer.placa"
                        @input="setPlaca"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Modelo">
                        <el-input 
                        size="mini"
                        :value="trailer.modelo"
                        v-model="trailer.modelo"
                        @input="setModelo"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Marca">
                        <el-input 
                        size="mini"
                        :value="trailer.marca_trailer"
                        v-model="trailer.marca_trailer"
                        @input="setMarcaTrailer"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Color">
                        <el-input 
                        size="mini"
                        :value="trailer.color"
                        v-model="trailer.color"
                        @input="setColor"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Propietario">
                        <el-row>
                            <el-col :span="11" :md="11" :sm="24" :xs="24">
                                <el-input 
                                :value="trailer.propietario"
                                size="mini"
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
                                :value="trailer.cedula_propietario"
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
                                :value="trailer.poseedor"
                                @input="setPoseedor"
                                placeholder="Nombre">
                                </el-input>
                            </el-col>
                            <el-col style="text-align: center;" :span="2" :md="2" :sm="24" :xs="24">
                                |
                            </el-col>
                            <el-col :span="11" :md="11" :sm="24" :xs="24">
                                <el-input 
                                size="mini"
                                :value="trailer.cedula_poseedor"
                                @input="setCedulaPoseedor"
                                placeholder="Nit/Cedula">
                                </el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Tenedor">
                    <el-row>
                        <el-col :span="11" :md="11" :sm="24" :xs="24">
                            <el-input 
                            size="mini"
                            :value="trailer.tenedor"
                            @input="setTenedor"
                            placeholder="Nombre">
                            </el-input>
                        </el-col>
                        <el-col style="text-align: center;" :span="2" :md="2" :sm="24" :xs="24">
                            |
                        </el-col>
                        <el-col :span="11" :md="11" :sm="24" :xs="24">
                            <el-input 
                            size="mini"
                            :value="trailer.cedula_tenedor"
                            @input="setCedulaTenedor"
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
                        clearable
                        filterable 
                        @change="setTransportadora"
                        :value="trailer.transportadora_id"
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
                    <el-form-item label="Tipo de vehiculo">
                        <el-select clearable size="mini" v-model="tipo_de_vehiculo_selected" placeholder="Select">
                            <el-option
                            v-for="item in tipo_de_vehiculo_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de flota">
                        <el-select clearable size="mini" v-model="tipo_de_flota_selected" placeholder="Select">
                            <el-option
                            v-for="item in tipo_de_flota_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de configuracion">
                        <el-select clearable size="mini" v-model="tipo_de_configuracion_selected" placeholder="Select">
                            <el-option
                            v-for="item in tipo_de_configuracion_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                 <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Carroceria">
                        <el-select clearable size="mini" v-model="corroceria_selected" placeholder="Select">
                            <el-option
                            v-for="item in corroceria_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Estado">
                        <el-select clearable size="mini" v-model="estado_selected" placeholder="Select">
                            <el-option
                            v-for="item in estado_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Peso">
                        <el-input
                        size="mini" 
                        :value="trailer.peso"
                        v-model="trailer.peso"
                        @input="setPeso"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Radica RNDC">
                        <el-switch
                        v-model="radicaRn"
                        @change="radicaChange"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-text="Si"
                        inactive-text="No">
                        </el-switch>
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
	name: 'TrailersEditForm',
	data () {
      	return {
              radicaRn: false,
              capacidadNum: 1,
              pesoNum: 1,
              tipoVehiculoOptions: [
                {
                    value: '10 pies',
                    label: '10 Pies',
                },
                {
                    value: '20 pies',
                    label: '20 Pies',
                },
              ]
		}
	},
	computed: {
        estado_selected: {
            get(){
                return this.trailer.estado
            },
            set(value){
                this.setEstado(value)
            }
        },
        corroceria_selected: {
            get(){
                return this.trailer.tipo_carroceria
            },
            set(value){
                this.setTipoCarroceria(value)
            }
        },
        tipo_de_vehiculo_selected: {
            get(){
                return this.trailer.tipo_de_vehiculo
            },
            set(value){
                this.setTipoDeVehiculo(value)
            }
        },
        tipo_de_flota_selected: {
            get(){
                return this.trailer.tipo_de_flota
            },
            set(value){
                this.setTipoDeFlota(value)
            }
        },
        tipo_de_configuracion_selected: {
            get(){
                return this.trailer.tipo_de_configuracion
            },
            set(value){
                this.setTipoDeConfiguracion(value)
            }
        },
         ...mapState('transportadoras', [
			'transportadorasList',
        ]),
        ...mapState('sharedValues', [
			'tipo_de_vehiculo_options',
            'tipo_de_flota_options',
            'tipo_de_configuracion_options',
            'tipo_de_combustible_options',
            'estado_options',
            'corroceria_options',
        ]),
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('trailers', [
			'trailer',
        ]),

	},
	components: {
	},
    methods: {
        radicaChange(e){
            this.setRadicaRndc(e)
            this.radicaRn = e
        },
        back() {
			router.push('/Trailers')
        },
        del(){
            this.$confirm('Esta operacion eliminara permanentemente este registro. Continuar?', 'Atencion!', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancelar',
                type: 'warning'
            }).then(() => {
                this.delTrailer()
            }).catch(() => {
                this.$message({
                    type: 'success',
                    message: 'Cancelado'
                });          
            });
        },
        ...mapActions('trailers',[
            'editTrailer',
            'delTrailer',
        ]),
        ...mapMutations('trailers', [
            'setPlaca',
            'setTipoDeVehiculo',
            'setTipoDeConfiguracion',
            'setTenedor',
            'setModelo',
            'setPropietario',
            'setTipoDeFlota',
            'setPoseedor',
            'setColor',
            'setMarcaTrailer',
            'setPeso',
            'setTipoCarroceria',
            'setEstado',
            'setRadicaRndc',
            'setCedulaPropietario',
            'setCedulaPoseedor',
            'setTransportadora',
        ]),
        ...mapActions('transportadoras',[
            'fetchTransportadorasList',
        ]),
        title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
        },
        
    },
    created: function(){
       this.fetchTransportadorasList()
	}

}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';
.page-trailers-create {
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
