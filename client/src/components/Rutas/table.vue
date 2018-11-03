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
	width="30%"
	title="Nueva ruta" 
	:visible.sync="dialogFormVisible"
	:close-on-press-escape="true"
	center>
		<el-form label-position="top">
			<el-form-item label="Kilometros" :label-width="formLabelWidth">
			<el-input size="mini" v-model="ruta.kilometros" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="Municipio" :label-width="formLabelWidth">
			<el-select size="mini" @change="setMunicipioId" :value="ruta.municipio_id" placeholder="Select">
				<el-option
				v-for="item in municipios_list"
				:key="item.id"
				:label="item.nombre_municipio"
				:value="item.id">
				</el-option>
			</el-select>
			</el-form-item>
			<el-form-item label="Valor flete">
				<el-input 
				:value="valor_flete_formatted"
				size="mini"
				@input="setValorflete"
				placeholder="">
				</el-input>
			</el-form-item>
			<el-form-item label="Anticipo sugerido">
				<el-input 
				:value="valor_anticipo_formatted"
				size="mini"
				@input="setAnticipoSugerido"
				placeholder="">
				</el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button size="medium" @click="dialogFormVisible = false; setAnticipoSugerido(0); setValorflete(0);">Cancelar</el-button>
			<el-button size="medium" type="primary" @click="create_ruta">Crear</el-button>
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
			<div style="text-align:right;">
				<el-dropdown style="float: right; padding: 3px 0" trigger="click" @command="handleAction">  
					<el-button size="mini">
						<i class="mdi mdi-settings"></i>
					</el-button>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item :disabled="(permisos['Rutas'].crear)? false:true" command="createRuta"><i class="mdi mdi-plus"></i> Nueva ruta</el-dropdown-item>
						<el-dropdown-item :disabled="(permisos['Rutas'].crear)? false:true" command="createMunicipio"><i class="mdi mdi-city mr-10"></i> Nuevo municipio</el-dropdown-item>
						<el-dropdown-item command="export"><i class="mdi mdi-file-excel mr-10"></i> Exportar</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</el-col>
	<el-table
	size="mini"
    :data="filtered"
	show-summary
	:summary-method="summarizeValues"
	sum-text="Total"
	:default-sort = "{prop: 'id', order: 'descending'}"
    style="width: 100%">
    <el-table-column
	  sortable
      fixed
      prop="id"
      label="ID"
      min-width="50">
    </el-table-column>
    <el-table-column
	  sortable
      prop="nombre_municipio"
      label="Municipio"
      min-width="120">
    </el-table-column>
    <el-table-column
	  sortable
      prop="kilometros"
      label="Kilometros"
      min-width="150">
    </el-table-column>
	<el-table-column
	  sortable
      prop="valor_flete"
      label="Valor flete"
      min-width="190">
    </el-table-column>
	<el-table-column
	  sortable
      prop="anticipo_sugerido"
      label="Anticipo Sugerido"
      min-width="200">
    </el-table-column>
    <el-table-column
      label="Comentarios"
      min-width="180"
	  align="center">
	  <template slot-scope="scope">
		    <el-popover
			:ref="scope.row.id"
			placement="left"
			width="450"
			trigger="click">
			<el-table :data="scope.row.comentario">
				<el-table-column width="150" property="fecha" label="Fecha"></el-table-column>
				<el-table-column width="100" property="usuario" label="Usuario"></el-table-column>
				<el-table-column width="300" property="comentario" label="Comentario"></el-table-column>
			</el-table>
			</el-popover>
			<el-button size="mini" v-popover="scope.row.id">Ver comentarios</el-button>
	  </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="Acciones"
      min-width="120">
      <template slot-scope="scope">
        <el-button @click="pushToEdit(scope.row)" type="text" size="medium"><i class="mdi mdi-lead-pencil mr-10"></i></el-button>
		<el-button @click="pushToDel(scope.row)" type="text" size="medium"><i class="mdi mdi-delete mr-10"></i></el-button>
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
//servicios
import exportService from '../../services/exportService'
const formatter = new Intl.NumberFormat({
    style: 'currency',
})

export default {
	name: 'RutasTable',
	data () {
      	return {
            selectTypeOfSearch: 'Municipios',
			filter: '',
			dialogTableVisible: false,
			dialogFormVisible: false,
			dialogFormMunicipioVisible: false,
			formLabelWidth: '120px',
		}
	},
	computed: {
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('rutas', [
			'rutasList',
			'headings',
			'dataReady',
			'ruta',
			'municipios_list',
			'valor_flete_formatted',
			'valor_anticipo_formatted',
		]),
        filtered(){
			if(this.dataReady){
				if(this.filter !== ''){
					let type = this.selectTypeOfSearch.toLowerCase()
					return this.rutasList.filter(ruta => {
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
	},
    methods: {
		summarizeValues(param){
			const { columns, data } = param;
			const sums = [];
			columns.forEach((column, index) => {
			if (index === 0) {
				sums[index] = 'Total';
				return;
			}
			console.log()
			const values = data.map(item => Number(item[column.property]));
			console.log(values)
			for(let prop in values){
				console.log(values[prop])
				values[prop] = parseInt(values[prop].replace(/\,/g,''))
				values[prop] = parseInt(values[prop].replace(/\$/g,''))
			}
			if (!values.every(value => isNaN(value))) {
				if(index === 2){
					sums[index] = values.reduce((prev, curr) => {
					const value = Number(curr);
					if (!isNaN(value)) {
						return prev + curr;
					} else {
						return prev;
					}
					}, 0)+ ' Km.';
				}else{
					
					sums[index] = '$ ' + formatter.format(values.reduce((prev, curr) => {
					const value = Number(curr);
					if (!isNaN(value)) {
						return prev + curr;
					} else {
						return prev;
					}
					}, 0));
				}
				
			} else {
				sums[index] = '';
			}
			});

			return sums;
		},
		handleAction(e, row){
            if(e == 'createRuta'){
				this.dialogFormVisible = true;
			}
			if(e == 'createMunicipio'){
				this.dialogFormMunicipioVisible = true;
			}
			if(e == 'export'){
				exportService.toXLS(this.rutasList, 'Rutas', true)
            }
        },
		back(){
			router.push('/cuadre-viaje')
		},
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
		]),
        ...mapActions('rutas',[
			'fetchRutasList',
			'fetchMunicipios',
			'createRuta',
			'create_municipio',
			'delRuta',
		]),
		pushToEdit(row){
			this.setFullRuta(row)
			router.push('/rutas-editar')
		},
		create_ruta(){
			if(this.createRuta()){
				this.fetchRutasList()
				this.dialogFormVisible = false
				setAnticipoSugerido(0); 
				setValorflete(0);
			}
		},
		createMunicipio(){
			if(this.create_municipio()){
				this.dialogFormMunicipioVisible = false
			}
		},
		pushToDel(row){
			this.$confirm('Esta operacion eliminara permanentemente este registro. Continuar?', 'Atencion!', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancelar',
                type: 'warning'
            }).then(() => {
				this.setFullRuta(row)
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

