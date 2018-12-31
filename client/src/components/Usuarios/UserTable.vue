<template>
<div>
	<!--report -->
	<el-dialog fullscreen :center="true" :width="dialogWidth" top="5vh" :visible.sync="reportDialogVisible">
		
		<span slot="footer" class="dialog-footer animated fadeInUp">
			<el-button size="mini" @click="reportDialogVisible = false;">Cerrar</el-button>
			<el-button size="mini" type="primary" @click="editUser">Actualizar</el-button>
		</span>
	</el-dialog>
	<!--Edit dialog form -->
	<el-dialog fullscreen :center="true" :width="dialogWidth" top="5vh" :visible.sync="editFormVisible">
		<UsuariosEditForm></UsuariosEditForm>
		<span slot="footer" class="dialog-footer animated fadeInUp">
			<el-button size="mini" @click="editFormVisible = false;">Cerrar</el-button>
			<el-button size="mini" type="primary" @click="editUser">Actualizar</el-button>
		</span>
	</el-dialog>
	<!--Create dialog form -->
	<el-dialog fullscreen :width="dialogWidth" top="5vh" :visible.sync="createFormVisible">
		<UsuariosCreateForm></UsuariosCreateForm>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" @click="createFormVisible = false; paramsReset();">Cerrar</el-button>
			<el-button size="mini" type="primary" @click="create">Crear</el-button>
		</span>
	</el-dialog>
	<!--Table-->
	<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
		<h1>Usuarios</h1>
		<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
			<div class="serachBar-ctn">
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
					<el-dropdown trigger="click" @command="handleAction">  
						<el-button size="mini" @click="NotificationServices.checkIfRecordSelected(btnsDisable)">
							<i class="mdi mdi-settings"></i>
						</el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="create"><i class="mdi mdi-plus mr-10"></i> Nuevo usuario</el-dropdown-item>
							<el-dropdown-item :disabled="btnsDisable" command="edit"><i class="mdi mdi-lead-pencil mr-10"></i> Editar</el-dropdown-item>
							<el-dropdown-item :disabled="btnsDisable" command="del"><i class="mdi mdi-delete mr-10"></i> Eliminar</el-dropdown-item>
							<el-dropdown-item :disabled="btnsDisable" command="logs" divided><i class="mdi mdi-briefcase mr-10"></i> Ver logs</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-row>
			</div>
		</el-col>
	<el-table
	v-loading.body="loading"
	size="mini"
	ref="usersTable"
	stripe
	max-height="250"
	highlight-current-row
	@current-change="handleCurrentTableChange"
    :data="filtered"
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
      prop="nombre"
      label="Nombre"
      min-width="120">
    </el-table-column>
    <el-table-column
	  sortable
      prop="apellido"
      label="Apellido"
      min-width="150">
    </el-table-column>
    <el-table-column
	  sortable
      prop="cedula"
      label="Cedula"
      min-width="120">
    </el-table-column>
    <el-table-column
	  sortable
      prop="tel_mobil"
      label="Celular"
      min-width="130">
    </el-table-column>
    <el-table-column
	  sortable
      prop="tel_fijo"
      label="Telefono"
      min-width="150">
    </el-table-column>
	<el-table-column
	  sortable
      prop="direccion"
      label="Direccion"
      min-width="220">
    </el-table-column>
	<el-table-column
	  sortable
      prop="ciudad"
      label="Ciudad"
      min-width="120">
    </el-table-column>
	<el-table-column
	  sortable
      prop="departamento"
      label="Departamento"
      min-width="150">
    </el-table-column>
	<el-table-column
	  fixed="right"
	  sortable
      label="Estado"
      min-width="120">
	  <template slot-scope="scope">
		  	<el-switch
			@change="changeState($event, scope.row)"
			:value="estados[scope.row.id]"
			active-color="#13ce66"
			inactive-color="#ff4949">
			</el-switch>
	  </template>
    </el-table-column>
  </el-table>

		
	
	</el-col>

</div>
	
</template>

<script>
import RolesTable from './Roles/RolesTable'
import HTTP from '../../http';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import moment from 'moment-timezone'
import Papa from 'papaparse'
import * as FS from 'file-saver'
//servicios
import exportService from '../../services/exportService'
import NotificationServices from '../../services/NotificationServices'
//componentes
import UsuariosEditForm from '@/components/Usuarios/UserEdit'
import UsuariosCreateForm from '@/components/Usuarios/UserCreate'






export default {
	name: 'UserTable',
	data () {
      	return {
			dialogWidth: '35%',
			editFormVisible: false,
			createFormVisible: false,  
			selectTypeOfSearch: 'Nombre',
			filter: '',
			list: null,
			btnsDisable: true,
			NotificationServices: NotificationServices,
		}
	},
	computed: {
		filtered(){
			if(this.dataReady){
				if(this.filter !== ''){
					let type = this.selectTypeOfSearch.toLowerCase()
					return this.usersList.filter(user => {
						if(isNaN(user[type])){
							return user[type].toLowerCase().includes(this.filter.toLowerCase())
						}
						return user[type].toString().includes(this.filter.toString())
					})
				}
				return this.usersList
			}
		},
		...mapState('users', [
			'usuario',
			'usersList',
			'dataReady',
			'headings',
			'estados',
			'loading',
		]),
		...mapState('authentication', [
			'permisos',
		])
	},
	components: {
		RolesTable,
		UsuariosEditForm,
		UsuariosCreateForm,
	},
    methods: {
		...mapMutations('users', [
			'paramsReset',
			'setFullUser',
			'setChangeEstdo',
			'selected',
		]),
		...mapActions('users',[
			'createUser',
			'editUser',
			'deleteUser',
			'fetchUsersList',
			'fetchRolesList',
			'changeEstado',
			'fetchUser',
		]),
		changeState(e, user){
			this.setChangeEstdo({
				id: user.id,
				value: e
			})
			this.setFullUser(user)
			this.changeEstado()
			
		},	
		exportTable(){
			exportService.toXLS(this.usersList, 'Usuarios')
		},
		reloadTable(){
			this.btnsDisable = true
			this.fetchUsersList()
		},
		handleCurrentTableChange(val) {
			if(val == null){
				this.$refs.usersTable.setCurrentRow(val);
				this.btnsDisable = true
				return
			}
			this.btnsDisable = false
			this.fetchUser(val.id)
			this.fetchRolesList('edit')
			this.$refs.usersTable.setCurrentRow(val);
		},
		handleAction(e){
            if(e == 'create'){
				this.paramsReset()
				this.createFormVisible = true;
			}
			if(e == 'edit'){
				this.editFormVisible = true;
			}
			if(e == 'del'){
				this.$confirm(this.usuario.nombre+' '+this.usuario.apellido+' sera permanentemente eliminado de los registros. Continuar?', 'Atencion', {
					confirmButtonText: 'OK',
					cancelButtonText: 'Cancelar',
					type: 'warning',
					center: true,
				}).then(() => {
					this.deleteUser()
					this.fetchUsersList();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: 'Eliminacion cancelada'
					});
				});
			}
			
		},
		
		create(){
			this.createUser()
			this.createFormVisible = false
			this.fetchUsersList()
		},
	},
	created: function(){
		this.fetchUsersList()
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

.el-dialog__footer{
	margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
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

