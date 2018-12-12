<template>

<el-row>
	<vue-scroll>
	<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
	<h1>Historial de entradas y salidad</h1>
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
			</el-row>
		</div>
	</el-col>
	
	<el-table
	v-loading.body="tableLoading"
	size="mini"
	max-height="350"
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
      prop="ip"
      label="IP"
      width="100">
    </el-table-column>
    <el-table-column
	  sortable
      prop="user"
      label="Usuario"
      width="120">
    </el-table-column>
	 <el-table-column
	  sortable
      prop="token"
      label="Token"
      max-width="410">
    </el-table-column>
	 <el-table-column
	  sortable
      prop="entrada"
      label="Entrada"
    >
		<template slot-scope="scope">
			<p style="width:78%;">{{formatDate(scope.row.entrada)}}</p>
		</template>
    </el-table-column>
	<el-table-column
	  sortable
      prop="salida"
      label="Salida"
    >
		<template slot-scope="scope">
			<p style="width:78%;">{{(scope.row.salida == null)?'':formatDate(scope.row.entrada)}}</p>
		</template>
    </el-table-column>
  </el-table>
	</el-col>
	</vue-scroll>
</el-row>

</template>

<script>
import HTTP from '../../../http';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import moment from 'moment-timezone'
import rounter from '../../../router'
import Papa from 'papaparse'
import * as FS from 'file-saver'

export default {
	name: 'LogsTable',
	data () {
      	return {
            filter: '',
            dataReady: false,
			list: null,
			selectTypeOfSearch: '',
		}
	},
	computed: {
        filtered(){
			if(this.dataReady){
				if(this.filter !== ''){
					let type = this.selectTypeOfSearch.toLowerCase()
					return this.logsList.filter(log => {
						if(isNaN(log[type])){
							return log[type].toLowerCase().includes(this.filter.toLowerCase())
						}
						return log[type].toString().includes(this.filter.toString())
					})
				}
				return this.logsList
			}
			
		},
		...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('logs', [
			'logsList',
			'headings',
			'tableLoading'
		])
    },	
    methods: {
        ...mapActions('logs', [
            'fetchLogs',
		]),
		reloadTable(){
			this.fetchLogs()
		},
		formatDate(d){
			var event = new Date(d);
			var options = { year: 'numeric', month: 'long', day: 'numeric' };
			var hours = event.getHours()
			var minutes = event.getMinutes()
			var type = 'AM'
			if (minutes < 10) {
				minutes = "0" + minutes;
			}
			console.log(hours)
			if(hours > 11 || hours < 24){
				type = 'PM'
			}else{
				type = 'AM'
			}
			var timestamp = hours + ':' + minutes + ' ' +type;
			return 'Fecha: ' + event.toLocaleDateString('es-ES', options) + ' Hora: ' + timestamp;
		}
    },
    created(){
		this.fetchLogs()
		console.log(this.headings)
        this.dataReady = true
    }
   
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/_variables';
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
@import '../../../assets/scss/_variables';
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

