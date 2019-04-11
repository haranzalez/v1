<template>
<div>
	<!-- presets form -->
	<el-dialog align="center" width="25%" top="5vh" :visible.sync="presetsFormVisible">
		<h3 style="text-align:center;margin-bottom:0;" slot="title">Programador</h3>
		<p style="margin-top:0;">Es importante tener en cuenta que la programacion de backups tomara efecto siempre y cuando el servidor este en vivo y no se reinicie despues de haber programado un back up.</p>
		<el-select v-model="programSelected" placeholder="Seleccione programacion">
			<el-option
			v-for="item in programOptions"
			:key="item.value"
			:label="item.label"
			:value="item.value">
			</el-option>
		</el-select>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" @click="presetsFormVisible = false">Cerrar</el-button>
			<el-button size="mini" type="primary" @click="programPresetBackup">Programar</el-button>
		</span>
	</el-dialog>
	<el-row>
		<h1>Backups</h1>
		<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
			<el-row>
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
						<el-button type="default" size="mini" @click="reloadTable" style="margin-right:5px;"><i class="mdi mdi-reload"></i></el-button>
						<el-button type="default" size="mini" @click="presetsFormVisible = true">Programar</el-button>
						<el-button type="primary" size="mini" @click="backupNow">Backup</el-button>
					</div>
				</el-col>
			</el-row>
			
			
			
		
			<el-table
			v-loading.body="loadingBackupsTable"
			size="mini"
			ref="backupsTable"
			stripe
			max-height="300"
			highlight-current-row
			@current-change="handleCurrentTableChange"
			:data="filtered"
			:default-sort = "{prop: 'id', order: 'descending'}"
			style="width: 100%">
			<el-table-column
			sortable
			fixed
			prop="fecha"
			label="Fecha"
			width="150">
			</el-table-column>
			<el-table-column
			sortable
			prop="archivo"
			label="Archivo"
			>
			<template slot-scope="scope">
				<el-button @click="downloadBackup(scope.row.archivo)" type="text">{{scope.row.archivo}}</el-button>
			</template>
			</el-table-column>
			</el-table>

		</el-col>
	</el-row>
	<!-- searchbar -->
	

</div>
	
</template>

<script>
import HTTP from '../../http';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import moment from 'moment-timezone'
import router from '../../router'


export default {
	name: 'BackupsTable',
	data () {
      	return {
            selectTypeOfSearch: 'Fecha',
			filter: '',
			presetsFormVisible: false,
			programOptions: [
				{
					value: '0 0 1 * *',
					label: 'Primero de cada mes a media noche'
				}, 
				{
					value: '0 0 * * *',
					label: 'Todos los dias a media noche'
				}, 
				{
					value: '0 0 * * 5',
					label: 'Todos los viernes a media noche'
				}
			]
		}
	},
	computed: {
		programSelected: {
			get(){
				return this.preset
			},
			set(value){
				this.setPresetProgram(value)
			}
		},
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('backups', [
			'backup',
			'backupsList',
            'headings',
			'loadingBackupsTable',
			'preset',
		]),
        filtered(){
            if(this.filter !== ''){
                let type = this.selectTypeOfSearch.toLowerCase()
                return this.backupsList.filter(item => {
                    if(isNaN(item[type])){
                        return item[type].toLowerCase().includes(this.filter.toLowerCase())
                    }
                    return item[type].toString().includes(this.filter.toString())
                })
            }
            return this.backupsList
		},
	},
	components: {
	},
    methods: {
        reloadTable(){
			this.fetchBackupsList() 
        },
        handleCurrentTableChange(val) {
			if(val == null){
				this.$refs.backupsTable.setCurrentRow(val);
				return
			}
			this.setFullBackup(val)
			this.$refs.backupsTable.setCurrentRow(val);
		},
		back(){
			
		},
		...mapMutations('backups', [
			'setFullBackup',
			'setPresetProgram',
        ]),
        ...mapActions('backups', [
            'fetchBackupsList',
			'backupNow',
			'downloadBackup',
			'programPresetBackup',
		]),
        
    },
    created: function(){
		this.fetchBackupsList()
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

