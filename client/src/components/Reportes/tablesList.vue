<template>

	   <el-row>
	 
		<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
			<h3>Tablas</h3>
			<el-select size="mini" v-model="selected_table" placeholder="Tabla..">
				<el-option
				v-for="(item, key) in tablesList"
				:key="key"
				:label="item"
				:value="key">
				</el-option>
			</el-select>
		</el-col>
		<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
			<h3>Campos</h3>
			<el-select size="mini" v-model="selected_field" placeholder="Campo..">
				<el-option
				v-for="(item, key) in fieldsList"
				:key="key"
				:label="item"
				:value="item">
				</el-option>
				</el-select>
		</el-col>
		<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
			<h3>Filtro</h3>
			<el-input
				size="mini"
				@input="setFiltro"
				placeholder="Separe filtros con comas">
				</el-input>
		</el-col>
		<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
			<el-button @click="aplicar">Aplicar</el-button>
		</el-col>
   </el-row>
   
	
</template>

<script>
import HTTP from '../../http';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import moment from 'moment-timezone'
import router from '../../router'
//servicios
import exportService from '../../services/exportService'


export default {
	name: 'Reportes',
	data () {
      	return {
			
		}
	},
	computed: {
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('reportes', [
            'tablesList',
            'fieldsList',
			'selectedTable',
			'selectedField',
        ]),
        selected_table:{
            get(){
                return this.selectedTable
            },
            set(value){
				this.setSelectedField(null)
				this.setSelectedTable(value)
				this.fetchFields()
            }
        },
        selected_field:{
            get(){
                return this.selectedField
            },
            set(value){
				this.setSelectedField(value)
            }
        }
       
	},
	components: {
	},
    methods: {
	aplicar(){
		this.setCurrentReportFields()
		this.fetchTableFieldsData()

	},
    ...mapActions('reportes', [
		'fetchTables',
		'fetchFields',
		'fetchTableFieldsData'
    ]),
    ...mapMutations('reportes', [
		'setSelectedTable',
		'setSelectedField',
		'setFiltro',
		'setCurrentReportFields',
    ]),
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    created: function(){
		this.fetchTables()
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

