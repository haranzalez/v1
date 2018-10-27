<template>
<div>
	<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
		<h1>Trailers</h1>
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
				<el-button type="text" @click="back">Volver</el-button>
				<el-button :disabled="(permisos['Usuarios'].crear)? false:true" @click="pushToCreateTrailer">Crear</el-button>
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
      prop="placa"
      label="Placa"
      width="120">
    </el-table-column>
    <el-table-column
	  sortable
      prop="tipo_de_vehiculo"
      label="Tipo de vehiculo"
      width="150">
    </el-table-column>
	<el-table-column
	  sortable
      prop="tipo_de_configuracion"
      label="Tipo de configuracion"
      width="190">
    </el-table-column>
	<el-table-column
	  sortable
      prop="tenedor"
      label="Tenedor"
      width="120">
    </el-table-column>
	<el-table-column
	  sortable
      prop="modelo"
      label="Modelo"
      width="120">
    </el-table-column>
    <el-table-column
	  sortable
      prop="propietario"
      label="Propietario"
      width="170">
    </el-table-column>
    <el-table-column
	  sortable
      prop="tipo_de_flota"
      label="Tipo de flota"
      width="150">
    </el-table-column>
     <el-table-column
	  sortable
      prop="poseedor"
      label="Poseedor"
      width="120">
    </el-table-column>
     <el-table-column
	  sortable
      prop="color"
      label="Color"
      width="150">
    </el-table-column>
     <el-table-column
	  sortable
      prop="marca_trailer"
      label="Marca"
      width="150">
    </el-table-column>
     <el-table-column
	  sortable
      prop="peso"
      label="Peso"
      width="150">
    </el-table-column>
    <el-table-column
	  sortable
      prop="tipo_carroceria"
      label="Tipo carroceria"
      width="150">
    </el-table-column>
    <el-table-column
	  sortable
      prop="estado"
      label="Estado"
      width="150">
    </el-table-column>
    <el-table-column
	  sortable
      label="Radica RNDC"
      width="150"
	  align="center">
	  <template slot-scope="scope">
		  <el-tag
          :type="(scope.row.radica_rndc)?'success':'danger'"
          disable-transitions>{{(scope.row.radica_rndc)?'Si':'No'}}</el-tag>
	  </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="Acciones"
      width="120">
      <template slot-scope="scope">
        <el-button @click="pushToEdit(scope.row)" type="text" size="small">Editar</el-button>
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
	name: 'TrailerTable',
	data () {
      	return {
            selectTypeOfSearch: 'Placa',
            filter: '',
		}
	},
	computed: {
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('trailers', [
			'trailersList',
			'headings',
			'trailersDataReady',
		]),
        filtered(){
			if(this.trailersDataReady){
				if(this.filter !== ''){
					let type = this.selectTypeOfSearch.toLowerCase()
					return this.trailersList.filter(conductor => {
						if(isNaN(conductor[type])){
							return conductor[type].toLowerCase().includes(this.filter.toLowerCase())
						}
						return conductor[type].toString().includes(this.filter.toString())
					})
				}
				return this.trailersList
			}
		},
	},
	components: {
	},
    methods: {
		back(){
			router.push('/Vehiculos')
		},
		...mapMutations('trailers', [
			'setFullTrailer',
		]),
        ...mapActions('trailers',[
			'fetchTrailersList',
		]),
         pushToCreateTrailer(){
            router.push('/trailers-crear')
		},
		pushToEdit(row){
			this.setFullTrailer(row)
			router.push('/trailers-editar')
		},
    },
    created: function(){
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

