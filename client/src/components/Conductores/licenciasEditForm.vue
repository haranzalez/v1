<template>
    <vue-scroll>
        <el-form :disabled="(permisos['Conductores'].editar)?false:true" label-position="top" :status-icon="true" :show-message="false" label-width="120px" clearValidate> 
            <el-row>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <h3>Datos de licencia</h3>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Numero licencia" >
                        <el-input size="mini" 
                        :value="licencia.numero_de_licencia"
                        @input="setNumeroLicencia"
                        placeholder="">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Categoria">
                        <el-input size="mini" 
                        :value="licencia.categoria"
                        @input="setCategoria"
                        placeholder="">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Fecha de vencimiento">
                        <el-date-picker
                        v-model="fechaVencimiento"
                        type="date"
                        placeholder="Escoja fecha">
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
	name: 'Licencias',
	data () {
      	return {
            
		}
	},
	computed: {
        fechaVencimiento: {
            get(){
                return this.licencia.fecha_de_vencimiento
            },
            set(value){
                this.setFechaVencimiento(value)
            }
        },
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('licenciasConductores', [
            'conductor',
            'licencia',
        ]),
	},
	components: {
	},
    methods: {
        ...mapMutations('licenciasConductores', [
            'setNumeroLicencia',
            'setCategoria',
            'setFechaVencimiento',
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
.page-conductores-create {
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
