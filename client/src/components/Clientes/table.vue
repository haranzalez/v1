<template>
<div>
	<!--report -->
	<el-dialog width="45%" :center="true" top="5vh" :visible.sync="reportDialogVisible">
		<el-form size="mini" label-position="left" ref="form" label-width="120px">
			<el-row>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="Fecha creacion">
						<el-date-picker
						v-model="datePickerValue"
						type="daterange"
						align="right"
						unlink-panels
						range-separator="A"
						start-placeholder="Fecha inicio"
						end-placeholder="Fecha final"
						>
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
					<el-form-item label="NIT">
						<el-input size="mini" width="60"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		
		<span slot="footer" class="dialog-footer animated fadeInUp">
			<el-button size="mini" @click="reportDialogVisible = false;">Cerrar</el-button>
			<el-button size="mini" type="primary">OK</el-button>
		</span>
	</el-dialog>
	<!--depositos table -->
	<el-dialog center width="50%" top="15vh" title="Depositos" :visible.sync="depositosTableVisible">
		<!--Depositos Edit dialog form -->
		<el-dialog :append-to-body="true" width="25%" top="5vh" :visible.sync="DepositosEditFormVisible">
			<DepositosEditForm></DepositosEditForm>
			<span slot="footer" class="dialog-footer">
				<el-button size="mini" @click="DepositosEditFormVisible = false">Cancelar</el-button>
				<el-button size="mini" type="primary" @click="update_deposito">Actualizar</el-button>
			</span>
		</el-dialog>
		<!--Depositos Create dialog form -->
		<el-dialog :append-to-body="true" width="25%" top="5vh" :visible.sync="DepositosCreateFormVisible">
			<DepositosCreateForm></DepositosCreateForm>
			<span slot="footer" class="dialog-footer">
				<el-button size="mini" @click="DepositosCreateFormVisible = false">Cancelar</el-button>
				<el-button size="mini" type="primary" @click="create_deposito">Crear</el-button>
			</span>
		</el-dialog>
		<DepositosTable></DepositosTable>
		<span slot="footer" class="dialog-footer animated fadeInUp">
			<el-button size="mini" @click="depositosTableVisible = false;">Cerrar</el-button>
		</span>
	</el-dialog>
	<!--cuadres table -->
	<el-dialog fullscreen width="65%" top="10vh" :visible.sync="cuadresTableVisible">
		<div slot="title">
			<p style="margin-bottom: 2px;">
				<b style="font-size:20px;">{{cliente.nombre_razon_social}} </b>
				<br>
				<span>cuadres disponibles</span>
			</p>
		</div>
		<div style="text-align: right;margin-bottom: 10px;">
		<el-button type="default" size="mini" @click="reloadTable('cuadre'+currentCuadresTab+'s')" style="margin-right:5px;"><i class="mdi mdi-reload"></i></el-button>
		<el-dropdown trigger="click" @command="handleAction">  
			<el-button size="mini">
				<i class="mdi mdi-settings"></i>
			</el-button>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item :disabled="(permisos['Clientes'].crear)? false:true" :command="'create'+currentCuadresTab"><i class="mdi mdi-plus mr-10"></i>Crear</el-dropdown-item>
				<el-dropdown-item :disabled="(permisos['Clientes'].editar)? false:true" :command="'edit'+currentCuadresTab"><i class="mdi mdi-lead-pencil mr-10"></i>Editar</el-dropdown-item>
				<el-dropdown-item :disabled="(permisos['Clientes'].eliminar)? false:true" :command="'del'+currentCuadresTab"><i class="mdi mdi-delete mr-10"></i>Eliminar</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
		</div>
		
		<cuadresTable></cuadresTable>
		
	</el-dialog>
	
	<!--edit viaje form -->
	<el-dialog fullscreen center width="43%" top="15vh" title="Cuadre ruta" :visible.sync="cuadreViajeEditFormVisible">
		<ViajeEditForm></ViajeEditForm>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" type="primary" @click="editCuadreRuta(cliente.id)">Actualizar</el-button>
			<el-button size="mini" @click="cuadreViajeEditFormVisible = false; fetchCuadresRutas()">Cerrar</el-button>
		</span>
	</el-dialog>
	<!--edit producto form -->
	<el-dialog center width="30%" top="15vh" title="Cuadre producto" :visible.sync="cuadreProductoEditFormVisible">
		<ProductoEditForm></ProductoEditForm>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" type="primary" @click="editCuadreProducto(cliente.id)">Actualizar</el-button>
			<el-button size="mini" @click="cuadreProductoEditFormVisible = false; fetchCuadresProductos()">Cerrar</el-button>
		</span>
	</el-dialog>
	<!--edit servicio form -->
	<el-dialog center width="30%" top="15vh" title="Cuadre servicio edit" :visible.sync="cuadreServicioEditFormVisible">
		<ServicioEditForm></ServicioEditForm>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" type="primary" @click="editCuadreServicio(cliente.id)">Actualizar</el-button>
			<el-button size="mini"  @click="cuadreServicioEditFormVisible = false; fetchCuadresServicios()">Cerrar</el-button>
		</span>
	</el-dialog>
	
	<!--Create viaje form -->
	<el-dialog fullscreen center width="43%" top="15vh" title="Ruta" :visible.sync="createViajeFormVisible">
		<ul>
			<li>Para seleccionar rutas disponibles, seleccione primero el <b>Tipo de vehiculo</b></li>
			<li>Para ver los valores por defecto y desea aplicarlos, seleccione <b>Ruta</b></li>
		</ul>
		<ViajeCreateForm></ViajeCreateForm>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" type="primary" @click="create_cuadre_viaje(cliente.id)">Crear cuadre</el-button>
		</span>
	</el-dialog>
	<!--Create producto form -->
	<el-dialog center width="30%" top="15vh" title="Cuadre producto" :visible.sync="createProductoFormVisible">
		<ProductoCreateForm></ProductoCreateForm>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" type="primary" @click="create_cuadre_producto(cliente.id)">Cuadrar Producto</el-button>
		</span>
	</el-dialog>
	<!--Create servicio form -->
	<el-dialog center width="30%" top="15vh" title="Cuadre servicio" :visible.sync="createServicioFormVisible">
		<ServicioCreateForm></ServicioCreateForm>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" type="primary" @click="create_cuadre_servicio(cliente.id)">Cuadrar Servicio</el-button>
			<el-button size="mini" @click="createServicioFormVisible = false; fetchCuadresServicios()">Cerrar</el-button>
		</span>
	</el-dialog>

	<!--Edit cliente dialog form -->
	<el-dialog fullscreen width="30%" top="5vh" :visible.sync="editFormVisible">
		<ClientesEditForm></ClientesEditForm>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" @click="editFormVisible = false;">Cancelar</el-button>
			<el-button size="mini" type="primary" @click="editCliente">Actualizar</el-button>
		</span>
	</el-dialog>
	<!--Create cliente dialog form -->
	<el-dialog fullscreen width="30%" top="5vh" :visible.sync="createFormVisible">
		<ClientesCreateForm></ClientesCreateForm>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" @click="createFormVisible = false; paramsReset(); setDataReady(false);">Cancelar</el-button>
			<el-button size="mini" type="primary" @click="create_client">Crear</el-button>
		</span>
	</el-dialog>

	<!--Table clientes-->
	<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
		<h1>Clientes</h1>
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
					<el-button type="default" size="mini" @click="reloadTable('clientes')" style="margin-right:5px;"><i class="mdi mdi-reload"></i></el-button>
					<el-button type="default" size="mini" @click="exportTable" style="margin-right:5px;"><i class="mdi mdi-file-excel"></i></el-button>
					<el-dropdown trigger="click" @command="handleAction">  
						<el-button size="mini">
							<i class="mdi mdi-settings"></i>
						</el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item :disabled="(permisos['Clientes'].crear)? false:true" command="create"><i class="mdi mdi-plus mr-10"></i> Crear cliente</el-dropdown-item>
							<el-dropdown-item :disabled="(permisos['Clientes'].editar)? false:true" command="edit"><i class="mdi mdi-lead-pencil mr-10"></i> Editar</el-dropdown-item>
							<el-dropdown-item :disabled="(permisos['Clientes'].eliminar)? false:true" command="del"><i class="mdi mdi-delete mr-10"></i> Eliminar</el-dropdown-item>
							<el-dropdown-item :disabled="diabled" command="verCuadres" divided><i class="mdi mdi-folder-open mr-10"></i> Cuadres</el-dropdown-item>
							<el-dropdown-item :disabled="diabled" command="crearViaje"><i class="mdi mdi-road-variant mr-10"></i> Crear Viaje</el-dropdown-item>
							<el-dropdown-item :disabled="diabled" command="depositos" divided><i class="mdi mdi-currency-usd mr-10"></i> Depositos</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-row>
			</div>
		</el-col>
	<el-table
	v-loading="loadingClientesTable"
	size="mini"
	ref="clientsTable"
	stripe
	max-height="250"
	highlight-current-row
	@current-change="handleCurrentTableChange"
    :data="filtered"
    style="width: 100%">
    <el-table-column
	  sortable
	  fixed
      prop="nit"
      label="NIT"
	  min-width="110">
    </el-table-column>
    <el-table-column
	  sortable
      prop="nombre_razon_social"
      label="Nombre razon social"
      min-width="220">
    </el-table-column>
	<el-table-column
	  sortable
      prop="direccion"
      label="Direccion"
      min-width="190">
    </el-table-column>
	<el-table-column
	  sortable
      prop="ciudad"
      label="Ciudad"
      min-width="120">
    </el-table-column>
   <el-table-column
	  sortable
      prop="email"
      label="Email"
      min-width="150">
    </el-table-column>
	<el-table-column
	  sortable
      prop="telefono"
      label="Telefono"
      min-width="120">
    </el-table-column>
	<el-table-column
	  sortable
      prop="celular"
      label="Celular"
      min-width="130">
    </el-table-column>
	<el-table-column
	  sortable
      prop="persona_de_contacto"
      label="Persona de contacto"
      min-width="200">
    </el-table-column>
	<el-table-column
	  sortable
      prop="direccion_envio_de_factura"
      label="Direccion envio de facturas"
      min-width="220">
    </el-table-column>
	<el-table-column
	  sortable
      prop="tipo_contrato"
      label="Tipo de contrato"
      min-width="160">
    </el-table-column>
	<el-table-column
	  sortable
      prop="created_at"
      label="Fecha creacion"
      min-width="300">
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
import ViajeCreateForm from '@/components/CuadresRutas/createForm'
import ViajeEditForm from '@/components/CuadresRutas/editForm'
import ProductoEditForm from '@/components/CuadreProductos/editForm'
import ServicioEditForm from '@/components/CuadreServicios/editForm'
import ProductoCreateForm from '@/components/CuadreProductos/createCuadreForm'
import ServicioCreateForm from '@/components/CuadreServicios/createCuadreForm'
import cuadreViajeTable from './cuadreRutaTable'
import cuadreProductoTable from './cuadreProductoTable'
import cuadreServicioTable from './cuadreServicioTable'
import cuadresTable from './cuadresTable'
import JsonExcel from 'json-to-excel';
import DepositosTable from './depositosTable'
import DepositosCreateForm from './depositosCreateForm'
import DepositosEditForm from './depositosEditForm'

