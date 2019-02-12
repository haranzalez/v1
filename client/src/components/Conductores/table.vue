<template>
<div>
	<!-- licencia create form -->
	<el-dialog width="30%" top="5vh" :visible.sync="LicenciaCreateFormVisible">
		<h3 style="text-align:center;" slot="title">{{conductor.nombres + ' ' + conductor.primer_apellido}}</h3>
		<LicenciaCreateForm></LicenciaCreateForm>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" @click="LicenciaCreateFormVisible = false">Cerrar</el-button>
			<el-button size="mini" type="primary" @click="create_licencia">Crear</el-button>
		</span>
	</el-dialog>
	<!-- licencia edit form -->
	<el-dialog width="30%" top="5vh" :visible.sync="LicenciaEditFormVisible">
		<h3 style="text-align:center;" slot="title">{{conductor.nombres + ' ' + conductor.primer_apellido}}</h3>
		<LicenciaEditForm></LicenciaEditForm>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" @click="LicenciaEditFormVisible = false">Cerrar</el-button>
			<el-button size="mini" type="primary" @click="update_licencia">Actualizar</el-button>
		</span>
	</el-dialog>
	<!--datos bancarios create form -->
	<el-dialog fullscreen width="30%" top="5vh" :visible.sync="_datosBancariosCreateFormVisible">
		<h3 style="text-align:center;" slot="title">{{conductor.nombres + ' ' + conductor.primer_apellido}}</h3>
		<DatosBancariosCreateForm></DatosBancariosCreateForm>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" @click="_datosBancariosCreateFormVisible = false">Cerrar</el-button>
			<el-button size="mini" type="primary" @click="create_datos_bancarios">Crear</el-button>
		</span>
	</el-dialog>
	<!--datos bancarios edit form -->
	<el-dialog fullscreen width="30%" top="5vh"  :visible.sync="_datosBancariosEditFormVisible">
		<h3 style="text-align:center;" slot="title">{{conductor.nombres + ' ' + conductor.primer_apellido + ' ' + conductor.segundo_apellido}}</h3>
		<DatosBancariosEditForm></DatosBancariosEditForm>
		<span slot="footer" class="dialog-footer">
			<el-button @click="_datosBancariosEditFormVisible = false">Cerrar</el-button>
			<el-button type="primary" @click="update_datos_bancarios">Actualizar</el-button>
		</span>
	</el-dialog>
	<!--Edit dialog form -->
	<el-dialog fullscreen width="30%" top="5vh" :visible.sync="editFormVisible">
		<h3 style="text-align:center;" slot="title">{{conductor.nombres + ' ' + conductor.primer_apellido + ' ' + conductor.segundo_apellido}}</h3>
		<ConductoresEditForm></ConductoresEditForm>
		<span slot="footer" class="dialog-footer">
			<el-button @click="editFormVisible = false">Cancelar</el-button>
			<el-button type="primary" @click="editConductor">Actualizar</el-button>
		</span>
	</el-dialog>
	<!--Create dialog form -->
	<el-dialog fullscreen width="30%" top="10vh" :visible.sync="createFormVisible">
		<h3 style="text-align:center;" slot="title">Nuevo conductor</h3>
		<ConductoresCreateForm></ConductoresCreateForm>
		<span slot="footer" class="dialog-footer">
			<el-button @click="createFormVisible = false">Cancelar</el-button>
			<el-button type="primary" @click="create">Crear</el-button>
		</span>
	</el-dialog>
	<!--Table-->
	<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
		<h1>Conductores</h1>
		<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
			<div class="serachBar-ctn pb-10">
				<el-input size="mini" placeholder="Buscar" v-model="filter" class="input-with-select">
					<el-select v-model="selectTypeOfSearch" slot="prepend" placeholder="Seleccione">
					<el-option v-for="col in headings" :key="col" :label="col" :value="col"></el-option>
					</el-select>
				</el-input>
			</div>
		</el-col>
		<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
			<div style="text-align:right;">
                <el-button type="default" size="mini" @click="reloadTable" style="margin-right:5px;"><i class="mdi mdi-reload"></i></el-button>
				<el-button type="default" size="mini" @click="exportTable" style="margin-right:5px;"><i class="mdi mdi-file-excel"></i></el-button>
				<el-dropdown  trigger="click" @command="handleAction">  
				<el-button size="mini">
					<i class="mdi mdi-settings"></i>
				</el-button>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item :disabled="(permisos['Conductores'].crear)? false:true" command="create"><i class="mdi mdi-plus mr-10"></i> Crear</el-dropdown-item>
                    <el-dropdown-item :disabled="(permisos['Conductores'].editar)? false:true" command="edit"><i class="mdi mdi-pencil mr-10"></i> Editar</el-dropdown-item>
                    <el-dropdown-item :disabled="(permisos['Conductores'].eliminar)? false:true" command="del"><i class="mdi mdi-delete mr-10"></i> Eliminar</el-dropdown-item>
					<el-dropdown-item :disabled="(permisos['Conductores'].eliminar)? false:true" command="registrarCuentaBancaria" divided><i class="mdi mdi-bank mr-10"></i> Datos bancarios</el-dropdown-item>
					<el-dropdown-item :disabled="(permisos['Conductores'].eliminar)? false:true" command="registrarLicencia" ><i class="mdi mdi-account-card-details mr-10"></i> Licencias</el-dropdown-item>
				</el-dropdown-menu>
    		</el-dropdown>
			</div>
		</el-col>
		
		
	
	<el-table
	v-loading.body="loadingConductoresTable"
	stripe
	max-height="250"
	highlight-current-row
	@current-change="handleCurrentTableChange"
	ref="conductoresTable"
	size="mini"
	id="conductores_table"
    :data="filtered"
	v-if="filtered"
	:default-sort = "{prop: 'id', order: 'descending'}"
    style="width: 100%"
	>
    <el-table-column
	  sortable
      fixed
      prop="id"
      label="ID"
      width="50">
    </el-table-column>
    <el-table-column
	  sortable
      prop="codigo"
      label="Codigo"
      width="120">
    </el-table-column>
    <el-table-column
	  sortable
      prop="nombres"
      label="Nombres"
      width="120">
    </el-table-column>
	<el-table-column
	  sortable
      prop="primer_apellido"
      label="Apellido 1"
      width="120">
    </el-table-column>
	<el-table-column
	  sortable
      prop="segundo_apellido"
      label="Apellido 2"
      width="120">
    </el-table-column>
	<el-table-column
	  sortable
      prop="tipo_de_conductor"
      label="Tipo"
    >
    </el-table-column>
	<el-table-column
      prop="estado"
      label="Estado"
      width="100"
      :filters="[{ text: 'Activo', value: true },{ text: 'Inactivo', value: false }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="determineEstado(scope.row.estado)"
          disable-transitions>
		  {{(scope.row.estado)?'Activo':'Inactivo'}}
		</el-tag>
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
import { Notification, Message } from 'element-ui'
//servicios
import exportService from '../../services/exportService'
//componentes
import ConductoresEditForm from '@/components/Conductores/editForm'
import ConductoresCreateForm from '@/components/Conductores/createForm'
import DatosBancariosCreateForm from '@/components/Conductores/datosBancariosCreateForm'
import DatosBancariosEditForm from '@/components/Conductores/datosBancariosEditForm'
import LicenciaCreateForm from '@/components/Conductores/licenciasCreateForm'
import LicenciaEditForm from '@/components/Conductores/licenciasEditForm'

