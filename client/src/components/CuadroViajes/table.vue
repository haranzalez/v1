<template>
<div>
	<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
		<h1>Cuadro de viajes</h1>
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
				<el-button class="animated fadeInRight" @click="">Crear</el-button>
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
            :ref="scope.row.id"
            placement="right"
            width="400"
            trigger="click">
            <div v-for="(item, key) in scope.row.vehiculo[0]" :key="item.id">
                <el-row v-if="key !== 'created_at' || 
				key !== 'updated_at' || 
				key !== 'pivot'">
                    <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10"><b>{{title(key)}}</b></el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">{{item}}</el-col>
                </el-row>
            </div>
            </el-popover>
           <el-select 
           v-popover="scope.row.placa" 
           v-model="selectedVehiculo[scope.row.placa]" 
           placeholder="Seleccione.."
           @change="">
                <el-option
                v-for="item in vehiculosList"
                :key="item.nombres"
                :label="item.nombres"
                :value="item.id">
                </el-option>
            </el-select>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="Acciones"
      width="120">
      <template slot-scope="scope">
        <el-button @click="pushToEditVehicle(scope.row)" type="text" size="small">Detalles/editar</el-button>
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

export default {
	name: 'CuadreViajesTable',
	data () {
      	return {
            selectTypeOfSearch: 'ID',
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
		]),
		...mapState('vehiculos', [
			'vehiculosList',
		]),
       
        filtered(){
			if(this.dataReady){
				if(this.filter !== ''){
					let type = this.selectTypeOfSearch.toLowerCase()
					type = type.replace(' ', '_')
					type = type.replace(' ', '_')
					console.log(type)
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
	},
    methods: {
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
        ...mapActions('cuadreViajes',[
			'fetchCuadresList',
		]),
		...mapActions('vehiculos',[
			'fetchVehiculosList',
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

