<template>
<div>
	<el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
	<h1>Roles</h1>
	<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
		<div class="serachBar-ctn">
			<el-input placeholder="Buscar" v-model="filter" class="input-with-select"></el-input>
		</div>
	</el-col>
	<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
		<div style="text-align:right;">
			<el-button @click="pushToCreateRole" :disabled="rolePermisos.crear">Crear</el-button>
		</div>
	</el-col>

	<el-table
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
      width="220">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="Acciones"
      width="120">
      <template slot-scope="scope">
        <el-button @click="pushToEditRole(scope.row.id)" type="text" size="small">Detalles</el-button>
      </template>
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





export default {
	name: 'RolesTable',
	data () {
      	return {
			filter: '',
			list: null,
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
		'rolePermisos',
		]),
		...mapState('authentication', [
			'usuario',
		])
	},
    methods: {
		...mapMutations('roles', [
			'setUsuario',
		]),
		...mapActions('roles',[
			'fetchRoles',
			'pushToEditRole',
			'pushToCreateRole',
			'delRole',
			'extractPermisos',
		]),
		del(nombre,id) {
			this.$confirm('El role '+nombre+' sera permanentemente eliminado de los registros. Continuar?', 'Atencion', {
				confirmButtonText: 'OK',
				cancelButtonText: 'Cancelar',
				type: 'warning',
				center: true
			}).then(() => {
				this.delRole(id)
				this.fetchRoles();
				this.$refs.table.refresh();
			}).catch(() => {
				this.$message({
					type: 'info',
					message: 'Eliminacion cancelada'
				});
			});
		  },
	},
	created() {
		this.setUsuario(this.usuario)
		this.extractPermisos()
		
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

