<template>
    <vue-scroll>
        <el-form label-position="top" :status-icon="true" :show-message="false" label-width="120px" clearValidate> 
            <el-row>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <h3>Nuevos datos de licencia</h3>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Numero licencia" >
                        <el-input size="mini" 
                        @input="setNumeroDeLicencia"
                        placeholder="">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Categoria">
                        <el-select size="mini" v-model="tipo_de_licencia_selected" placeholder="Seleccione..">
                            <el-option
                            v-for="item in tipo_licencia_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Fecha de vencimiento">
                        <el-date-picker
                        size="mini"
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
                this.setFechaDeVencimiento(value)
            }
        },
        tipo_de_licencia_selected: {
            get(){
                return this.licencia.categoria
            },
            set(value){
               this.setCategoria(value)
            }
        },
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('licenciasConductores', [
            'licencia',
        ]),
        ...mapState('sharedValues', [
            'tipo_licencia_options',
        ]),
       
	},
	components: {
	},
    methods: {
        ...mapMutations('licenciasConductores', [
            'setNumeroDeLicencia',
            'setCategoria',
            'setFechaDeVencimiento',
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
