 <template>
   <vue-scroll class="page-vehiculos-create">
       <el-form :disabled="(permisos['Conductores'].editar)?false:true" label-position="top" label-width="120px">
        <el-row>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Institucion">
                    <el-input 
                        size="mini" 
                        :value="documento.institucion"
                        @input="setInstitucion"
                        placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Tipo de documento">
                   <el-select size="mini" v-model="tipo_de_documento_conductor" placeholder="Select">
                        <el-option
                        v-for="item in tipo_de_documento_conductor_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Fecha inicio">
                    <el-date-picker
                    v-model="fecha_inicio"
                    type="date"
                    size="mini"
                    placeholder="Seleccione fecha">
                    </el-date-picker>
                </el-form-item>
            </el-col>
             <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Fecha fin">
                    <el-date-picker
                    v-model="fecha_fin"
                    type="date"
                    size="mini"
                    placeholder="Seleccione fecha">
                    </el-date-picker>
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
	name: 'DocumentosTrailerEditForm',
	data () {
      	return {
           
		}
	},
	computed: {
        tipo_de_documento_conductor: {
             get(){
                return this.documento.tipo_de_documento
            },
            set(value){
                this.setTipoDeDocumento(value)
            }
        },
        fecha_inicio: {
            get(){
                return this.documento.fecha_inicio
            },
            set(value){
                this.setFechaInicio(value)
            }
        },
        fecha_fin: {
            get(){
                return this.documento.fecha_fin
            },
            set(value){
                this.setFechaFin(value)
            }
        },
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('documentosConductor', [
			'documento',
        ]),
        ...mapState('sharedValues', [
			'tipo_de_vehiculo_options',
            'tipo_de_flota_options',
            'tipo_de_configuracion_options',
            'tipo_de_combustible_options',
            'estado_options',
            'corroceria_options',
            'full_loading',
            'tipo_de_poliza_options',
            'tipo_de_documento_conductor_options'
        ]),
	},
	components: {
	},
    methods: {
        ...mapMutations('documentosConductor', [
            'setTipoDeDocumento',
            'setFechaInicio',
            'setFechaFin',
            'setConductorId',
            'setInstitucion',
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


.el-input-number{
    width: 120px;
}
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
