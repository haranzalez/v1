<template>
<div>
	<!--Edit dialog form -->
	<el-dialog width="60%" top="15vh" :visible.sync="editFormVisible">
		<CuadroViajesEditForm></CuadroViajesEditForm>
		<span slot="footer" class="dialog-footer">
			<el-button @click="editFormVisible = false">Cancelar</el-button>
			<el-button type="primary" @click="editCuadre">Actualizar</el-button>
		</span>
	</el-dialog>
	<!--Create dialog form -->
	<el-dialog width="60%" top="10vh" title="Nuevo cuadre" :visible.sync="createFormVisible">
		<CuadroViajesCreateForm></CuadroViajesCreateForm>
		<span slot="footer" class="dialog-footer">
			<el-button @click="createFormVisible = false">Cancelar</el-button>
			<el-button type="primary" @click="create">Crear</el-button>
		</span>
	</el-dialog>
	<!--Table-->
	<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
		<h1>Cuadres de rutas</h1>
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
						<el-button size="mini">
							<i class="mdi mdi-settings"></i>
						</el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item :disabled="(permisos['Clientes'].crear)? false:true" command="crear"><i class="mdi mdi-plus mr-10"></i> Crear cuadre</el-dropdown-item>
							<el-dropdown-item :disabled="(permisos['Clientes'].crear)? false:true" command="del"><i class="mdi mdi-delete mr-10"></i> Eliminar</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-row>
			</div>
		</el-col>
	<el-table
	ref="cuadreViajesTable"
	highlight-current-row
	@current-change="handleCurrentTableChange"
	v-loading.body="loading"
	size="mini"
    :data="filtered"
	:default-sort = "{prop: 'id', order: 'descending'}"
    style="width: 100%">
    <el-table-column
	  align="center"
	  sortable
      fixed
      prop="id"
      label="ID"
      width="60">
    </el-table-column>
    <el-table-column
	  sortable
	  fixed
      prop="nombre_cliente"
      label="Cliente"
      width="120">
    </el-table-column>
	<el-table-column
	  sortable
      label="Vehiculo"
      width="170">
       <template slot-scope="scope">
           <el-popover
            :ref="scope.row.vehiculo[0].placa"
            placement="right"
            width="400"
            trigger="hover">
            <div v-for="(item, key) in scope.row.vehiculo[0]" :key="item.id">
                <el-row>
                    <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10"><b>{{title(key)}}</b></el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">{{item}}</el-col>
                </el-row>
            </div>
            </el-popover>
           <el-select
		   size="mini" 
		   @change="assign_vehicle({e:$event, cuadre:scope.row.id})"
           v-popover="scope.row.vehiculo[0].placa" 
           v-model="selectedVehiculo[scope.row.vehiculo[0].placa]" 
           placeholder="Seleccione..."
           >
                <el-option
                v-for="item in vehiculosList"
                :key="item.placa" 
                :label="item.placa"
                :value="item.id">
                </el-option>
            </el-select>
      </template>
    </el-table-column>
	<el-table-column
	  sortable
      label="Ruta"
      width="210">
       <template slot-scope="scope">
           <el-popover
		    size="mini"
            :ref="scope.row.ruta[0].id"
            placement="right"
            width="300"
            trigger="hover">
                <el-row v-for="(item, key) in filterProps(scope.row.ruta[0])" :key="item.id">
                    <el-col class="pop-over-rows" :xs="12" :sm="12" :md="12" :lg="12" :xl="12"><b>{{title(key)}}</b></el-col>
                    <el-col class="pop-over-rows" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">{{item}}</el-col>
                </el-row>
            </el-popover>
           <el-select 
		   @change="assign_ruta({ruta_id:$event, cuadre_id:scope.row.id})"
		   size="mini"
           v-popover="scope.row.ruta[0].id" 
           v-model="selectedRuta[scope.row.ruta[0].id]" 
           placeholder="Seleccione..."
           >
                <el-option
                v-for="item in rutasList"
                :key="item.id" 
                :label="item.nombre_ruta"
                :value="item.id">
                </el-option>
            </el-select>
      </template>
    </el-table-column>
	<el-table-column
	  align="center"
	  sortable
      label="Flete"
      width="120">
	   <template slot-scope="scope">
         {{ scope.row.ruta[0]['valor_flete'] }}
      </template>
    </el-table-column>
	<el-table-column
	  align="center"
	  sortable
      prop="flete"
      label="Cuadre"
      width="120">
    </el-table-column>
	
	<el-table-column
	  align="center"
	  sortable
      prop="ajuste"
      label="Ajuste"
      width="120">
    </el-table-column>
	<el-table-column
	  align="center"
	  sortable
      prop="anticipo"
      label="Anticipo"
      width="120">
    </el-table-column>
	<el-table-column
	  align="center"
	  sortable
      prop="debe"
      label="Debe"
      width="120">
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
import CuadroViajesEditForm from '@/components/CuadresRutas/editForm'
import CuadroViajesCreateForm from '@/components/CuadresRutas/createForm'

