<template>
		<div>
			<!-- create documento form -->
			<el-dialog
			title="Nueva poliza"
			:visible.sync="documentosVehiculoCreateFormDialogVisible"
			width="30%"
			:append-to-body="true"
			>
			<DocumentosVehiculosCreateForm></DocumentosVehiculosCreateForm>
			<span slot="footer" class="dialog-footer">
				<el-button @click="documentosVehiculoCreateFormDialogVisible = false">Cerrar</el-button>
				<el-button type="primary" @click="createDocumento(); documentosVehiculoCreateFormDialogVisible = false">Crear</el-button>
			</span>
		</el-dialog>
		<!--edit documento form -->
			<el-dialog
			title="Nueva poliza"
			:visible.sync="documentosVehiculoEditFormDialogVisible"
			width="30%"
			:append-to-body="true"
			>
			<DocumentosVehiculosEditForm></DocumentosVehiculosEditForm>
			<span slot="footer" class="dialog-footer">
				<el-button @click="documentosVehiculoEditFormDialogVisible = false">Cerrar</el-button>
				<el-button type="primary" @click="editDocumento(); documentosVehiculoEditFormDialogVisible = false">Actualizar</el-button>
			</span>
		</el-dialog>

			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
			<div style="text-align:right;">
        <el-button type="default" size="mini" @click="reloadTable" style="margin-right:5px;"><i class="mdi mdi-reload"></i></el-button>
				<el-button type="default" size="mini" @click="exportTable" style="margin-right:5px;"><i class="mdi mdi-file-excel"></i></el-button>
				<el-dropdown  trigger="click" @command="handleAction">  
				<el-button size="mini">
					<i class="mdi mdi-settings"></i>
				</el-button>
				<el-dropdown-menu slot="dropdown">
				<el-dropdown-item :disabled="(permisos['Vehiculos'].crear)? false:true" command="create"><i class="mdi mdi-plus mr-10"></i> Crear</el-dropdown-item>
									<el-dropdown-item :disabled="(permisos['Vehiculos'].editar)? false:true" command="edit"><i class="mdi mdi-pencil mr-10"></i> Editar</el-dropdown-item>
									<el-dropdown-item :disabled="(permisos['Vehiculos'].eliminar)? false:true" command="del"><i class="mdi mdi-delete mr-10"></i> Eliminar</el-dropdown-item>
				</el-dropdown-menu>
    		</el-dropdown>
			</div>
		</el-col>
    <el-table
		highlight-current-row
		@current-change="handleCurrentTableChange"
		ref="documentosTable"
		size="mini"
    :data="documentosList"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <p>Numero de poliza: {{ props.row.numero_de_poliza }}</p>
        <p>Fecha de expedicion: {{ props.row.fecha_de_expedicion }}</p>
				<p>Fecha de vigencia: {{ props.row.fecha_de_vencimiento }}</p>
      </template>
    </el-table-column>
    <el-table-column
      label="Aseguradora"
      prop="aseguradora[0].nombre">
    </el-table-column>
    <el-table-column
      label="Tipo de poliza"
      prop="tipo_de_poliza">
    </el-table-column>
  	</el-table>
		</div>
</template>

<script>
import HTTP from '../../http';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import moment from 'moment-timezone'
import router from '../../router'
//servicios
import exportService from '../../services/exportService'
//componentes
import DocumentosVehiculosCreateForm from '@/components/Vehiculos/documentosCreateForm'
import DocumentosVehiculosEditForm from '@/components/Vehiculos/documentosEditForm'

export default {
	name: 'DocumentosVehiculoTable',
	data () {
    return {
			documentosVehiculoCreateFormDialogVisible: false,
			documentosVehiculoEditFormDialogVisible: false,
		}
	},
	computed: {
        
    ...mapState('authentication', [
			'permisos',
		]),
    ...mapState('documentosVehiculos', [
			'documento',
      'documentosList',
    ]),
    filtered(){
			if(this.filter !== ''){
				let type = this.selectTypeOfSearch.toLowerCase()
				type = type.replace(' ', '_')
				type = type.replace(' ', '_')
				return this.documentosList.filter(item => {
					if(isNaN(item[type])){
						return item[type].toLowerCase().includes(this.filter.toLowerCase())
					}
						return item[type].toString().includes(this.filter.toString())
					})
				}
			return this.documentosList
    },
	},
	components: {
		DocumentosVehiculosCreateForm,
		DocumentosVehiculosEditForm,
	},
    methods: {
		reloadTable(){
			this.fetchDocumentosList()
		},
		exportTable(){
			exportService.toXLS(this.documentosList, 'Vehiculos', true)
		},
		handleAction(e, row){
        if(e == 'create'){
					this.documentoFormReset()
					this.documentosVehiculoCreateFormDialogVisible = true;
				}
				if(e == 'edit'){ 
					this.documentosVehiculoEditFormDialogVisible = true;
				} 
				if(e == 'del'){
						this.pushToDel(row)
				}
    },
    handleCurrentTableChange(val) {
			if(val == null){
				this.$refs.documentosTable.setCurrentRow(val);
				return
			}
			this.fetchDocumento(val.id)
			this.$refs.documentosTable.setCurrentRow(val);
		},
		
    ...mapMutations('documentosVehiculos', [
			'setFullDocumento',
			'documentoFormReset',
		]),
		
		title(field){
				field = field.split('_').join(' ')
				field = field.charAt(0).toUpperCase() + field.slice(1)
				return field
		},
    ...mapActions('documentosVehiculos',[
			'fetchDocumentosList',
			'fetchDocumento',
			'createDocumento',
			'editDocumento',
			'delDocumento',
		]),
	
	
		pushToDel(row){
			this.$confirm('Esta operacion eliminara permanentemente este registro. Continuar?', 'Atencion!', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancelar',
                type: 'warning'
            }).then(() => {
				this.delDocumento()
            }).catch(() => {
                this.$message({
                    type: 'warning',
                    message: 'Cancelado'
                });          
            });
			
		}
    },
    created: function(){
		this.fetchDocumentosList()
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

.trailerBtn, .conductorBtn{
	color:black;
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