export default {
	name: 'ClientesTable',
	data () {
      	return {
			diabled: true,
			currentRow: null,
			reportDialogVisible: false,
			editFormVisible: false,
			createFormVisible: false,
			depositosTableVisible: false,
			createViajeFormVisible: false,
			createProductoFormVisible: false,
			createServicioFormVisible: false,
			cuadreViajeTableVisible: false,
			cuadreProductoTableVisible: false,
			cuadreServicioTableVisible: false,
			cuadreViajeEditFormVisible: false,
			cuadreProductoEditFormVisible: false,
			cuadreServicioEditFormVisible: false,
			cuadresTableVisible: false,
            selectTypeOfSearch: '',
			filter: '',

			
		}
	},
	computed: {
//=============================//
//========== Imports Variables =========//
//=============================//
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('clientes', [
			'clientesList',
			'headings',
			'dataReady',
			'cliente',
			'loadingClientesTable',
			'currentCuadresTab',
			'dataready',
			'depositosCreateFormVisible',
			'depositosEditFormVisible'
		]),
//=============================//
//========== Local Variables =========//
//=============================//
		DepositosCreateFormVisible: {
			get(){
				return this.depositosCreateFormVisible
			},
			set(value){
				this.setDepositosCreateFormVisible(value)
			}
		},
		DepositosEditFormVisible: {
			get(){
				return this.depositosEditFormVisible
			},
			set(value){
				this.setDepositosEditFormVisible(value)
			}
		},
		datePickerValue: {
			get(value){
				return ''
			},
			set(value){
				console.log(value)
			}
		},
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
		ViajeCreateForm,
		ViajeEditForm,
		ProductoEditForm,
		ServicioEditForm,
		ProductoCreateForm,
		ServicioCreateForm,
		cuadreViajeTable,
		cuadreProductoTable,
		cuadreServicioTable,
		cuadresTable,
		JsonExcel,
		DepositosTable,
		DepositosCreateForm,
		DepositosEditForm,
	},
    methods: {
//=============================//
//========== Store Functions =========//
//=============================//
		...mapMutations('clientes', [
			'setFullCliente',
			'paramsReset',
			'setDataReady',
			'setDepositosCreateFormVisible',
			'setDepositosEditFormVisible',
		]),
		
        ...mapActions('clientes',[
			'fetchCuadresRutas',
			'fetchCuadresProductos',
			'fetchCuadresServicios',
			'fetchClientesList',
			'createCliente',
			'delCliente',
			'editCliente',
			'fetchCliente',
			'create_consolidacion',
			'create_deposito',
			'update_deposito'
		]),
//=============================//
//========== Components Functions =========//
//=============================//

//ACTIONS====================================
		...mapActions('cuadreViajes',[
			'createCuadreRuta',
			'editCuadreRuta',
			'delCuadreRuta',
		]),
		...mapActions('cuadreProductos',[
			'createCuadreProducto',
			'editCuadreProducto',
			'delCuadreProducto',
		]),
		...mapActions('cuadreServicios',[
			'createCuadreServicio',
			'editCuadreServicio',
			'delCuadreServicio'
		]),
//MUTATIONS===================================
		...mapMutations('cuadreViajes', [
			'resetSelections',
			'resetCuadreRuta',
		]),
		...mapMutations('cuadreProductos', [
			'resetCuadreProducto',
		]),
		...mapMutations('cuadreServicios', [
			'resetCuadreServicio',
		]),
		
		...mapMutations('rutas',[
			'rutaReset',
			'setFilteredByTipoVehiculoRutasList',
		]),
		...mapMutations('productos',[
			'productoReset',
		]),
		...mapMutations('servicios',[
			'servicioReset',
		]),
//=============================//
//======= UI Functions =====//
//=============================//
		
		clearForm(form){
			if('createRuta'){
				this.resetSelections()
				this.resetCuadreRuta()
				this.rutaReset()
				this.setFilteredByTipoVehiculoRutasList(null)
			}
			if('createProducto'){
				this.resetSelections()
				this.productoReset()
				this.resetCuadreProducto()
			}
			if('createServicio'){
				this.resetSelections()
				this.servicioReset()
				this.resetCuadreServicio()
			}
		},
		exportTable(){
			this.reportDialogVisible = true
			//exportService.toXLS(this.clientesList, 'Clientes')
		},
		reloadTable(table){
			this.diabled = true
			if(table == 'clientes'){
				this.fetchClientesList() 
				this.diabled = true
			}
			if(table == 'cuadreRutas'){
				this.fetchCuadresRutas()
				this.diabled = true
			}
			if(table == 'cuadreProductos'){
				this.fetchCuadresProductos()
				this.diabled = true
			}
			if(table == 'cuadreServicios'){
				this.fetchCuadresServicios()
				this.diabled = true
			}
			this.diabled = true
		},
		handleCurrentTableChange(val) {
			if(val == null){
				this.$refs.clientsTable.setCurrentRow(val);
				this.setDataReady(false)
				this.diabled = false
				return
			}
			this.fetchCliente(val.id)
			this.setDataReady(true)
			this.diabled = false
			this.$refs.clientsTable.setCurrentRow(val);
			
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
			if(e == 'createRuta'){
				this.createViajeFormVisible = true
				this.clearForm('createRuta')
			}
			if(e == 'createServicio'){
				this.createServicioFormVisible = true
				this.clearForm('createServicio')
			}
			if(e == 'createProducto'){
				this.createProductoFormVisible = true
				this.clearForm('createProducto')
			}
			if(e == 'editRuta'){
				this.cuadreViajeEditFormVisible = true
			}
			if(e == 'editServicio'){
				this.cuadreServicioEditFormVisible = true
			}
			if(e == 'editProducto'){
				this.cuadreProductoEditFormVisible = true
			}
			if(e == 'delRuta'){
				this.pushToDelCuadre('ruta')
			}
			if(e == 'delProducto'){
				this.pushToDelCuadre('producto')
			}
			if(e == 'delServicio'){
				this.pushToDelCuadre('servicio')
			}
			if(e == 'verCuadres'){
				this.cuadresTableVisible = true
			}
			if(e == 'crearViaje'){
				this.create_consolidacion()
			}
			if(e == 'depositos'){
				this.depositosTableVisible = true
			}
			
		},
//=============================//
//========== CRUD =========//
//=============================//
		
		create_client(){
			this.createCliente()
			this.createFormVisible = false
		},
		create_cuadre_viaje(id){
			if(this.createCuadreRuta(id)){
				this.createViajeFormVisible = false
				Notification({
					type: 'success',
					showClose: true,
					message: 'Cuadre ruta creado.'
				})
			}
		},
		create_cuadre_producto(id){
			if(this.createCuadreProducto(id)){
				this.createProductoFormVisible = false
				Notification({
					showClose: true,
					message: 'Cuadre producto creado.'
            	})
			}
		},
		create_cuadre_servicio(id){
			if(this.createCuadreServicio(id)){
				this.createServicioFormVisible = false
				Notification({
					showClose: true,
					message: 'Cuadre servicio creado.'
            	})
			}
		},
		pushToDel(){
			this.$confirm('Esta operacion eliminara permanentemente este registro. Continuar?', 'Atencion!', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancelar',
                type: 'warning'
            }).then(() => {
				this.delCliente()
				this.editFormVisible = false
				this.currentRow=false; 
				this.$refs.clientsTable.setCurrentRow(null)
				this.fetchClientesList()
            }).catch(() => {
				this.currentRow=false; 
				this.$refs.clientsTable.setCurrentRow(null)
                this.$message({
                    type: 'warning',
                    message: 'Cancelado'
                });          
            });
			
		},
		pushToDelCuadre(cuadre){
			this.$confirm('Esta operacion eliminara permanentemente este registro. Continuar?', 'Atencion!', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancelar',
                type: 'warning'
            }).then(() => {
				if(cuadre == 'ruta'){
					if(this.delCuadreRuta()){
						
						Message({
							type: 'success',
							showClose: true,
							message: 'Cuadre ruta eliminado exitosamente'
						})
						this.fetchCuadresRutas()
					}
				}
				if(cuadre == 'producto'){
					if(this.delCuadreProducto()){
						Message({
							type: 'success',
							showClose: true,
							message: 'Cuadre producto eliminado exitosamente'
						})
						this.fetchCuadresProductos()
					}
				}
				if(cuadre == 'servicio'){
					if(this.delCuadreServicio()){
						
						Message({
							type: 'success',
							showClose: true,
							message: 'Cuadre servicio eliminado exitosamente'
						})
						this.fetchCuadresServicios()
					}
				}
				
            }).catch(() => {
                this.$message({
                    type: 'warning',
                    message: 'Cancelado'
                });          
            });
			
		},
		
		back(){
			router.push('/')
		},
		
		
	},
//=============================//
//========== UI State Functions =========//
//=============================//
	
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

.dialog-footer{
	text-align: right !important;
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

