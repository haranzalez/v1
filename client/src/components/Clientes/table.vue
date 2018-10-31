<template>
<div>
	<!--Edit dialog form -->
	<el-dialog width="60%" top="5vh" :title="cliente.nombre_razon_social" :visible.sync="editFormVisible">
		<ClientesEditForm></ClientesEditForm>
		<span slot="footer" class="dialog-footer">
			<el-button @click="editFormVisible = false; paramsReset(); setDataReady(false)">Cancelar</el-button>
			<el-button type="primary" @click="editCliente">Actualizar</el-button>
		</span>
	</el-dialog>
	<!--Create dialog form -->
	<el-dialog width="60%" top="5vh" title="Nuevo cliente" :visible.sync="createFormVisible">
		<ClientesCreateForm></ClientesCreateForm>
		<span slot="footer" class="dialog-footer">
			<el-button @click="createFormVisible = false; paramsReset(); setDataReady(false)">Cancelar</el-button>
			<el-button type="primary" @click="create">Crear</el-button>
		</span>
	</el-dialog>
	<!--Table-->
	<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
		<h1>Clientes</h1>
		<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
			<div class="serachBar-ctn">
				<el-input placeholder="Buscar" v-model="filter" class="input-with-select">
					<el-select v-model="selectTypeOfSearch" slot="prepend" placeholder="Seleccione">
					<el-option v-for="col in headings" :key="col" :label="col" :value="col"></el-option>
					</el-select>
				</el-input>
			</div>
		</el-col>
		<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
			<div style="float: right; padding: 3px 0; width:30%;">
				<el-row>
					<el-button type="default" size="mini" style="margin-right:5px;"><i class="mdi mdi-reload"></i></el-button>
					<el-dropdown trigger="click" @command="handleAction">  
						<el-button size="mini">
							<i class="mdi mdi-settings"></i>
						</el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item :disabled="(permisos['Clientes'].crear)? false:true" command="create"><i class="mdi mdi-plus mr-10"></i> Nuevo cliente</el-dropdown-item>
							<el-dropdown-item :disabled="(permisos['Clientes'].crear)? false:true" command="edit"><i class="mdi mdi-lead-pencil mr-10"></i> Editar</el-dropdown-item>
							<el-dropdown-item :disabled="(permisos['Clientes'].crear)? false:true" command="del"><i class="mdi mdi-delete mr-10"></i> Eliminar</el-dropdown-item>
							<el-dropdown-item :disabled="(permisos['Clientes'].crear)? false:true" command="consolidacion"><i class="mdi mdi-briefcase mr-10"></i> Nuevo cuadre</el-dropdown-item>
							<el-dropdown-item command="export"><i class="mdi mdi-file-excel mr-10"></i> Exportar</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-row>
			</div>
		</el-col>
	<el-table
	highlight-current-row
	@current-change="handleCurrentTableChange"
    :data="filtered"
	:default-sort = "{prop: 'id', order: 'descending'}"
    style="width: 100%">
    <el-table-column
	  sortable
	  fixed
      prop="nit"
      label="NIT"
      width="110">
    </el-table-column>
    <el-table-column
	  sortable
      prop="nombre_razon_social"
      label="Razon social"
      width="220">
    </el-table-column>
	<el-table-column
	  sortable
      prop="direccion"
      label="Direccion"
      width="190">
    </el-table-column>
	<el-table-column
	  sortable
      prop="ciudad"
      label="Ciudad"
      width="120">
    </el-table-column>
   <el-table-column
	  sortable
      prop="email"
      label="Email"
      width="220">
    </el-table-column>
	<el-table-column
	  sortable
      prop="telefono"
      label="Telefono"
      width="140">
    </el-table-column>
	<el-table-column
	  sortable
      prop="celular"
      label="Celular"
      width="200">
    </el-table-column>
	<el-table-column
	  sortable
      prop="persona_de_contacto"
      label="Persona de contacto"
      width="200">
    </el-table-column>
	<el-table-column
	  sortable
      prop="direccion_envio_de_factura"
      label="Direccion envio de facturas"
      width="220">
    </el-table-column>
	<el-table-column
	  sortable
      prop="tipo_contrato"
      label="Tipo de contrato"
      width="140">
    </el-table-column>
	<el-table-column
	  sortable
      prop="created_at"
      label="Fecha creacion"
      width="300">
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
//UI
import { Notification, Message, Confirm } from 'element-ui'
//servicios
import exportService from '../../services/exportService'
//componentes
import ClientesEditForm from '@/components/Clientes/editForm'
import ClientesCreateForm from '@/components/Clientes/createForm'