export default {
	name: 'ConductorTable',
	data () {
      	return {
			LicenciaCreateFormVisible: false,
			LicenciaEditFormVisible: false,
			editFormVisible: false,
			createFormVisible: false,
			selectTypeOfSearch: 'Nombre',
			tableData: [],
            filter: '',
		}
	},
	computed: {
		_datosBancariosCreateFormVisible: {
			get(){
				return this.datosBancariosCreateFormVisible
			},
			set(value){
				this.setDatosBancariosCreateFormVisible(value)
			}
		},
		_datosBancariosEditFormVisible: {
			get(){
				return this.datosBancariosEditFormVisible
			},
			set(value){
				this.setDatosBancariosEditFormVisible(value)
			}
		},
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('conductores', [
			'conductor',
			'datosBancarios',
			'licencia',
			'headings',
            'conductoresList',
			'conductoresDataReady',
			'loadingConductoresTable',
			'datosBancariosCreateFormVisible',
			'datosBancariosEditFormVisible',
		]),
        filtered(){
			
			if(this.filter !== ''){
				let type = this.selectTypeOfSearch.toLowerCase()
				return this.conductoresList.filter(conductor => {
					if(isNaN(conductor[type])){
						return conductor[type].toLowerCase().includes(this.filter.toLowerCase())
					}
					return conductor[type].toString().includes(this.filter.toString())
				})
			}
			return this.conductoresList
			
		},
	},
	components: {
		ConductoresEditForm,
		ConductoresCreateForm,
		DatosBancariosCreateForm,
		DatosBancariosEditForm,
		LicenciaCreateForm,
		LicenciaEditForm,
	},
    methods: {
		determineEstado(row){
			if(row == false){
				return 'danger'
			}
			if(row == true){
				return 'success'
			}
		},
		reloadTable(){
			this.fetchConductoresList() 
        },
        exportTable(){
			exportService.toXLS(this.conductoresList, 'Vehiculos', true)
		},
		handleAction(e, row){
			if(e == 'registrarCuentaBancaria'){
				if(this.datosBancarios.length == 0){
					this.$confirm(this.conductor.nombres + ' ' + this.conductor.primer_apellido + ' aun no tiene datos bancarios registrados en el sistema. Desea crear un nuevo registro para este conductor?', 'Atencion!', {
						confirmButtonText: 'Si',
						cancelButtonText: 'No',
						type: 'warning'
					}).then(() => {
						this.DatosBancariosCreateFormVisible = true
					}).catch(() => {
						this.$message({
							type: 'warning',
							message: 'Operacion cancelada'
						});          
					});
					
				}else{
					this.DatosBancariosEditFormVisible = true
				}
			}
			if(e == 'registrarLicencia'){
				if(this.licencia.length == 0){
					this.resetLicencia()
					this.$confirm(this.conductor.nombres + ' ' + this.conductor.primer_apellido + ' aun no tiene licencias registradas en el sistema. Desea crear un nuevo registro para este conductor?', 'Atencion!', {
						confirmButtonText: 'Si',
						cancelButtonText: 'No',
						type: 'warning'
					}).then(() => {
						this.LicenciaCreateFormVisible = true
					}).catch(() => {
						this.$message({
							type: 'warning',
							message: 'Operacion cancelada'
						});          
					});
					
				}else{
					this.LicenciaEditFormVisible = true
				}
			}
            if(e == 'create'){
				this.resetConductoresVars()
				this.resetDatosBancarios()
				this.createFormVisible = true;
            }
             if(e == 'edit'){
				this.editFormVisible = true;
            }
             if(e == 'del'){
                 this.pushToDel(row)
			}
        },
        handleCurrentTableChange(val) {
			if(val == null){
				this.$refs.conductoresTable.setCurrentRow(val);
				return
			}
			console.log(val.id)
			this.fetchConductor(val.id)
			this.$refs.conductoresTable.setCurrentRow(val);
		},
		...mapMutations('conductores', [
			'setFullConductor',
			'setDataReady',
			'resetConductoresVars',
			'resetDatosBancarios',
			'resetLicencia',
			'setDatosBancariosCreateFormVisible',
			'setDatosBancariosEditFormVisible',
		]),
        ...mapActions('conductores',[
			'fetchConductor',
			'fetchConductoresList',
			'createConductor',
			'editConductor',
			'delConductor',
			'create_datos_bancarios',
			'update_datos_bancarios',
			'fetchDatosBancarios',
			'create_licencia',
			'update_licencia',
		]),
		create(){
			this.createConductor()
			this.createFormVisible = false
			this.datosBancariosCreateFormVisible = true
			this.fetchConductoresList()
		},
		pushToDel(row){
			this.$confirm('Esta operacion eliminara permanentemente este registro. Continuar?', 'Atencion!', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancelar',
                type: 'warning'
            }).then(() => {
				
				this.delConductor()
				this.editFormVisible = false
				this.fetchConductoresList()
            }).catch(() => {
                this.$message({
                    type: 'warning',
                    message: 'Cancelado'
                });          
            });
			
		}
    },
    created: function(){
		this.fetchConductoresList()
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
}
</style>
<style lang="scss">
@import '../../assets/scss/_variables';

.serachBar-ctn{

}
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

