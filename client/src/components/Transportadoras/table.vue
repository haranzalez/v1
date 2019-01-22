<template>
<div>
	<!--Edit dialog form -->
	<el-dialog fullscreen center width="30%" top="5vh" :title="transportadora.razon_social" :visible.sync="editFormVisible">
		<TransportadorasEditForm></TransportadorasEditForm>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" @click="editFormVisible = false">Cancelar</el-button>
			<el-button size="mini" type="primary" @click="editTransportadora">Actualizar</el-button>
		</span>
	</el-dialog>
	<!--Create dialog form -->
	<el-dialog fullscreen center width="30%" top="5vh" :visible.sync="createFormVisible">
		<div slot="title">
			<h2>Nueva Transportadora</h2>
		</div>
		<TransportadorasCreateForm></TransportadorasCreateForm>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" @click="createFormVisible = false">Cancelar</el-button>
			<el-button size="mini" type="primary" @click="createTransportadora">Crear</el-button>
		</span>
	</el-dialog>
	<!-- searchbar -->
	<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
		<h1>Transportadoras</h1>
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
				<el-button type="default" size="mini" @click="exportTable" style="margin-right:5px;"><i class="mdi mdi-file-excel"></i></el-button>
				<el-dropdown  trigger="click" @command="handleAction">  
				<el-button size="mini">
					<i class="mdi mdi-settings"></i>
				</el-button>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item  command="create"><i class="mdi mdi-plus mr-10"></i> Crear</el-dropdown-item>
                    <el-dropdown-item  command="edit"><i class="mdi mdi-pencil mr-10"></i> Editar</el-dropdown-item>
                    <el-dropdown-item  command="del"><i class="mdi mdi-delete mr-10"></i> Eliminar</el-dropdown-item>
				</el-dropdown-menu>
    		</el-dropdown>
			</div>
		</el-col>
		
		
	
	<el-table
	v-loading.body="loadingTransportadorasTable"
	stripe
	max-height="250"
	highlight-current-row
	@current-change="handleCurrentTableChange"
	ref="transportadorasTable"
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
      prop="nit"
      label="NIT"
      width="150">
    </el-table-column>
	<el-table-column
	  sortable
      prop="razon_social"
      label="Razon social"
      width="190">
    </el-table-column>
    <el-table-column
	  sortable
      prop="contacto"
      label="Contacto"
      width="170">
    </el-table-column>
    <el-table-column
	  align="center"
	  sortable
      prop="anticipo"
      label="Anticipo"
      width="150">
      <template slot-scope="scope">
          <el-tag :type="(scope.row.anticipo)?'success':'danger'">{{(scope.row.anticipo)?'Si':'No'}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
	  align="center"
	  sortable
      prop="pagos"
      label="Pagos"
      width="120">
       <template slot-scope="scope">
          <el-tag :type="(scope.row.pagos)?'success':'danger'">{{(scope.row.pagos)?'Si':'No'}}</el-tag>
      </template>
    </el-table-column>
	<el-table-column
	  align="center"
	  sortable
      prop="radica_rndc"
      label="Radica RNDC"
      width="120">
       <template slot-scope="scope">
          <el-tag :type="(scope.row.radica_rndc)?'success':'danger'">{{(scope.row.radica_rndc)?'Si':'No'}}</el-tag>
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
import TransportadorasEditForm  from '@/components/Transportadoras/editForm'
import TransportadorasCreateForm from '@/components/Transportadoras/createForm'

export default {
	name: 'TransportadorasTable',
	data () {
      	return {
			editFormVisible: false,
			createFormVisible: false,
            selectTypeOfSearch: 'Id',
            filter: '',
		}
	},
	computed: {
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('transportadoras', [
			'loadingTransportadorasTable',
			'transportadora',
			'transportadorasList',
			'headings',
		]),
        filtered(){
			
				if(this.filter !== ''){
					let type = this.selectTypeOfSearch.toLowerCase()
					return this.transportadorasList.filter(conductor => {
						if(isNaN(conductor[type])){
							return conductor[type].toLowerCase().includes(this.filter.toLowerCase())
						}
						return conductor[type].toString().includes(this.filter.toString())
					})
				}
				return this.transportadorasList
		},
	},
	components: {
		TransportadorasEditForm,
		TransportadorasCreateForm,
	},
    methods: {
		reloadTable(){
			this.fetchTransportadorasList() 
        },
        exportTable(){
			exportService.toXLS(this.transportadorasList, 'Transportadoras', true)
		},
		handleAction(e, row){
            if(e == 'create'){
				this.resetTransportadoraVars()
        		
				this.createFormVisible = true;
            }
             if(e == 'edit'){
				this.editFormVisible = true;
            }
             if(e == 'del'){
                 this.pushToDel(row)
			}
        },
        handleCurrentTableChange(val) {
			if(val == null){
				this.$refs.transportadorasTable.setCurrentRow(val);
				return
			}
			this.setFullTransportadora(val)
			this.$refs.transportadorasTable.setCurrentRow(val);
		},
		...mapMutations('transportadoras', [
			'setFullTransportadora',
			'resetTransportadoraVars',
		]),
        ...mapActions('transportadoras',[
			'fetchTransportadorasList',
			'editTransportadora',
			'createTransportadora',
			'delTransportadora',
		]),
		create(){
			this.createTransportadora()
			this.createFormVisible = false
			this.fetchTransportadorasList()
		},
		pushToDel(row){
			this.$confirm('Esta operacion eliminara permanentemente este registro. Continuar?', 'Atencion!', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancelar',
                type: 'warning'
            }).then(() => {
				this.delTransportadora()
				this.fetchTransportadorasList()
            }).catch(() => {
                this.$message({
                    type: 'warning',
                    message: 'Cancelado'
                });          
            });
			
		}
    },
    created: function(){
		this.fetchTransportadorasList()
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

