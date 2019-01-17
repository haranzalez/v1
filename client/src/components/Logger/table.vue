<template>
<div>
	<el-row>
		<h1>Historial de cambios</h1>
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
					</div>
				</el-col>
			</el-row>
			
			
			
		
			<el-table
			v-loading.body="loadingLoggerTable"
			size="mini"
			stripe
			max-height="300"
			highlight-current-row
			:data="filtered"
			:default-sort = "{prop: 'id', order: 'descending'}"
			style="width: 100%">
			<el-table-column
			sortable
			fixed
			prop="fecha"
			label="Fecha"
			width="150">
            <template slot-scope="scope">
                {{fecha(scope.row.fecha)}}
            </template>
			</el-table-column>
			<el-table-column
			sortable
			prop="nombre_tabla"
			label="Tabla">
			</el-table-column>
            <el-table-column
			sortable
			prop="operacion"
			label="Operacion">
            <template slot-scope="scope">
                {{operacion(scope.row.operacion)}}
            </template>
			</el-table-column>
             <el-table-column
			sortable
			prop="usuario"
			label="Usuario">
			</el-table-column>
            <el-table-column
			sortable
			prop="valor_nuevo"
			label="Valor nuevo">
             <template slot-scope="scope">
                <el-popover
                v-if="scope.row.valor_nuevo != null"
                :ref="scope.row.id+'-valor_nuevo'"
                placement="right"
                width="400"
                trigger="hover">
                <div v-for="(item, key) in scope.row.valor_nuevo" :key="(item)?item.id:''">
                    <el-row>
                        <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10"><b>{{title(key)}}</b></el-col>
                        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">{{ itemSel(key, item) }}</el-col>
                    </el-row>
                </div>
                </el-popover>
                <el-button :disabled="scope.row.valor_nuevo === null" size="mini" type="text" v-popover="scope.row.id+'-valor_nuevo'">Info</el-button>
	        </template>
			</el-table-column>
            <el-table-column
			sortable
			prop="valor_anterior"
			label="Valor anterior">
            <template slot-scope="scope">
                <el-popover
                v-if="scope.row.valor_anterior != null"
                :ref="scope.row.id+'-valor_anterior'"
                placement="right"
                width="400"
                trigger="hover">
                <div v-for="(item, key) in scope.row.valor_anterior" :key="(item)?item.id:''">
                    <el-row>
                        <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10"><b>{{title(key)}}</b></el-col>
                        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">{{ itemSel(key, item) }}</el-col>
                    </el-row>
                </div>
                </el-popover>
                <el-button :disabled="scope.row.valor_anterior === null" size="mini" type="text" v-popover="scope.row.id+'-valor_anterior'">Info</el-button>
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
import DateService from '../../services/DateFormatService'

export default {
	name: 'LoggerTable',
	data () {
      	return {
            filter: '',
            selectTypeOfSearch: '',
		}
	},
	computed: {
		
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('logger', [
			'backup',
			'loggerList',
            'headings',
			'loadingLoggerTable',
        ]),
       
        filtered(){
            console.log(this.loggerList)
            if(this.filter !== ''){
                let type = this.selectTypeOfSearch.toLowerCase()
                return this.loggerList.filter(item => {
                    if(isNaN(item[type])){
                        return item[type].toLowerCase().includes(this.filter.toLowerCase())
                    }
                    return item[type].toString().includes(this.filter.toString())
                })
            }
            return this.loggerList
		},
	},
	components: {
	},
    methods: {
         fecha(d){
           return DateService.fechav2(d)
        },
        operacion(o){
            if(o == 'UPDATE'){
                return 'ACTUALIZAR'
            }
            if(o == 'INSERT'){
                return 'CREAR'
            }
            if(o == 'DELETE'){
                return 'ELIMINAR'
            }
        },
         title(field){
			if(field == 'pivot'){
				return
			}
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
        },
        itemSel(key, item){
			if(key == 'pivot' || key == 'created_at' || key == 'updated_at'){
				return
			}else{
				return item
			}
		},
        reloadTable(){
			this.fetchLoggerList() 
        },
		...mapMutations('logger', [

        ]),
        ...mapActions('logger', [
            'fetchLoggerList',
		]),
        
    },
    created: function(){
		this.fetchLoggerList()
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

