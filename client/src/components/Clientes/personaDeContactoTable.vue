<template>
		<div>
		<!-- create contacto form -->
		<el-dialog
		title="Nuevo contacto"
		:visible.sync="personaDeContactoClienteCreateFormDialogVisible"
		width="30%"
		:append-to-body="true"
		>
			    <personaDeContactoClientesCreateForm></personaDeContactoClientesCreateForm>
			<span slot="footer" class="dialog-footer">
				<el-button @click="personaDeContactoClienteCreateFormDialogVisible = false">Cerrar</el-button>
				<el-button type="primary" :disabled="(permisos['Clientes'].crear)?false:true" @click="createContacto(); personaDeContactoClienteCreateFormDialogVisible = false">Crear</el-button>
			</span>
		</el-dialog>
		<!--edit contacto form -->
			<el-dialog
			title="Editando contacto"
			:visible.sync="personaDeContactoClienteEditFormDialogVisible"
			width="30%"
			:append-to-body="true"
			>
			    <personaDeContactoClientesEditForm></personaDeContactoClientesEditForm>
			<span slot="footer" class="dialog-footer">
				<el-button @click="personaDeContactoClienteEditFormDialogVisible = false">Cerrar</el-button>
				<el-button :disabled="(permisos['Clientes'].editar)?false:true" type="primary" @click="editContacto(); personaDeContactoClienteEditFormDialogVisible = false">Actualizar</el-button>
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
		ref="personaDeContactoClienteTable"
		size="mini"
    :data="contactosList"
    style="width: 100%">
    <el-table-column
    label="Nombre"
    prop="nombre">
    </el-table-column>
    <el-table-column
    label="Celular"
    prop="celular">
    </el-table-column>
    <el-table-column
    label="Cargo"
    prop="cargo">
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
import personaDeContactoClientesCreateForm from '@/components/Clientes/contactosCreateForm'
import personaDeContactoClientesEditForm from '@/components/Clientes/contactosEditForm'

export default {
	name: 'personaDeContactoClienteTable',
	data () {
    return {
			personaDeContactoClienteCreateFormDialogVisible: false,
			personaDeContactoClienteEditFormDialogVisible: false,
			disabledBtn: true,
		}
	},
	computed: {
        
    ...mapState('authentication', [
			'permisos',
		]),
    ...mapState('personaDeContactoClientes', [
        'contacto',
        'contactosList',
    ]),
    filtered(){
        if(this.filter !== ''){
            let type = this.selectTypeOfSearch.toLowerCase()
            type = type.replace(' ', '_')
            type = type.replace(' ', '_')
            return this.contactosList.filter(item => {
                if(isNaN(item[type])){
                    return item[type].toLowerCase().includes(this.filter.toLowerCase())
                }
                    return item[type].toString().includes(this.filter.toString())
                })
            }
        return this.contactosList
    },
	},
	components: {
		personaDeContactoClientesCreateForm,
        personaDeContactoClientesEditForm,
	},
    methods: {
		reloadTable(){
			this.fetchContactosList()
		},
		exportTable(){
			exportService.toXLS(this.contactosList, 'Contactos cliente', true)
		},
		handleAction(e, row){
        if(e == 'create'){
            if(!this.permisos['Clientes'].crear){
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Usted no tiene permisos para crear registros en este modulo.',
                    position: 'bottom-right',
                });
                return
            }
            this.contactoClienteFormReset()
            this.personaDeContactoClienteCreateFormDialogVisible = true;
        }
        if(e == 'edit'){
            if(!this.permisos['Clientes'].editar){
                Notification.warning({
                    title: 'Atencion!',
                    message: 'Usted no tiene permisos para modificar registros en este modulo.',
                    position: 'bottom-right',
                });
            }
            this.personaDeContactoClienteEditFormDialogVisible = true;
        } 
        if(e == 'del'){
            if(!this.permisos['Clientes'].eliminar){
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
				this.$refs.personaDeContactoClienteTable.setCurrentRow(val);
				this.disabledBtn = true
				return
			}
			this.disabledBtn = false
			this.fetchContacto(val.id)
			this.$refs.personaDeContactoClienteTable.setCurrentRow(val);
		},
		
    ...mapMutations('personaDeContactoClientes', [
			'setFullContacto',
			'contactoClienteFormReset',
		]),
		
		title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
		},
    ...mapActions('personaDeContactoClientes',[
			'fetchContactosList',
			'fetchContacto',
			'createContacto',
			'editContacto',
			'delContacto',
		]),
	
	
    pushToDel(row){
        this.$confirm('Esta operacion eliminara permanentemente este registro. Continuar?', 'Atencion!', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancelar',
            type: 'warning'
        }).then(() => {
            this.delContacto()
        }).catch(() => {
            this.$message({
                type: 'warning',
                message: 'Cancelado'
            });          
        });
        
    }
    },
    created: function(){
		this.fetchContactosList()
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

