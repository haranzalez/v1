<template>
   <vue-scroll class="page-trailers-create">
       <h1>Trailers - Crear</h1>
       <el-form label-position="top" ref="form" label-width="120px">
        <el-row>
            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Placa">
                        <el-input 
                        @input="setPlaca"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de vehiculo">
                        <el-select 
                        v-model="trailer.tipo_de_vehiculo" 
                        placeholder="Select"
                        @change="setTipoDeVehiculo">
                            <el-option
                            v-for="item in tipoVehiculoOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
				</el-col>
			</el-col>

            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de configuracion">
                        <el-input 
                        @input="setTipoDeConfiguracion"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tenedor">
                        <el-input 
                        @input="setTenedor"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
			</el-col>

            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Modelo">
                        <el-input 
                        @input="setModelo"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Propietario">
                        <el-input 
                        @input="setPropietario"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
			</el-col>

            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de flota">
                        <el-input 
                        @input="setTipoDeFlota"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Poseedor">
                        <el-input 
                        @input="setPoseedor"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
			</el-col>

            <el-col>
                <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Carroceria">
                        <el-input 
                        @input="setTipoCarroceria"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Color">
                        <el-input 
                        @input="setColor"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
			</el-col>

            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Marca">
                        <el-input 
                        @input="setMarcaTrailer"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Peso">
                        <el-input 
                        @input="setPeso"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
			</el-col>

            <el-col>
				
                <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Estado">
                        <el-input 
                        @input="setEstado"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>

                <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Radica RNDC">
                         <el-checkbox @change="radicaChange" v-model="radicaRn"></el-checkbox>
                    </el-form-item>
				</el-col>
			</el-col>
             <el-col>
				
                
			</el-col>

            <el-col class="col-p pull-right">
                <el-form-item>
                    <el-button  type="primary" @click="createTrailer">Crear</el-button>
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
        ]),
        title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
        },
        ...mapActions('trailers',[
            'createTrailer',
        ]),
    },
    created: function(){
       
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
