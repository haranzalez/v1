 <template>
   <vue-scroll class="page-vehiculos-create">
       <el-form :disabled="(permisos['Clientes'].editar)? false:true" label-position="top" label-width="120px">
        <el-row>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Nombre">
                    <el-input 
                        size="mini" 
                        @input="setNombre"
                        :value="contacto.nombre"
                        placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Celular">
                    <el-input 
                        size="mini" 
                        @input="setCelular"
                        :value="contacto.celular"
                        placeholder="">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                <el-form-item label="Cargo">
                    <el-input 
                        size="mini" 
                        @input="setCargo"
                        :value="contacto.cargo"
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
	name: 'personaDeContactoClientesCreateForm',
	data () {
      	return {
           
		}
	},
	computed: {
        
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('personaDeContactoClientes', [
			'contacto',
        ]),
	},
	components: {
	},
    methods: {
        ...mapMutations('personaDeContactoClientes', [
            'setNombre',
            'setCelular',
            'setCargo',
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
