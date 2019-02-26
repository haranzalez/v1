<template>
		<div>
			<!-- create documento form -->
			<el-dialog
			title="Nueva certificacion"
			:visible.sync="documentosConductorCreateFormDialogVisible"
			width="30%"
			:append-to-body="true"
			>
			<DocumentosConductoresCreateForm></DocumentosConductoresCreateForm>
			<span slot="footer" class="dialog-footer">
				<el-button @click="documentosConductorCreateFormDialogVisible = false">Cerrar</el-button>
				<el-button type="primary" :disabled="(permisos['Conductores'].crear)?false:true" @click="createDocumento(); documentosConductorCreateFormDialogVisible = false">Crear</el-button>
			</span>
		</el-dialog>
		<!--edit documento form -->
			<el-dialog
			title="Editando certificacion"
			:visible.sync="documentosConductorEditFormDialogVisible"
			width="30%"
			:append-to-body="true"
			>
			<DocumentosConductoresEditForm></DocumentosConductoresEditForm>
			<span slot="footer" class="dialog-footer">
				<el-button @click="documentosConductorEditFormDialogVisible = false">Cerrar</el-button>
				<el-button :disabled="(permisos['Conductores'].editar)?false:true" type="primary" @click="editDocumento(); documentosConductorEditFormDialogVisible = false">Actualizar</el-button>
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
				<el-dropdown-item command="create"><i class="mdi mdi-plus mr-10"></i> Crear</el-dropdown-item>
                <el-dropdown-item :disabled="disabledBtn" command="edit"><i class="mdi mdi-pencil mr-10"></i> Editar</el-dropdown-item>
                <el-dropdown-item :disabled="disabledBtn" command="del"><i class="mdi mdi-delete mr-10"></i> Eliminar</el-dropdown-item>
				</el-dropdown-menu>
    		</el-dropdown>
			</div>
		</el-col>
    <el-table
		highlight-current-row
		@current-change="handleCurrentTableChange"
		ref="documentosConductorTable"
		size="mini"
    :data="documentosList"
    style="width: 100%">
    <el-table-column
    label="Instituto"
    prop="institucion">
    </el-table-column>
    <el-table-column
    label="Tipo de documento"
    prop="tipo_de_documento">
    </el-table-column>
    <el-table-column
      label="Fecha inicio"
      prop="fecha_inicio">
			<template slot-scope="scope">
				{{formatDate(scope.row.fecha_inicio)}}
			</template>
    </el-table-column>
    <el-table-column
      label="Fecha fin"
      prop="fecha_fin">
			<template slot-scope="scope">
				{{formatDate(scope.row.fecha_fin)}}
			</template>
    </el-table-column>
  	</el-table>
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
import dateService from '../../services/DateFormatService'
//componentes
import DocumentosConductoresCreateForm from '@/components/Conductores/documentosCreateForm'
import DocumentosConductoresEditForm from '@/components/Conductores/documentosEditForm'

export default {
	name: 'DocumentosConductorTable',
	data () {
    return {
			documentosConductorCreateFormDialogVisible: false,
			documentosConductorEditFormDialogVisible: false,
			disabledBtn: true,
		}
	},
	computed: {
        
    ...mapState('authentication', [
			'permisos',
		]),
    ...mapState('documentosConductor', [
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
		DocumentosConductoresCreateForm,
    DocumentosConductoresEditForm,
	},
    methods: {
		formatDate(date){
			return dateService.fecha(date)
		},
		reloadTable(){
			this.fetchDocumentosList()
		},
		exportTable(){
			exportService.toXLS(this.documentosList, 'Documentos conductores', true)
		},
		handleAction(e, row){
        if(e == 'create'){
						if(!this.permisos['Conductores'].crear){
							Notification.warning({
									title: 'Atencion!',
									message: 'Usted no tiene permisos para crear registros en este modulo.',
									position: 'bottom-right',
							});
							return
					}
					this.documentoConductorFormReset()
					this.documentosConductorCreateFormDialogVisible = true;
				}
				if(e == 'edit'){
					if(!this.permisos['Conductores'].editar){
							Notification.warning({
									title: 'Atencion!',
									message: 'Usted no tiene permisos para modificar registros en este modulo.',
									position: 'bottom-right',
							});
					}
					this.documentosConductorEditFormDialogVisible = true;
				} 
				if(e == 'del'){
						if(!this.permisos['Conductores'].eliminar){
								Notification.warning({
										title: 'Atencion!',
										message: 'Usted no tiene permisos para eliminar registros en este modulo.',
										position: 'bottom-right',
								});
								return
						}
						this.pushToDel(row)
				}
    },
    handleCurrentTableChange(val) {
			if(val == null){
				this.$refs.documentosConductorTable.setCurrentRow(val);
				this.disabledBtn = true
				return
			}
			this.disabledBtn = false
			this.fetchDocumento(val.id)
			this.$refs.documentosConductorTable.setCurrentRow(val);
		},
		
    ...mapMutations('documentosConductor', [
			'setFullDocumento',
			'documentoConductorFormReset',
		]),
		
		title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
		},
    ...mapActions('documentosConductor',[
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

.ConductorBtn, .conductorBtn{
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

