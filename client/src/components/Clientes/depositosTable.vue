<template>
	<div>
		<el-row>
			<el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
				<p>Disponible:</p>
			</el-col>
			<el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
				<p>{{'$'+formatMoney(Number(depositoTotal))}}</p>
			</el-col>
		</el-row>
	
		<el-row>
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<div style="text-align:right;">
					<el-button type="default" size="mini" @click="reloadTable" style="margin-right:5px;"><i class="mdi mdi-reload"></i></el-button>
					<el-button type="default" size="mini" @click="exportTable" style="margin-right:5px;"><i class="mdi mdi-file-excel"></i></el-button>
					<el-dropdown  trigger="click" @command="handleAction">  
						<el-button size="mini">
							<i class="mdi mdi-settings"></i>
						</el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item :disabled="(permisos['Clientes'].crear)? false:true" command="create"><i class="mdi mdi-plus mr-10"></i> Crear</el-dropdown-item>
							<el-dropdown-item :disabled="(permisos['Clientes'].editar)? false:true" command="edit"><i class="mdi mdi-pencil mr-10"></i> Editar</el-dropdown-item>
							<el-dropdown-item :disabled="(permisos['Clientes'].eliminar)? false:true" command="del"><i class="mdi mdi-delete mr-10"></i> Eliminar</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<el-table
					v-loading="depositoTableLoading"
					stripe
					max-height="250"
					highlight-current-row
					@current-change="handleCurrentTableChange"
					ref="depositosTable"
					size="mini"
					:data="filtered"
					:default-sort = "{prop: 'id', order: 'descending'}"
					style="width: 100%">
					<el-table-column
						sortable
						fixed
						prop="id"
						label="ID"
						width="80">
					</el-table-column>
					<el-table-column
						sortable
						label="Cantidad"
						width="120">
						<template slot-scope="scope">
							{{'$'+formatMoney(scope.row.cantidad)}}
						</template>
					</el-table-column>
					<el-table-column
						sortable
						label="Fecha deposito"
						>
						<template slot-scope="scope">
							{{formatDate(scope.row.fecha_deposito)}}
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import HTTP from '../../http';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import moment from 'moment-timezone'
import router from '../../router'
//servicios
import exportService from '../../services/exportService'
import dateService from '../../services/DateFormatService'
const formatter = new Intl.NumberFormat({
    style: 'currency',
})
//components
export default {
	name: 'DepositosTable',
	data () {
      	return {
            filter: '',
		}
	},
	computed: {
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('clientes', [
            'cliente',
			'depositosList',
			'depositoTableLoading',
			'depositoTotal',
		]),
        filtered(){
			if(this.filter !== ''){
				let type = this.selectTypeOfSearch.toLowerCase()
				return this.depositosList.filter(conductor => {
					if(isNaN(conductor[type])){
						return conductor[type].toLowerCase().includes(this.filter.toLowerCase())
					}
					return conductor[type].toString().includes(this.filter.toString())
				})
			}
			return this.depositosList
		},
	},
	components: {
	},
    methods: {
		formatDate(d){
			return dateService.fecha(d)
		},
		formatMoney(v){
			return formatter.format(v)
		},
		reloadTable(){
			this.fetchDepositos() 
        },
        exportTable(){
			exportService.toXLS(this.depositosList, 'Depositos', true)
		},
		handleAction(e, row){
            if(e == 'create'){
				this.resetDeposito()
        		
				this.setDepositosCreateFormVisible(true);
            }
            if(e == 'edit'){
				this.setDepositosEditFormVisible(true);
            }
            if(e == 'del'){
                 this.pushToDel(row)
			}
        },
        handleCurrentTableChange(val) {
			if(val == null){
				this.$refs.depositosTable.setCurrentRow(val);
				return
			}
			this.fetchDeposito(val.id)
			this.$refs.depositosTable.setCurrentRow(val);
		},
		...mapMutations('clientes', [
			'resetDeposito',
			'setDepositosCreateFormVisible',
			'setDepositosEditFormVisible',
		
		]),
        ...mapActions('clientes',[
			'fetchDepositos',
			'fetchDeposito',
		]),
     
    },
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

