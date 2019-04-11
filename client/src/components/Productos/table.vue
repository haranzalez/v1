<template>
<div>
	<!--Edit dialog form -->
	<el-dialog width="40%" top="5vh" :title="producto.nombre" :visible.sync="editFormVisible">
		<ProductosEditForm></ProductosEditForm>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" @click="editFormVisible = false">Cancelar</el-button>
			<el-button size="mini" type="primary" @click="editProducto">Actualizar</el-button>
		</span>
	</el-dialog>
	<!--Create dialog form -->
	<el-dialog width="40%" top="5vh" title="Nuevo producto" :visible.sync="createFormVisible">
		<ProductosCreateForm></ProductosCreateForm>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" @click="createFormVisible = false">Cancelar</el-button>
			<el-button size="mini" type="primary" @click="createProducto">Crear</el-button>
		</span>
	</el-dialog>
	<!-- searchbar -->
	<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
		<h1>Productos</h1>
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
                <el-button type="default" size="mini" @click="reloadTable('clients')" style="margin-right:5px;"><i class="mdi mdi-reload"></i></el-button>
				<el-button type="default" size="mini" @click="exportTable" style="margin-right:5px;"><i class="mdi mdi-file-excel"></i></el-button>
				<el-dropdown  trigger="click" @command="handleAction">  
				<el-button size="mini">
					<i class="mdi mdi-settings"></i>
				</el-button>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item :disabled="(permisos['Productos'].crear)? false:true" command="create"><i class="mdi mdi-plus mr-10"></i> Crear</el-dropdown-item>
                    <el-dropdown-item :disabled="(permisos['Productos'].editar)? false:true" command="edit"><i class="mdi mdi-pencil mr-10"></i> Editar</el-dropdown-item>
                    <el-dropdown-item :disabled="(permisos['Productos'].eliminar)? false:true" command="del"><i class="mdi mdi-delete mr-10"></i> Eliminar</el-dropdown-item>
				</el-dropdown-menu>
    		</el-dropdown>
			</div>
		</el-col>
		
		
	
	<el-table
    v-loading.body="loadingProductosTable"
	size="mini"
	ref="productosTable"
	stripe
	max-height="250"
	highlight-current-row
	@current-change="handleCurrentTableChange"
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
      prop="nombre"
      label="Nombre"
      width="110">
    </el-table-column>
    <el-table-column
	  sortable
      prop="precio"
      label="Precio"
      width="110">
    </el-table-column>
	<el-table-column
	  sortable
      prop="descripcion"
      label="Descripcion"
     >
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
import ProductosCreateForm from '@/components/Productos/createProductoForm'
import ProductosEditForm from '@/components/Productos/editProductoForm'

export default {
	name: 'ProductosTable',
	data () {
      	return {
			editFormVisible: false,
			createFormVisible: false,
            selectTypeOfSearch: 'Nombre',
            filter: '',
		}
	},
	computed: {
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('productos', [
			'producto',
			'productosList',
            'headings',
            'loadingProductosTable',
		]),
        filtered(){
			
				if(this.filter !== ''){
					let type = this.selectTypeOfSearch.toLowerCase()
					return this.productosList.filter(producto => {
						if(isNaN(producto[type])){
							return producto[type].toLowerCase().includes(this.filter.toLowerCase())
						}
						return producto[type].toString().includes(this.filter.toString())
					})
				}
				return this.productosList
		},
	},
	components: {
        ProductosCreateForm,
        ProductosEditForm,
	},
    methods: {
        reloadTable(){
			this.fetchProductosList() 
        },
        exportTable(){
			exportService.toXLS(this.productosList, 'Productos', true)
		},
		handleAction(e, row){
            if(e == 'create'){
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
				this.$refs.productosTable.setCurrentRow(val);
				return
			}
			this.setFullProducto(val)
			this.$refs.productosTable.setCurrentRow(val);
		},
		back(){
			
		},
		...mapMutations('productos', [
			'setFullProducto',
		]),
        ...mapActions('productos',[
			'fetchProductosList',
			'editProducto',
			'createProducto',
			'delProducto',
		]),
    
		pushToDel(row){
			this.$confirm('Esta operacion eliminara permanentemente este registro. Continuar?', 'Atencion!', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancelar',
                type: 'warning'
            }).then(() => {
				this.delProducto()
            }).catch(() => {
                this.$message({
                    type: 'warning',
                    message: 'Cancelado'
                });          
            });
			
		}
    },
    created: function(){
		this.fetchProductosList()
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