export default {
	name: 'CuadreViajesTable',
	data () {
      	return {
			editFormVisible: false,
			createFormVisible: false,
            selectTypeOfSearch: 'id',
            filter: '',
		}
	},
	computed: {
		
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('cuadreViajes', [
			'cuadresList',
			'headings',
			'dataReady',
			'selectedVehiculo',
			'selectedRuta',
			'loading',
		]),
		...mapState('vehiculos', [
			'vehiculosList',
			
		]),
		...mapState('rutas', [
			'rutasList',
		]),
        filtered(){
			if(this.dataReady){
				if(this.filter !== ''){
					let type = this.selectTypeOfSearch.toLowerCase()
					type = type.replace(' ', '_')
					type = type.replace(' ', '_')
					return this.cuadresList.filter(cuadre => {
						if(isNaN(cuadre[type])){
							return cuadre[type].toLowerCase().includes(this.filter.toLowerCase())
						}
						return cuadre[type].toString().includes(this.filter.toString())
					})
				}
				return this.cuadresList
			}
        },
	},
	components: {
		CuadroViajesEditForm,
		CuadroViajesCreateForm,
	},
    methods: {
		exportTable(){
			exportService.toXLS(this.cuadresList, 'Cuadro de viaje', true)
		},
		reloadTable(){
			this.fetchCuadresList()
		},
		filterProps(val){
			for(let prop in val){
				if(prop == 'created_at' || prop == 'updated_at'){
					delete val[prop]
				}
			}
			return val
		},
		handleAction(e, row){
            if(e == 'create'){
				this.createFormVisible = true;
			}
			if(e == 'detalles'){
				this.editFormVisible = true
            }
		},
		handleCurrentTableChange(val) {
			if(val == null){
				this.$refs.cuadreViajesTable.setCurrentRow(val);
				return
			}
			this.setFullCuadre(val)
			
			this.$refs.cuadreViajesTable.setCurrentRow(val);
		},
	
		create(){
			this.createCuadre()
			this.createFormVisible = false
			this.fetchCuadresList()
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
		pushTo(resource){
			router.push('/'+resource)
		},
		determineEstado(row){
			
			if(row == 'ocupado'){
				return 'danger'
			}
			if(row == 'disponible'){
				return 'success'
			}
			return 'warning'
		},
		filterTag(value, row) {
        	return row.estado === value;
      	},
        ...mapMutations('cuadreViajes', [
			
		]),
		
        title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
		},
		...mapMutations('cuadreViajes', [
			'setFullCuadre',
		]),
        ...mapActions('cuadreViajes',[
			'fetchCuadresList',
			'editCuadre',
			'delCuadre',
			'createCuadre',
			'assign_vehicle',
			'assign_ruta',
		]),
		...mapActions('vehiculos',[
			'fetchVehiculosList',
		]),
		...mapActions('rutas',[
			'fetchRutasList',
        ]),
        
        pushToCreateVehicle({state,commit}){
            router.push('/vehiculos-crear')
		},
		pushToEditVehicle(row){
			this.setFullVehicle(row)
			router.push('/vehiculos-editar')
		},
		
        assignConductorToVehicle(e,id){
            this.setVehicleId(id)
            this.assignConductor(e)
        },
        assignTrailerToVehicle(e,id){
            this.setVehicleId(id)
            this.assignTrailer(e)
        },
    },
    created: function(){
		this.fetchCuadresList()
		this.fetchVehiculosList('cuadre_viajes')
		this.fetchRutasList()
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
.pop-over-rows{
	text-align: right;
	border-bottom:1px solid #eee;
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

