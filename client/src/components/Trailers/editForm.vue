<template>
   <vue-scroll class="page-trailers-create">
       <el-form label-position="top" ref="form" label-width="120px">
        <el-row>
            <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Placa">
                        <el-input 
                        :value="trailer.placa"
                        v-model="trailer.placa"
                        @input="setPlaca"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tipo de vehiculo">
                        <el-select 
                        :value="trailer.tipo_de_vehiculo"
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
                        :value="trailer.tipo_de_configuracion"
                        v-model="trailer.tipo_de_configuracion"
                        @input="setTipoDeConfiguracion"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Tenedor">
                        <el-input 
                        :value="trailer.tenedor"
                        v-model="trailer.tenedor"
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
                        :value="trailer.modelo"
                        v-model="trailer.modelo"
                        @input="setModelo"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Propietario">
                        <el-input 
                        :value="trailer.propietario"
                        v-model="trailer.propietario"
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
                        :value="trailer.tipo_de_flota"
                        v-model="trailer.tipo_de_flota"
                        @input="setTipoDeFlota"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Poseedor">
                        <el-input 
                        :value="trailer.poseedor"
                        v-model="trailer.poseedor"
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
                        :value="trailer.tipo_carroceria"
                        v-model="trailer.tipo_carroceria"
                        @input="setTipoCarroceria"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Color">
                        <el-input 
                        :value="trailer.color"
                        v-model="trailer.color"
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
                        :value="trailer.marca_trailer"
                        v-model="trailer.marca_trailer"
                        @input="setMarcaTrailer"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Peso">
                        <el-input 
                        :value="trailer.peso"
                        v-model="trailer.peso"
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
                        :value="trailer.estado"
                        v-model="trailer.estado"
                        @input="setEstado"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>

                <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Radica RNDC">
                         <el-checkbox @change="setRadicaRndc" v-model="trailer.radica_rndc"></el-checkbox>
                    </el-form-item>
				</el-col>
			</el-col>
             <el-col>
				
                
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
        ]),
        title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
        },
        
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
