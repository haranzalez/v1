<template>
<div>
	<!-- dialog create  municipio -->
	<el-dialog 
	    width="30%"
		title="Nuevo Municipio" 
		:visible.sync="dialogFormMunicipioVisible"
		:close-on-press-escape="true"
		center>
		<el-form label-position="top">
			<el-form-item label="Codigo dane" :label-width="formLabelWidth">
			<el-input size="mini" @input="setCodigoMunicipio" autoComplete="off"></el-input>
			</el-form-item>
			<el-form-item label="Nombre municipio" :label-width="formLabelWidth">
			<el-input size="mini" @input="setMunicipioName" autoComplete="off"></el-input>
			</el-form-item>
			<el-form-item label="Departamento" :label-width="formLabelWidth">
			<el-input size="mini" @input="setDepartamentoName" autoComplete="off"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogFormMunicipioVisible = false">Cerrar</el-button>
			<el-button type="primary" @click="createMunicipio">Crear</el-button>
		</span>
	</el-dialog>
	<!-- dialog create ruta -->
	<el-dialog 
	top="5vh"
	width="30%"
	title="Nueva ruta" 
	:visible.sync="dialogFormVisible"
	:close-on-press-escape="true"
	fullscreen
	center>
		<el-form label-position="top">
			
			<el-row>
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<el-form-item label="Origen" :label-width="formLabelWidth">
					<el-select size="mini" @change="setMunicipioOrigenId" filterable :value="ruta.municipio_origen_id" placeholder="Seleccione..">
						<el-option
						v-for="item in municipios_list"
						:key="item.id"
						:label="item.nombre_municipio"
						:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<el-form-item label="Destino" :label-width="formLabelWidth">
					<el-select size="mini" @change="setMunicipioDestinoId" filterable :value="ruta.municipio_destino_id" placeholder="Seleccione..">
						<el-option
						v-for="item in municipios_list"
						:key="item.id"
						:label="item.nombre_municipio"
						:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<el-form-item label="Kilometros" :label-width="formLabelWidth">
					<el-input 
						size="mini" 
						@input="setKilometros"
						auto-complete="off">
					</el-input>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<el-form-item label="Valor flete">
					<el-input 
					style="color:green;"
					size="mini"
					@input="setValorflete"
					placeholder="">
					</el-input>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<el-form-item label="Anticipo sugerido">
					<el-input 
					style="color:yellow;"
					size="mini"
					@input="setAnticipoSugerido"
					placeholder="">
					</el-input>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<el-form-item label="Pago conductor HQ">
					<el-input 
					size="mini"
					style="color:red;"
					@input="setPagoConductor"
					placeholder="">
					</el-input>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<el-form-item label="Pago tercero">
					<el-input 
					size="mini"
					style="color:red;"
					@input="setPagoTercero"
					placeholder="">
					</el-input>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<el-form-item label="Pago cabezote">
					<el-input 
					size="mini"
					style="color:red;"
					@input="setPagoCabezote"
					placeholder="">
					</el-input>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<el-form-item label="Tipo de vehiculo">
					<el-select size="mini" v-model="tipo_de_vehiculo_selected" placeholder="Seleccione..">
						<el-option
						v-for="item in tipo_de_vehiculo_options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button size="medium" @click="dialogFormVisible = false; setAnticipoSugerido(0); setValorflete(0); rutaReset()">Cerrar</el-button>
			<el-button size="medium" type="primary" @click="create_ruta">Crear</el-button>
		</span>
	</el-dialog>

	<!-- dialog edit ruta -->
	<el-dialog 
	top="5vh"
	width="30%"
	title="Actualizando ruta" 
	:visible.sync="dialogFormEditVisible"
	:close-on-press-escape="true"
	fullscreen
	center>
		<RutasEditForm></RutasEditForm>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" @click="dialogFormEditVisible = false;  rutaReset()">Cerrar</el-button>
			<el-button size="mini" type="primary" @click="editRuta">Actualizar</el-button>
		</span>
	</el-dialog>

	<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
		<h1>Rutas</h1>
		<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
			<div>
				<el-input size="mini" placeholder="Buscar" v-model="filter" class="input-with-select">
					<el-select v-model="selectTypeOfSearch" slot="prepend" placeholder="Seleccione">
					<el-option v-for="col in headings" :key="col" :label="col" :value="col"></el-option>
					</el-select>
				</el-input>
			</div>
		</el-col>
		<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
			<div style="padding: 3px 0;">
				<el-row style="text-align: right;">
				<el-button type="default" size="mini" @click="reloadTable" style="margin-right:5px;"><i class="mdi mdi-reload"></i></el-button>
				<el-button type="default" size="mini" @click="exportTable" style="margin-right:5px;"><i class="mdi mdi-file-excel"></i></el-button>
				<el-dropdown style="float: right;" trigger="click" @command="handleAction">  
					<el-button size="mini">
						<i class="mdi mdi-settings"></i>
					</el-button>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item :disabled="(permisos['Rutas'].crear)? false:true" command="createRuta"><i class="mdi mdi-plus"></i> Nueva ruta</el-dropdown-item>
						<el-dropdown-item :disabled="(permisos['Rutas'].editar)? false:true" command="edit"><i class="mdi mdi-pencil mr-10"></i> Editar</el-dropdown-item>
						<el-dropdown-item :disabled="(permisos['Rutas'].eliminar)? false:true" command="del"><i class="mdi mdi-delete mr-10"></i> Eliminar</el-dropdown-item>
						<el-dropdown-item :disabled="(permisos['Rutas'].crear)? false:true" command="createMunicipio" divided><i class="mdi mdi-city mr-10"></i> Nuevo municipio</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				</el-row>
			</div>
		</el-col>
	<el-table
	v-loading.body="loadingRutasTable"
	ref="rutasTable"
	size="mini"
	stripe
	max-height="250"
	highlight-current-row
	@current-change="handleCurrentTableChange"
    :data="filtered"
	v-if="filtered"
	:default-sort = "{prop: 'id', order: 'descending'}"
    style="width: 100%">
    <el-table-column
	  sortable
	  center
      fixed
      prop="id"
      label="ID"
      min-width="60">
    </el-table-column>
    <el-table-column
	  sortable
      prop="nombre_municipio_origen"
      label="Origen"
      min-width="150">
    </el-table-column>
	<el-table-column
	  sortable
      prop="nombre_municipio_destino"
      label="Destino"
      min-width="150">
    </el-table-column>
    <el-table-column
	  sortable
	  align="center"
      prop="kilometros"
      label="Kilometros"
      min-width="150">
    </el-table-column>
	<el-table-column
	  sortable
	  align="center"
      prop="valor_flete"
      label="Valor flete"
      min-width="190">
    </el-table-column>
	<el-table-column
	  sortable
	  align="center"
      prop="anticipo_sugerido"
      label="Anticipo Sugerido"
      min-width="200">
    </el-table-column>
	<el-table-column
	  sortable
	  align="center"
      prop="pago_conductor_HQ"
      label="Pago conductor"
      min-width="200">
    </el-table-column>
	<el-table-column
	  sortable
	  align="center"
      prop="pago_tercero"
      label="Pago tercero"
      min-width="200">
    </el-table-column>
	<el-table-column
	  sortable
	  align="center"
      prop="pago_cabezote"
      label="Pago cabezote"
      min-width="200">
    </el-table-column>
    <el-table-column
	  fixed="right"
	  align="center"
      label="Comentarios"
      min-width="100">
	  <template slot-scope="scope">
		    <el-popover
			placement="left"
			width="450"
			trigger="click">
			<el-table size="mini" :data="scope.row.comentario">
				<el-table-column min-width="180" property="fecha" label="Fecha"></el-table-column>
				<el-table-column width="100" property="usuario" label="Usuario"></el-table-column>
				<el-table-column width="300" property="comentario" label="Comentario"></el-table-column>
			</el-table>
			<el-button size="mini" slot="reference"><i class="mdi mdi-eye"></i></el-button>
			</el-popover>
			
	  </template>
    </el-table-column>
  </el-table>
  </el-col>
