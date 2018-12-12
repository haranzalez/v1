<template>
<div>
	<!--Edit dialog form -->
	<el-dialog center fullscreen :width="dialogWidth" top="5vh" :visible.sync="editFormVisible">
		<RolesEditForm></RolesEditForm>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" @click="editFormVisible = false; paramsReset();">Cerrar</el-button>
			<el-button :loading="loadingActualizarBtn" size="mini" type="primary" @click="editRole">Actualizar</el-button>
		</span>
	</el-dialog>
	<!--Create dialog form -->
	<el-dialog fullscreen :width="dialogWidth" top="5vh" :visible.sync="createFormVisible">
		<RolesCreateForm></RolesCreateForm>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" @click="createFormVisible = false; paramsReset();">Cerrar</el-button>
			<el-button :loading="loadingCrearBtn" size="mini" type="primary" @click="createRole">Crear</el-button>
		</span>
	</el-dialog>
	<!--Table-->
	<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
	<h1>Roles</h1>
	<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
		<div class="serachBar-ctn">
			<el-input size="mini" placeholder="Buscar" v-model="filter" class="input-with-select"></el-input>
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
							<el-dropdown-item :disabled="(permisos['Usuarios'].crear)? false:true" command="create"><i class="mdi mdi-plus mr-10"></i> Crear</el-dropdown-item>
							<el-dropdown-item :disabled="btnsDisable" command="edit"><i class="mdi mdi-lead-pencil mr-10"></i> Editar</el-dropdown-item>
							<el-dropdown-item :disabled="btnsDisable" command="del"><i class="mdi mdi-delete mr-10"></i> Eliminar</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-row>
			</div>
	</el-col>


	<el-table
	v-loading.body="loading"
	size="mini"
	ref="rolesTable"
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
      width="50">
    </el-table-column>
    <el-table-column
	  sortable
      prop="nombre"
      label="Nombre"
      width="120">
    </el-table-column>
    <el-table-column
	  sortable
      prop="description"
      label="Descripcion"
    >
    </el-table-column>
  </el-table>
	</el-col>
</div>
	
</template>

<script>
import HTTP from '../../../http';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import moment from 'moment-timezone'
import rounter from '../../../router'
import Papa from 'papaparse'
import * as FS from 'file-saver'
//componentes
import RolesCreateForm from './CreateRole'
import RolesEditForm from './RoleEdit'
//UI
import { Notification } from 'element-ui'
//services
import NotificationServices from '../../../services/NotificationServices'






export default {
	name: 'RolesTable',
	data () {
      	return {
			filter: '',
			list: null,
			createFormVisible: false,
			editFormVisible: false,
			dialogWidth: '50%',
			btnsDisable: true,
			NotificationServices: NotificationServices,
		}
	},
	computed: {
		filtered(){
			if(this.dataReady){
				if(this.filter !== ''){
					return this.rolesList.filter(role => {
						return role['nombre'].toLowerCase().includes(this.filter.toLowerCase())
					})
				}
				return this.rolesList
			}
		},
		...mapState('roles',[
		'rolesList',
		'dataReady',
		'loading',
		'loadingActualizarBtn',
		'loadingCrearBtn',
		'roleToEdit',
		]),
		...mapState('authentication', [
			'permisos',
		])
	},
	components: {
		RolesCreateForm,
		RolesEditForm,
	},
    methods: {
		...mapMutations('roles', [
			'paramsReset',
			'setSelectedModules',
		]),
		...mapActions('roles',[
			'fetchRoles',
			'fetchRole',
			'editRole',
			'fetchAllModules',
			'rederSelectedModulos',
			'createRole',
			'pushToCreateRole',
			'delRole',
			'extractPermisos',
			'fetchPermisos',
		]),
		exportTable(){
			exportService.toXLS(this.rolesList, 'Roles', true)
		},
		reloadTable(){
			this.fetchRoles()
			this.btnsDisable = true
		},
		handleCurrentTableChange(val) {
			if(val == null){
				this.$refs.rolesTable.setCurrentRow(val);
				this.btnsDisable = true
				return
			}
			this.fetchRole(val.id)
			this.$refs.rolesTable.setCurrentRow(val);
			this.btnsDisable = false
		},
		handleAction(e){
			
            if(e == 'create'){
				this.paramsReset()
				this.setSelectedModules([])
				this.createFormVisible = true;
			}
			if(e == 'edit'){
				this.editFormVisible = true;
			}
			if(e == 'del'){
			
				this.$confirm(this.roleToEdit.nombre + ' sera permanentemente eliminado de los registros. Continuar?', 'Atencion', {
					confirmButtonText: 'OK',
					cancelButtonText: 'Cancelar',
					type: 'warning',
					center: true,
				}).then(() => {
					this.delRole()
				}).catch(() => {
					this.$message({
						type: 'info',
						message: 'Proceso cancelado'
					});
				});
			}
			
		},
		
	},
	created() {
    	this.fetchRoles()
	},
   
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/_variables';
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
@import '../../../assets/scss/_variables';

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

