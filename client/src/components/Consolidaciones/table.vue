<template>
<div>
	<!-- select producto dialog -->
	<el-dialog
		title="Productos"
		:visible.sync="selectProductoDialogVisible"
		width="30%"
	>
		<el-select @change="handleProductChange" :value="selectedEditProducto" placeholder="Select">
			<el-option
			v-for="item in cuadreProductosList"
			:key="item.id"
			:label="item.producto"
			:value="item.id">
			</el-option>
		</el-select>
	<span slot="footer" class="dialog-footer">
		<el-button size="mini" @click="selectProductoDialogVisible = false">Cerrar</el-button>
	</span>
	</el-dialog>
	<!-- select servicio dialog -->
	<el-dialog
		title="Servicios"
		:visible.sync="selectServicioDialogVisible"
		width="30%"
	>
		<el-select @change="handleServicioChange" :value="selectedEditServicio" placeholder="Select">
			<el-option
			v-for="item in cuadreServiciosList"
			:key="item.id"
			:label="item.nombre_servicio"
			:value="item.id">
			</el-option>
		</el-select>
	<span slot="footer" class="dialog-footer">
		<el-button size="mini" @click="selectServicioDialogVisible = false">Cerrar</el-button>
	</span>
	</el-dialog>
	<!-- select ruta dialog -->
	<el-dialog
		title="Rutas"
		:visible.sync="selectRutaDialogVisible"
		width="30%"
	>
		<el-select @change="handleRutaChange" :value="selectedEditRuta" placeholder="Select">
			<el-option
			v-for="item in cuadreRutasList"
			:key="item.id"
			:label="item.ruta"
			:value="item.id">
			</el-option>
		</el-select>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" @click="selectRutaDialogVisible = false; this.consolidacionesClearParams()">Cerrar</el-button>
		</span>
	</el-dialog>
	<!--Edit dialog form -->
	<el-dialog width="60%" top="15vh" :visible.sync="editFormVisible">
		
		<span slot="footer" class="dialog-footer">
			<el-button @click="editFormVisible = false">Cancelar</el-button>
			<el-button type="primary" @click="">Actualizar</el-button>
		</span>
	</el-dialog>
	<!--Create dialog form -->
	<el-dialog width="60%" top="10vh" title="Nuevo cuadre" :visible.sync="createFormVisible">
		
		<span slot="footer" class="dialog-footer">
			<el-button @click="createFormVisible = false">Cancelar</el-button>
			<el-button type="primary" @click="">Crear</el-button>
		</span>
	</el-dialog>
	<!--Table-->
	<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
		<h1>Cuadro de viajes</h1>
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
			<div style="text-align:right;">
				<el-dropdown style="float: right; padding: 3px 0" trigger="click" @command="handleAction">  
					<el-button size="mini">
						<i class="mdi mdi-settings"></i>
					</el-button>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item  command="create"><i class="mdi mdi-plus mr-10"></i> Nuevo</el-dropdown-item>
						<el-dropdown-item command="export"><i class="mdi mdi-file-excel mr-10"></i> Exportar</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</el-col>
	<el-table
	v-loading="loadingConsolidacionesTable"
	size="mini"
	ref="consolidacionesTable"
	stripe
	min-height="300"
	highlight-current-row
	@current-change="handleCurrentTableChange"
    :data="filtered"
	:default-sort = "{prop: 'id', order: 'descending'}"
    style="width: 100%">
    <el-table-column
	  align="center"
	  sortable
      fixed
      prop="id"
      label="ID"
      width="70">
    </el-table-column>
    <el-table-column
	  align="center"
	  sortable
      prop="nombre_razon_social"
      label="Cliente"
      width="120">
    </el-table-column>
	<el-table-column
	  sortable
	  align="center"
      label="Ruta"
      width="220">
       <template slot-scope="scope">
           <el-popover
		   	v-if="scope.row.cuadre_ruta != null"
            :ref="scope.row.id+'-ruta'"
            placement="right"
            width="400"
            trigger="hover">
            <div  v-for="(item, key) in scope.row.cuadre_ruta" :key="item.id">
                <el-row>
					<el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10"><b>{{title(key)}}</b></el-col>
					<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">{{ (key != 'created_at' || key != 'updated_at' || key != 'pivot' || key != 'ruta') ? item : '' }}</el-col>
                </el-row>
            </div>
           </el-popover>
           <el-button size="mini" :type="(scope.row.ruta !== null)?'text':'default'" @click="setRutaSelect(scope.row.cliente_id, scope.row.ruta)" v-popover="scope.row.id+'-ruta'">{{(scope.row.ruta !== null)?scope.row.ruta.nombre:'Seleccionar'}}</el-button>
      </template>
    </el-table-column>
	<el-table-column
	  sortable
	  align="center"
      label="Producto"
      width="170">
       <template slot-scope="scope">
           <el-popover
		    v-if="scope.row.cuadre_producto != null"
            :ref="scope.row.id+'-producto'"
            placement="right"
            width="400"
            trigger="hover">
            <div  v-for="(item, key) in scope.row.cuadre_producto" :key="item.id">
                <el-row>
					<el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10"><b>{{title(key)}}</b></el-col>
					<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">{{ (key != 'created_at' || key != 'updated_at' || key != 'pivot' || key != 'producto') ? item : '' }}</el-col>
                </el-row>
            </div>
           </el-popover>
          <el-button size="mini" :type="(scope.row.producto !== null)?'text':'default'" @click="setProductoSelect(scope.row, scope.row.producto)" v-popover="scope.row.id+'-producto'">{{(scope.row.producto !== null)?scope.row.producto.nombre:'Seleccionar'}}</el-button>
      </template>
    </el-table-column>
	<el-table-column
	  align="center"
	  sortable
      label="Servicio"
      width="170">
       <template slot-scope="scope">
           <el-popover
		    v-if="scope.row.cuadre_servicio != null"
            :ref="scope.row.id+'-servicio'"
            placement="right"
            width="400"
            trigger="hover">
            <div v-for="(item, key) in scope.row.cuadre_servicio" :key="item.id">
                <el-row>
					<el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10"><b>{{title(key)}}</b></el-col>
					<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">{{ (key != 'created_at' || key != 'updated_at' || key != 'pivot' || key != 'producto') ? item : '' }}</el-col>
                </el-row>
            </div>
           </el-popover>

		   <el-button size="mini" :type="(scope.row.servicio !== null)?'text':'default'" @click="setServicioSelect(scope.row.cliente_id, scope.row.servicio)" v-popover="scope.row.id+'-servicio'">{{(scope.row.servicio !== null)?scope.row.servicio.nombre:'Seleccionar'}}</el-button>
      </template>
    </el-table-column>
	
	<el-table-column
	  sortable
	  align="center"
      prop="flete"
      label="Flete"
      width="120">
	  <template slot-scope="scope">
		  {{(scope.row.flete == null)?'0':scope.row.flete }}
	  </template>
    </el-table-column>
	<el-table-column
	  sortable
	  align="center"
      prop="anticipo"
      label="Anticipo"
      width="120">
	   <template slot-scope="scope">
		  {{(scope.row.anticipo == null)?'0':scope.row.anticipo }}
	  </template>
    </el-table-column>
	<el-table-column
	  sortable
	  align="center"
      prop="descuento"
      label="Descuento"
      width="120">
	   <template slot-scope="scope">
		  {{(scope.row.descuento == null)?'0':scope.row.descuento }}
	  </template>
    </el-table-column>
	<el-table-column
	  sortable
	  align="center"
      prop="ganancia"
      label="Ganancia"
      width="120">
	   <template slot-scope="scope">
		  {{(scope.row.ganancia == null)?'0':scope.row.ganancia }}
	  </template>
    </el-table-column>
	<el-table-column
	  sortable
	  align="center"
      prop="debe"
      label="Debe"
      width="120">
	   <template slot-scope="scope">
		  {{(scope.row.debe == null)?'0':scope.row.debe }}
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
//componentes