</div>
	
</template>

<script>
import HTTP from '../../http';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import moment from 'moment-timezone'
import router from '../../router'
//componentes
import RutasEditForm from '@/components/Rutas/editForm'
//servicios
import exportService from '../../services/exportService'
const formatter = new Intl.NumberFormat({
    style: 'currency',
})

export default {
	name: 'RutasTable',
	data () {
      	return {
            selectTypeOfSearch: 'Origen',
			filter: '',
			dialogTableVisible: false,
			dialogFormVisible: false,
			dialogFormMunicipioVisible: false,
			dialogFormEditVisible: false,
			formLabelWidth: '120px',
		}
	},
	computed: {
		...mapState('sharedValues', [
			'tipo_de_vehiculo_options',
        ]),
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('rutas', [
			'rutasList',
			'headings',
			'loadingRutasTable',
			'dataReady',
			'ruta',
			'municipios_list',
			'valor_flete_formatted',
			'valor_anticipo_formatted',
			'pago_conductor_formatted',
			'pago_tercero_formatted',
			'pago_cabezote_formatted',
		]),
		tipo_de_vehiculo_selected: {
            get(){
                return this.ruta.tipo_de_vehiculo
            },
            set(value){
                this.setTipoDeVehiculo(value)
            }
        },
        filtered(){
			if(this.dataReady){
				if(this.filter !== ''){
					let type = this.selectTypeOfSearch.toLowerCase()
					return this.rutasList.filter(ruta => {
						if(type == 'origen'){
							type = 'nombre_municipio_origen'
						}
						if(type == 'destino'){
							type = 'nombre_municipio_destino'
						}
						
						if(isNaN(ruta[type])){

							return ruta[type].toLowerCase().includes(this.filter.toLowerCase())
						}
						return ruta[type].toString().includes(this.filter.toString())
					})
				}
				return this.rutasList
			}
		},
	},
	components: {
		RutasEditForm,
	},
    methods: {
		...mapMutations('rutas', [
			'setFullRuta',
			'setKilometros',
			'setAnticipoSugerido',
			'setValorflete',
			'setComentario',
			'setMunicipioId',
			'rutaReset',
			'setMunicipioName',
			'setDepartamentoName',
			'setCodigoMunicipio',
			'setPagoConductor',
			'setPagoTercero',
			'setPagoCabezote',
			'setMunicipioOrigenId',
			'setMunicipioDestinoId',
			'setTipoDeVehiculo',
			'setLoadingRutasTable',
		]),
        ...mapActions('rutas',[
			'fetchRutasList',
			'fetchComments',
			'fetchMunicipios',
			'createRuta',
			'create_municipio',
			'delRuta',
			'editRuta',
		]),
		summarizeValues(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = 'Total';
            return;
		  }
		  if (index === 9) {
			  sums[index] = '';
            return;
          }
          const values = data.map(item => {
			  if(column.property == 'comentario'){
				  return
			  }
			  if(item[column.property] != undefined){
			  	  return Number(item[column.property].toString().replace(/\$/g,'').replace(/\,/g,''))
			  }
			  return
		  })
          if (!values.every(value => isNaN(value))) {
			  let symbol = '$';
			  if(index == 'kilometros'){
				  symbol = '';
			  }
            sums[index] = symbol + formatter.format(parseInt(values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0)));
          } else {
            sums[index] = '';
          }
        });
			return sums;
		},
		exportTable(){
			exportService.toXLS(this.rutasList, 'Rutas', true)
		},
		reloadTable(){
			this.fetchRutasList()	
		},
		handleCurrentTableChange(val) {
			if(val == null){
				this.$refs.rutasTable.setCurrentRow(val);
				return
			}
			this.setFullRuta(val)
			this.$refs.rutasTable.setCurrentRow(val);
		},
		handleAction(e, row){
            if(e == 'createRuta'){
				this.rutaReset()
				this.dialogFormVisible = true;
			}
			if(e == 'createMunicipio'){
				this.dialogFormMunicipioVisible = true;
			}
			if(e == 'edit'){
				this.fetchComments()
				this.dialogFormEditVisible = true
			}
		
			if(e == 'del'){
				this.$confirm('Esta operacion eliminara permanentemente este registro. Continuar?', 'Atencion!', {
					confirmButtonText: 'OK',
					cancelButtonText: 'Cancelar',
					type: 'warning'
				}).then(() => {
					this.delRuta()
					this.fetchRutasList()
				}).catch(() => {
					this.$message({
						type: 'warning',
						message: 'Cancelado'
					});          
				});
			}
        },
		back(){
			router.push('/cuadre-viaje')
		},
		pushToEdit(row){
			this.setFullRuta(row)

		},
		create_ruta(){
			if(this.createRuta()){
				this.fetchRutasList()
				this.dialogFormVisible = false
			}
		},
		createMunicipio(){
			if(this.create_municipio()){
				this.dialogFormMunicipioVisible = false
			}
		},
		
    },
    created: function(){
		this.fetchRutasList()
		this.fetchMunicipios()
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';
.page-table {
	&.overflow {
		overflow: auto;
	}
	
	.table-box {
		overflow: hidden;
	}
	.center{
		text-align: center;
	}
}
</style>
<style lang="scss">
@import '../../assets/scss/_variables';


.page-table {
	
	.custom-action-row {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

		.el-button {
			padding: 1px 5px;
		}
	}

	.toolbar-box {
		margin-top: 20px;

		.search-box {
			& > div {
				width: 20px;
				display: inline-block;
			}

			margin-bottom: 10px;

			i {
				display: inline-block;
				width: 22px;
			}

			input {
				outline: none;
				background: transparent;
				border: none;
				font-size: 15px;
				position: relative;
				padding: 0;
				margin-left: -20px;
				display: inline-block;
				padding-left: 20px;
				box-sizing: border-box;
				top: -1px;
				width: 100%;
				color: $text-color;
			}

			.icons-tot {
				margin-right: 20px;
			}
		}

		.pagination-box {
			width: 120px;
			margin: 0 15px;

			.select-box {
				width: 70px;
				display: inline-block;
			}

			.label {
				width: 50px;
				display: inline-block;
			}

			.el-input__inner {
				height: 22px;
				border: none;
				background: transparent;
				font-size: 16px;
				text-align: right;
				font-family: inherit;
				padding-right: 20px;
				color: $text-color;
			}

			.el-input__suffix {
				right: -3px;

				.el-select__caret {
					color: transparentize($text-color, 0.7);
				}
			}
		}

		a, button {
			padding: 0;
			margin: 0 15px;
			background: transparent;
			border: none;
			outline: none;
			font-family: inherit;
			font-size: inherit;
			cursor: pointer;

			border-bottom: 1px solid;
			text-decoration: none;
			color: $text-color;
			&:hover {
				opacity: .6;
			}
		}

		a {
			margin-right: 0;
		}
	}

	.sel-string {
		.sel {
			background: transparentize($text-color, 0.8);
			border-radius: 5px;
			text-transform: uppercase;
		}
	}
	.white-bg{
		background-color: #ccc;
	}
}

@media (max-width: 768px) {
	.page-table {
		.toolbar-box {
			display: block;
			overflow: hidden;
			font-size: 80%;
		
			& > * {
				display: inline-block;
				min-width: 120px;
				height: 22px;
				background: rgba(0, 0, 0, 0.04);
				padding: 4px;
				margin: 3px !important;
			}
		}
	}
}
</style>

