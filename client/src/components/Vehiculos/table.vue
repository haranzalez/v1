<template>
<div>
	<!--Edit dialog form -->
	<el-dialog width="50%" top="10vh" :title="'Placa: '+vehiculo.placa" :visible.sync="editFormVisible">
		<VehiculosEditForm></VehiculosEditForm>
		<span slot="footer" class="dialog-footer">
			<el-button @click="editFormVisible = false">Cancelar</el-button>
			<el-button type="primary" @click="editVehiculo">Actualizar</el-button>
		</span>
	</el-dialog>
	<!--Create dialog form -->
	<el-dialog width="50%" top="10vh" title="Nuevo vehiculo" :visible.sync="createFormVisible">
		<VehiculosCreateForm></VehiculosCreateForm>
		<span slot="footer" class="dialog-footer">
			<el-button @click="createFormVisible = false">Cancelar</el-button>
			<el-button type="primary" @click="create">Crear</el-button>
		</span>
	</el-dialog>
	<!--Table-->
	<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
		<h1>Vehiculos</h1>
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
			<div style="text-align:right;">
				<el-dropdown style="float: right; padding: 3px 0" trigger="click" @command="handleAction">  
					<el-button size="mini">
						<i class="mdi mdi-settings"></i>
					</el-button>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item :disabled="(permisos['Vehiculos'].crear)? false:true" command="create"><i class="mdi mdi-plus mr-10"></i> Nuevo</el-dropdown-item>
						<el-dropdown-item command="export"><i class="mdi mdi-file-excel mr-10"></i> Exportar</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
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
      width="70">
    </el-table-column>
    <el-table-column
	  sortable
      prop="placa"
      label="Placa"
      width="120">
    </el-table-column>
    <el-table-column
	  sortable
      prop="tipo_de_vehiculo"
      label="Tipo"
      width="120">
    </el-table-column>
	<el-table-column
	  sortable
      label="Conductor"
      width="170">
       <template slot-scope="scope">
           <el-popover
            :ref="scope.row.placa"
            placement="right"
            width="400"
            trigger="hover">
				<div v-for="(item, key) in scope.row.conductor" :key="key">
					<el-row>
						<el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10"><b>{{title(key)}}</b></el-col>
						<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">{{item}}</el-col>
					</el-row>
				</div>
            </el-popover>
           <el-select 
           v-popover="scope.row.placa" 
           v-model="selectedConductor[scope.row.placa]" 
           placeholder="Seleccione.."
           @change="assignConductorToVehicle($event, scope.row.id)">
                <el-option 
				v-if="conductoresDataReady"
                v-for="item in conductoresList"
                :key="item.nombres"
                :label="item.nombres"
                :value="item.id">
                </el-option>
            </el-select>
      </template>
    </el-table-column>

    <el-table-column
	  sortable
      label="Trailer"
      width="170">
       <template slot-scope="scope">
		  
           <el-popover
            :ref="scope.row.placa+'-trailer'"
            placement="right"
            width="400"
            trigger="hover">
            <div v-for="(item, key) in scope.row.trailer" :key="item.id">
                <el-row>
                    <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10"><b>{{title(key)}}</b></el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">{{item}}</el-col>
                </el-row>
            </div>
            </el-popover>
           <el-select 
		   
           v-popover="scope.row.placa+'-trailer'" 
           v-model="selectedTrailer[scope.row.placa]" 
           placeholder="Seleccione.."
           @change="assignTrailerToVehicle($event, scope.row.id)">
                <el-option
				v-if="trailersDataReady"
                v-for="item in trailersList"
                :key="item.placa"
                :label="item.placa"
                :value="item.id">
                </el-option>
            </el-select>
      </template>
    </el-table-column>

	<el-table-column
      label="Tipo de flota"
	  prop="tipo_de_flota"
      width="120">
    </el-table-column>

	<el-table-column
      label="Capasidad carga"
	  prop="capasidad_carga"
      width="150">
    </el-table-column>

	<el-table-column
      label="Peso"
	  prop="peso"
      width="120">
    </el-table-column>

	<el-table-column
	  fixed="right"
      prop="estado"
      label="Estado"
      width="100"
      :filters="[{ text: 'en espera', value: 'en espera' },{ text: 'disponible', value: 'disponible' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="determineEstado(scope.row.estado)"
          disable-transitions>{{scope.row.estado}}</el-tag>
      </template>
    </el-table-column>
	
    <el-table-column
      fixed="right"
      label="Acciones"
      width="120">
      <template slot-scope="scope">
		<el-button @click="pushToEdit(scope.row)" type="text" size="medium"><i class="mdi mdi-lead-pencil mr-10"></i></el-button>
		<el-button @click="pushToDel(scope.row)" type="text" size="medium"><i class="mdi mdi-delete mr-10"></i></el-button>
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
import VehiculosEditForm from '@/components/Vehiculos/editForm'
import VehiculosCreateForm from '@/components/Vehiculos/createForm'

