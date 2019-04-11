 <template>
   <vue-scroll class="page-vehiculos-create">
       <el-form label-position="top" label-width="120px">
        <el-row>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Aseguradora">
                    <el-select size="mini" v-model="aseguradora" placeholder="Select">
                        <el-option
                        v-for="item in aseguradorasList"
                        :key="item.id"
                        :label="item.nombre"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Tipo de poliza">
                   <el-select size="mini" v-model="tipo_de_poliza" placeholder="Select">
                        <el-option
                        v-for="item in tipo_de_poliza_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Numero de poliza">
                    <el-input size="mini"
                    @input="setNumeroDePoliza"
                    :value="documento.numero_de_poliza"
                    >
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Fecha de expedicion">
                    <el-date-picker
                    size="mini"
                    v-model="fecha_de_expedicion"
                    type="date"
                    placeholder="Seleccione fecha">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Fecha de vigencia">
                    <el-date-picker
                    size="mini"
                    v-model="fecha_de_vencimiento"
                    type="date"
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
	name: 'DocumentosVehiculoCreateForm',
	data () {
      	return {
           
		}
	},
	computed: {
        aseguradora: {
             get(){
                return this.documento.aseguradora_id
            },
            set(value){
                this.setAseguradoraId(value)
            }
        },
        tipo_de_poliza: {
             get(){
                return this.documento.tipo_de_poliza
            },
            set(value){
                this.setTipoDePoliza(value)
            }
        },
        fecha_de_vencimiento: {
            get(){
                return this.documento.fecha_de_vencimiento
            },
            set(value){
                this.setFechaDeVencimiento(value)
            }
        },
        fecha_de_expedicion: {
            get(){
                return this.documento.fecha_de_expedicion
            },
            set(value){
                console.log(value)
                this.setFechaDeExpedicion(value)
            }
        },
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('aseguradoras', [
			'aseguradorasList',
        ]),
        ...mapState('documentosVehiculos', [
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
        ]),

	},
	components: {
	},
    methods: {
       
        ...mapMutations('documentosVehiculos', [
            'setAseguradoraId',
            'setTipoDePoliza',
            'setNumeroDePoliza',
            'setFechaDeVencimiento',
            'setFechaDeExpedicion',
            'setVehiculoId',
        ]),
        ...mapActions('aseguradoras', [
            'fetchAseguradorasList'
        ]),
        title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
        },
      
       
    },
    created: function(){
        this.fetchAseguradorasList()
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
