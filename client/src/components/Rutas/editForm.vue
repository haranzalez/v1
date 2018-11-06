<template>
   <vue-scroll class="page-trailers-create">
       <h1>Rutas - Actualizar</h1>
       <el-form label-position="top" ref="form" label-width="120px">
        <el-row>
            <el-col :span="12" :md="12" :sm="24" :xs="24">
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Municipio">
                        <el-select size="mini" @change="setMunicipio" filterable :value="ruta.municipio_id" placeholder="Seleccione..">
                            <el-option
                            v-for="item in municipios_list"
                            :key="item.id"
                            :label="item.nombre_municipio"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
				</el-col>
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Kilometros">
                        <el-input size="mini" 
                        :value="ruta.kilometros"
                        @input="setKilometros"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Valor flete">
                        <el-input size="mini" 
                        :value="ruta.valor_flete"
                        @input="setValorflete"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Anticipo sugerido">
                        <el-input size="mini" 
                        :value="ruta.anticipo_sugerido"
                        @input="setAnticipoSugerido"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
            </el-col>

            <el-col :span="12" :md="12" :sm="24" :xs="24">
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>Comentarios</span>
                                <el-button @click="comentar" style="float: right; padding: 3px 0" type="text">Nuevo</el-button>
                            </div>
                            <div class="text item">
                                <el-table
                                :data="comentarios_list"
                                style="width: 100%">
                                <el-table-column type="expand">
                                <template slot-scope="props">
                                    <p>{{ props.row.comentario }}</p>
                                    
                                </template>
                                </el-table-column>
                                <el-table-column
                                label="Fecha"
                                prop="fecha">
                                </el-table-column>
                                <el-table-column
                                label="Usuario"
                                prop="usuario">
                                </el-table-column>
                                </el-table>
                            </div>
                        </el-card>
                    </el-form-item>
				</el-col>
               
            </el-col>

            <el-col class="col-p pull-right">
                <el-form-item>
                    <el-button  type="primary" @click="editRuta">Actualizar</el-button>
                    <el-button  @click="back">Regresar</el-button>
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
	name: 'RutasEditForm',
	data () {
      	return {
             
		}
	},
	computed: {
        
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('rutas', [
            'ruta',
            'municipios_list',
            'comentarios_list',
        ]),

	},
	components: {
	},
    methods: {
        comentar() {
            this.$prompt('Porfavor escriba comentario', 'Comentario', {
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar',
                inputType: 'textarea',
            }).then(comentario => {
                this.post_coment(comentario.value)
                this.fetchComments()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Comentario cancelado'
                });       
            });
        },
        back() {
			router.push('/Rutas')
        },
        del(){
            this.$confirm('Esta operacion eliminara permanentemente este registro. Continuar?', 'Atencion!', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancelar',
                type: 'warning'
            }).then(() => {
                this.delRuta()
            }).catch(() => {
                this.$message({
                    type: 'success',
                    message: 'Cancelado'
                });          
            });
        },
        ...mapActions('rutas',[
            'editRuta',
            'delRuta',
            'fetchMunicipios',
            'post_coment',
            'fetchRuta',
            'fetchComments',
        ]),
        ...mapMutations('rutas', [
            'setKilometros',
            'setAnticipoSugerido',
            'setValorflete',
            'setComentario',
            'setMunicipioId',
        ]),
        title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
        },
        setMunicipio(municipio){
            this.setMunicipioId(municipio)
        }
        
    },
    created(){
        this.fetchMunicipios()
        this.fetchComments(this.ruta.id)
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