export default {
	name: 'VehiculoTable',
	data () {
      	return {
			editFormVisible: false,
			createFormVisible: false,
			tableDdataReady: () => {
				if(this.vehiculosDataReady && this.conductoresDataReady && this.trailersDataReady){
					return this.filtered()
				}
				return []
			},
            selectTypeOfSearch: 'ID',
            filter: '',
		}
	},
	computed: {
        
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('vehiculos', [
			'vehiculo',
            'headings',
            'vehiculosList',
            'vehiculosDataReady',
            'selectedConductor',
            'selectedTrailer',
        ]),
        ...mapState('trailers', [
			'trailersList',
			'trailersDataReady',
            
        ]),
        ...mapState('conductores', [
            'conductoresList',
            'conductoresDataReady',
		]),
		
        filtered(){
			if(this.vehiculosDataReady && this.conductoresDataReady && this.trailersDataReady){
				if(this.filter !== ''){
					let type = this.selectTypeOfSearch.toLowerCase()
					type = type.replace(' ', '_')
					type = type.replace(' ', '_')
					console.log(type)
					return this.vehiculosList.filter(conductor => {
						if(isNaN(conductor[type])){
							return conductor[type].toLowerCase().includes(this.filter.toLowerCase())
						}
						return conductor[type].toString().includes(this.filter.toString())
					})
				}
				return this.vehiculosList
			}
			return []
        },

        
	},
	components: {
		VehiculosEditForm,
		VehiculosCreateForm,
	},
    methods: {
		handleAction(e, row){
            if(e == 'create'){
				this.createFormVisible = true;
			}
			if(e == 'export'){
				exportService.toXLS(this.vehiculosList, 'Vehiculos', true)
            }
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
        ...mapMutations('vehiculos', [
			'setVehicleId',
			'setFullVehiculo',
		]),
		
        title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
        },
        ...mapActions('vehiculos',[
            'fetchVehiculosList',
            'assignConductor',
			'assignTrailer',
			'editVehiculo',
			'delVehiculo',
			'createVehiculo',
        ]),
        ...mapActions('conductores',[
			'fetchConductoresList',
        ]),
        ...mapActions('trailers',[
			'fetchTrailersList',
        ]),
        
        assignConductorToVehicle(e,id){
            this.setVehicleId(id)
            this.assignConductor(e)
        },
        assignTrailerToVehicle(e,id){
            this.setVehicleId(id)
            this.assignTrailer(e)
		},
		pushToEdit(row){
			this.setFullVehiculo(row)
			this.editFormVisible = true
		},
		create(){
			this.createVehiculo()
			this.createFormVisible = false
			this.fetchVehiulosList()
		},
		pushToDel(row){
			this.$confirm('Esta operacion eliminara permanentemente este registro. Continuar?', 'Atencion!', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancelar',
                type: 'warning'
            }).then(() => {
				this.setFullVehiculo(row)
				this.delVehiculo()
				this.editFormVisible = false
				this.fetchVehiculosList()
            }).catch(() => {
                this.$message({
                    type: 'warning',
                    message: 'Cancelado'
                });          
            });
			
		}
    },
    created: function(){
        this.fetchVehiculosList(null)
		this.fetchConductoresList()
        this.fetchTrailersList()
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