export default {
	name: 'ClientesTable',
	data () {
      	return {
			currentRow: false,
			editFormVisible: false,
			createFormVisible: false,
            selectTypeOfSearch: '',
			filter: '',
		}
	},
	computed: {
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('clientes', [
			'clientesList',
			'headings',
			'dataReady',
			'cliente',
		]),
		...mapState('consolidaciones', [
			'consolidacion',
		]),
        filtered(){
			if(this.filter !== ''){
				let type = this.selectTypeOfSearch.toLowerCase()
				return this.clientesList.filter(cliente => {
					if(isNaN(cliente[type])){
						return cliente[type].toLowerCase().includes(this.filter.toLowerCase())
					}
					return cliente[type].toString().includes(this.filter.toString())
				})
			}
			return this.clientesList
		},
	},
	components: {
		ClientesEditForm,
		ClientesCreateForm,
	},
    methods: {
		setCurrent(row) {
			if(row == null){
					this.setClienteId(null)
					this.$refs.singleTable.setCurrentRow(row);
					return
			}
			this.$refs.singleTable.setCurrentRow(row);
			
		},
		handleCurrentTableChange(val) {
			this.setClienteId(val.id)
			this.setFullCliente(val)
			this.setDataReady(true)
		},
		handleAction(e){
            if(e == 'create'){
				this.paramsReset()
				this.setDataReady(false)
				this.createFormVisible = true;
			}
			if(e == 'edit'){
				if(this.dataReady){
					this.editFormVisible = true
				}else{
					Message({
						type: "warning",
						showClose: true,
						message: 'Porfavor seleccione cliente.'
					})
            	}
			}
			if(e == 'del'){
				if(this.dataReady){
					this.pushToDel()
				}else{
					Message({
						type: "warning",
						showClose: true,
						message: 'Porfavor seleccione cliente.'
					})
            	}
			}
			if(e == 'consolidacion'){
				if(this.consolidacion.cliente_id != null){
					this.$confirm('Esta a punto de crear un nuevo cuadre para el cliente: '+this.cliente.nombre_razon_social+' NIT: '+this.cliente.nit+'. Continuar?', 'Atencion!', {
						confirmButtonText: 'OK',
						cancelButtonText: 'Cancelar',
						type: 'warning'
					}).then(() => {
						this.createConsolidacion()
					}).catch(() => {
						this.$message({
							type: 'warning',
							message: 'Cancelado'
						});          
					});
				}else{
					Message({
						type: "warning",
						showClose: true,
						message: 'Porfavor seleccione cliente.'
					})
            	}
				
			}
			if(e == 'export'){
				exportService.toXLS(this.clientesList, 'Clientes', true)
			}
			if(e == 'clear'){
				this.setCurrent()
			}
        },
		back(){
			router.push('/')
		},
		...mapMutations('clientes', [
			'setFullCliente',
			'paramsReset',
			'setDataReady',
		]),
		
        ...mapActions('clientes',[
			'fetchClientesList',
			'createCliente',
			'delCliente',
			'editCliente',
		]),
		...mapMutations('consolidaciones', [
			'setClienteId',
		]),
		...mapActions('consolidaciones',[
			'createConsolidacion',
		]),
		create(){
			this.createCliente()
			this.createFormVisible = false
			this.fetchClientesList()
		},
		pushToDel(){
			this.$confirm('Esta operacion eliminara permanentemente este registro. Continuar?', 'Atencion!', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancelar',
                type: 'warning'
            }).then(() => {
				this.delCliente()
				this.editFormVisible = false
				this.fetchClientesList()
            }).catch(() => {
                this.$message({
                    type: 'warning',
                    message: 'Cancelado'
                });          
            });
			
		}
    },
    created: function(){
		this.fetchClientesList()
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

