<template>
	<div class="page-invoice scrollable">
        
        <el-dialog
        title="Comentarios"
        :visible.sync="comentsDialogVisible"
        width="30%">
        <el-input
        type="textarea"
        :rows="2"
        placeholder="Porfavor ingrese su comentario"
        :value="comentarios"
        @input="setComments">
        </el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="comentsDialogVisible = false; setComments('')">Cancelar</el-button>
            <el-button type="primary" @click="comentsDialogVisible = false;">Confirmar</el-button>
        </span>
        </el-dialog>
        <!-- titulo dialog -->
        <el-dialog
        title="Titulo"
        :visible.sync="tituloDialogVisible"
        width="30%">
        <el-input
        placeholder="Porfavor ingrese titulo"
        :value="titulo"
        @input="setTitle">
        </el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="tituloDialogVisible = false; setTitle('')">Cancelar</el-button>
            <el-button type="primary" @click="tituloDialogVisible = false;">Confirmar</el-button>
        </span>
        </el-dialog>
		<div class="toolbar">	
            
				
				<el-dropdown  trigger="click" @command="handleAction">  
				<el-button size="mini">
					<i class="mdi mdi-settings"></i>
				</el-button>
				<el-dropdown-menu slot="dropdown">
				<el-dropdown-item :disabled="(permisos['Reportes'].editar)? false:true" command="imprimir"><i class="mdi mdi-printer mr-10"></i> Imprimir</el-dropdown-item>
                <el-dropdown-item :disabled="(permisos['Reportes'].editar)? false:true" command="borrar"><i class="mdi mdi-eraser mr-10"></i> Borrar</el-dropdown-item>
                <el-dropdown-item :disabled="(permisos['Reportes'].editar)? false:true" command="titulo"><i class="mdi mdi-format-title mr-10"></i> Titulo</el-dropdown-item>
                <el-dropdown-item :disabled="(permisos['Reportes'].editar)? false:true" command="comentarios"><i class="mdi mdi-comment mr-10"></i> Comentarios</el-dropdown-item>
				</el-dropdown-menu>
    		</el-dropdown>
							
		</div>

		<div class="invoice bg-white black-text">		
			<div class="invoice-top">
				<div class="logo">
					<img src="@/assets/images/logo.svg" alt="logo">
				</div>
				<div class="info">
					<h2>{{usuario.nombre + ' ' + usuario.apellido}}</h2>
					<p>{{usuario.email}}<br>{{usuario.tel_mobil}}</p>
				</div><!--End Info-->
				<div class="title">
					<h1>{{titulo}}</h1>
					<p>Fecha: {{todayDate()}}</p>
				</div><!--End Title-->
			</div><!--End InvoiceTop-->

			<hr>			

			<div class="invoice-middle">
				<div class="info">
					
				</div>

				<div class="project">
					<h2>Comentarios</h2>
					<p>{{comentarios}}</p>
				</div>   
			</div><!--End Invoice Mid-->

			<div class="invoice-bottom">
				<el-table
				:data="fieldData">
					<el-table-column v-for="(item, key) in currentReportFields" :key="key" :prop="item"></el-table-column>
				</el-table>
				
				<div class="legalcopy flex mt-20">
				
				</div>
			</div><!--End Invoice-->
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import dateService from '../../services/DateFormatService'
export default {
    name: 'Invoice',
    data () {
      	return {
            comentsDialogVisible: false,
            tituloDialogVisible: false,
		}
	},
	computed: {
        ...mapState('authentication', [
            'permisos',
            'usuario',
        ]),
        ...mapState('reportes', [
            'tablesList',
            'fieldsList',
            'fieldData',
			'selectedTable',
            'selectedField',
            'currentReportFields',
            'comentarios',
            'titulo',
        ]),
	},
	methods: {
        todayDate(){
            return dateService.fecha(new Date())
        },
        
        ...mapMutations('reportes', [
            'clearCurrentReportFields',
            'clearFieldData',
            'setFieldData',
            'setComments',
            'setTitle',
        ]),
        handleAction(e){
        if(e == 'borrar'){
            this.$confirm('Esta operacion borrara todo el progreso de el reporte. Esta seguro?', 'Atencion!', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancelar',
            type: 'warning'
            }).then(() => {
                this.clearCurrentReportFields()
                this.clearFieldData()
                this.setTitle('Titulo')
                this.setComments('')
                this.$message({
                    type: 'success',
                    message: 'Operacion completada'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Operacion cancelada'
                });          
            });
            
        }
        if(e == 'imprimir'){ 
            window.print()
        }
        if(e == 'comentarios'){
            this.comentsDialogVisible = true
        }
        if(e == 'titulo'){
            this.tituloDialogVisible = true
        }
    },
	}
}
</script>

