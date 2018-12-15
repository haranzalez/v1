<template>
   <vue-scroll class="page-trailers-create">
       <el-form label-position="top" ref="trailersCreateForm" label-width="120px">
        <el-row>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <h3>Informacion basica</h3>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Placa">
                    <el-input 
                    size="mini"
                    @input="setPlaca"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Modelo">
                    <el-input 
                    size="mini"
                    @input="setModelo"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Marca">
                    <el-input 
                    size="mini"
                    @input="setMarcaTrailer"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Color">
                    <el-input 
                    size="mini"
                    @input="setColor"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Propietario">
                    <el-input 
                    size="mini"
                    @input="setPropietario"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Poseedor">
                    <el-input 
                    size="mini"
                    @input="setPoseedor"
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
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <h3>Informacion adicional</h3>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Tipo de vehiculo">
                    <el-select 
                     size="mini"
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
             <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Tipo de flota">
                    <el-input 
                    size="mini"
                    @input="setTipoDeFlota"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Tipo de configuracion">
                    <el-input 
                    size="mini"
                    @input="setTipoDeConfiguracion"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Tenedor">
                    <el-input 
                    size="mini"
                    @input="setTenedor"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
             <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Carroceria">
                    <el-input 
                    size="mini"
                    @input="setTipoCarroceria"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Peso">
                    <el-input 
                    size="mini"
                    @input="setPeso"
                    placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Estado">
                    <el-input 
                    size="mini"
                    @input="setEstado"
                    placeholder="">
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
       this.$refs.trailersCreateForm.resetFields();
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