export default {
	name: 'CuadreViajesTable',
	data () {
      	return {
			editFormVisible: false,
			createFormVisible: false,
			selectTypeOfSearch: 'id',
			selectedEditProducto: '',
			selectedEditServicio: '',
			selectedEditRuta: '',
			selectProductoDialogVisible: false,
			selectServicioDialogVisible: false,
			selectRutaDialogVisible: false,
            filter: '',
		}
	},
	computed: {
        ...mapState('authentication', [
			'permisos',
		]),
		...mapState('consolidaciones', [
			'consolidacionesList',
			'selectedRuta',
			'selectedProducto',
			'selectedServicio',
			'headings',
			'loadingConsolidacionesTable',
			'dataReady',
			
		]),
		...mapState('clientes', [
			'cuadreProductosList',
			'cuadreRutasList',
			'cuadreServiciosList',
			'loadingConsolidacionTableBtnsPkg',
		]),

        filtered(){
			if(this.dataReady){
				if(this.filter !== ''){
					let type = this.selectTypeOfSearch.toLowerCase()
					console.log(type)
					type = type.replace(' ', '_')
					type = type.replace(' ', '_')
					
					return this.consolidacionesList.filter(cuadre => {
						if(isNaN(cuadre[type])){
							return cuadre[type].toLowerCase().includes(this.filter.toLowerCase())
						}
						return cuadre[type].toString().includes(this.filter.toString())
					})
				}
				return this.consolidacionesList
			}
        },
	},
	components: {
	},
    methods: {
		handleProductChange(val){
			this.setProducto(val)
			this.selectedEditProducto = val
		},
		handleServicioChange(val){
			console.log(val)
			this.setServicio(val)
			this.selectedEditServicio = val
		},
		handleRutaChange(val){
			console.log(val)
			this.setRuta(val)
			this.selectedEditRuta = val
		},
		setProductoSelect(row, producto){
			this.fetchCuadresProductos(row.cliente_id)
			if(producto){
				this.selectedEditProducto = producto.id
			}else{
				this.selectedEditProducto = ''
			}
			this.selectProductoDialogVisible = true
		},
		setServicioSelect(cliente, servicio){
			this.fetchCuadresServicios(cliente)
			if(servicio){
				this.selectedEditServicio = servicio.id
			}else{
				this.selectedEditServicio = ''
			}
			
			this.selectServicioDialogVisible = true
		},
		setRutaSelect(cliente, ruta){
			this.fetchCuadresRutas(cliente)
			if(ruta){
				this.selectedEditRuta = ruta.id
			}else{
				this.selectedEditRuta = ''
			}
			
			this.selectRutaDialogVisible = true
		},
		handleCurrentTableChange(val) {
			if(val == null){
				this.$refs.consolidacionesTable.setCurrentRow(val);
				return
			}
			this.fetchConsolidacion(val.id)
			this.$refs.consolidacionesTable.setCurrentRow(val);
		},
		handleAction(e, row){
            if(e == 'create'){
				this.createFormVisible = true;
			}
			if(e == 'export'){
				exportService.toXLS(this.cuadresList, 'Cuadro_de_viajes', true)
            }
		},
		
		pushToDel(row){
			this.$confirm('Esta operacion eliminara permanentemente este registro. Continuar?', 'Atencion!', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancelar',
                type: 'warning'
            }).then(() => {
				this.setFullCuadre(row)
				this.delCuadre()
				this.editFormVisible = false
				this.fetchCuadresList()
            }).catch(() => {
                this.$message({
                    type: 'warning',
                    message: 'Cancelado'
                });          
            });
			
		},
        title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
		},
		...mapMutations('consolidaciones', [
			'consolidacionesClearParams',
		]),
		...mapActions('consolidaciones',[
			'fetchConsolidacionesList',
			'fetchConsolidacion',
			'setRuta',
			'setProducto',
			'setServicio',
		]),
		...mapActions('clientes',[
			'fetchCuadresProductos',
			'fetchCuadresServicios',
			'fetchCuadresRutas',
			'fetchClienteConsolidacion',
		]),
		
        

		
      
    },
    created: function(){
		this.fetchConsolidacionesList()
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