<style lang="scss">
@import '../../assets/scss/_variables';

.page-invoice {
	.toolbar {
		max-width: 794px;
		margin: 0 auto;
		text-align: right;
		margin-bottom: 20px;
	}

	.invoice {
		background: white;
		width: 100%;
		max-width: 794px;
		min-height: 1123px;
		margin: 0 auto;
		padding: 2em;
		box-sizing: border-box;
		box-shadow: 0px 8px 8px -8px rgba(0, 0, 0, 0.3);

		hr {
			border: 1px solid rgba(0, 0, 0, 0.05);
		}

		.invoice-top {
			overflow: hidden;
			margin-bottom: 30px;

			.logo {
				float: left;
				height: 60px;
				width: 60px;
				box-sizing: border-box;
				border-radius: 50%;
				overflow: hidden;
				background: rgba(0, 0, 0, 0.07);
				text-align: center;
				
				img {
					height: 80%;
					margin-top: 10%;
				}
			}
			.info {
				display: block;
				float:left;
				margin-left: 20px;
				margin-top: 5px;

				& > * {
					margin: 0;
				}
			}
			.title {
				float: right;

				& > * {
					margin: 0;
				}

				p {
					text-align: right;
				}
			}
		}

		.invoice-middle { 
			overflow: hidden;
			margin-top: 30px;
			margin-bottom: 30px;

			.clientlogo {
				float: left;
				height: 60px;
				width: 60px;
				box-sizing: border-box;
				border-radius: 50%;
				overflow: hidden;
				background: grey;
				
				img {
					width: 100%;
				}
			}

			.info {
				display: block;
				float:left;
				margin-left: 20px;
				margin-top: 5px;

				& > * {
					margin: 0;
				}
			}

			.project {
				margin-left: 52%;

				& > * {
					margin: 0;
				}
			}
		}

		.invoice-bottom {
			table {
				width: 100%;
				border-collapse: collapse;
				
				th {
					text-align: right;
					padding: 20px;
					padding-bottom: 5px;
					opacity: .7;
					
					&:first-child {
						text-align: left;
						padding-left: 0px;
						width: 100%;
					}
					&:last-child {
						padding-right: 0px;
					}
				}

				td {
					text-align: right;
					padding: 20px;
					padding-bottom: 5px;
					border-bottom: 1px solid #EEE;

					&:first-child {
						text-align: left;
						padding-left: 0px;
						width: 100%;
					}
					&:last-child {
						padding-right: 0px;
					}
				}

				tfoot td {
					border: none;
					padding-top: 5px;
				}
			}
		}

		h1 { font-size: 1.5em; color: #222; }
		h2 { font-size: .9em; }
		h3 { font-size: 1.2em; font-weight: 300; line-height: 2em; }
		p  { font-size: .7em; color: #666; line-height: 1.2em; }
	}

}


@media screen and (max-width: 768px) {
	.page-invoice {
		.invoice {
			.invoice-middle { 
				.project {
					display: block;
					width: 100%;
					clear: both;
					padding: 10px 0;
					margin: 0;
				}
			}
			.invoice-bottom {
				table {
					th {
						padding: 5px;
					}

					td {
						padding: 5px;
					}
				}
			}
		}
	}
}

@media print{
	.layout-container .container .footer ,
	.layout-container .container .header ,
	.layout-container .container .horizontal-nav ,
	.layout-container .footer ,
	.layout-container .layout-picker ,
	.layout-container .vertical-nav ,
	.layout-container .header {
		display:none;
	}

	.page-invoice {
		.toolbar {
			display: none;
		}

		.invoice {
			box-shadow: none;
			max-width: 100%;
			padding: 0;
		}
	}
}
</style>

