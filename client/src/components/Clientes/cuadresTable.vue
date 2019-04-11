<template>
<div>
	<el-tabs v-model="currentTab" type="border-card">
		<el-tab-pane value="ruta" label="Rutas">
			<Rutas></Rutas>
		</el-tab-pane>
		<el-tab-pane label="Productos">
			<Productos></productos>
		</el-tab-pane>
		<el-tab-pane label="Servicios">
			<Servicios></Servicios>
		</el-tab-pane>
	</el-tabs>
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
import Rutas from './cuadreRutaTable'
import Productos from './cuadreProductoTable'
import Servicios from './cuadreServicioTable'



export default {
	name: 'ClientesCuadreRutaTable',
	data () {
      	return {
			  currentTab: 0,
              filter: '',
              createViajeEditFormVisible: false,
		}
	},
	computed: {
	
        ...mapState('clientes', [
			'cuadresActions',
			'cruadreRutasList',
			'loadingCuadreRutaTable',
            
        ]),
        ...mapState('cuadreViajes', [
			'cuadre',
			'loading',
		]),
        filtered(){
			if(this.filter !== ''){
				let type = this.selectTypeOfSearch.toLowerCase()
				return this.cruadreRutasList.filter(cuadre => {
					if(isNaN(cuadre[type])){
						return cuadre[type].toLowerCase().includes(this.filter.toLowerCase())
					}
					return cuadre[type].toString().includes(this.filter.toString())
				})
			}
			return this.cruadreRutasList
		},

	},
	watch : {
		'currentTab':function(val) { 
			if(val == 0){
				this.setCurrentCuadresTab('Ruta')
			}
			if(val == 1){
				this.setCurrentCuadresTab('Producto')
			}
			if(val == 2){
				this.setCurrentCuadresTab('Servicio')
			}
		},
	},
	components: {
		Rutas,
		Productos,
		Servicios,
	},
    methods: {
        handleCurrentTableChange(val) {
			if(val == null){
				this.$refs.clientsCuadreRutaTable.setCurrentRow(val);
				return
			}
            this.fetchCuadre({id: val.id})
			this.$refs.clientsCuadreRutaTable.setCurrentRow(val);

		},
		...mapMutations('clientes', [
            'setCurrentCuadresTab',
        ]),
        ...mapActions('clientes', [
            'fetchCuadresRutas',
        ]),
        ...mapActions('cuadreViajes', [
            'fetchCuadre',
        ]),

		back(){
			router.push('/')
		},
		
		
	},
//=============================//
//========== UI State Functions =========//
//=============================//
	

}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';
.tabsCtn {
	background-color: red !important;
}
.el-tabs__item{
	color:white;
}
.el-tabs__item:hover{
	color:black;
}
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

