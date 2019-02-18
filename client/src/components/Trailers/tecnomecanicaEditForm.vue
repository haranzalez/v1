 <template>
   <vue-scroll class="page-vehiculos-create">
       <el-form label-position="top" label-width="120px">
        <el-row>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Numero de tecnicomecanica">
                    <el-input size="mini"
                    @input="setNumeroTecnomecanica"
                    :value="tecnomecanica.numero_tecnomecanica"
                    >
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Fecha de vencimiento">
                    <el-date-picker
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
	name: 'TecnicomecanicasVehiculoCreateForm',
	data () {
      	return {
           
		}
	},
	computed: {
        fecha_de_vencimiento: {
            get(){
                return this.tecnomecanica.fecha_de_vencimiento
            },
            set(value){
                this.setFechaDeVencimiento(value)
            }
        },
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('tecnomecanicaTrailers', [
			'tecnomecanica',
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
        ...mapMutations('tecnomecanicaTrailers', [
            'setNumeroTecnomecanica',
            'setFechaDeVencimiento',
            'setVehiculoId',
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
