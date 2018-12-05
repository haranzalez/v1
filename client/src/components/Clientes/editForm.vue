<template>
   <vue-scroll class="page-trailers-create">
       <el-form size="mini" label-position="top" ref="form" label-width="120px">
        <el-row>
            <h3>Info</h3>
				<el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Nombre razon social">
                        <el-input size="mini" 
                        :value="cliente.nombre_razon_social"
                        @input="setNombreRazonSocial"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="NIT">
                        <el-input size="mini" 
                        :value="cliente.nit"
                        @input="setNit"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Direccion">
                        <el-input size="mini" 
                        :value="cliente.direccion"
                        @input="setDireccion"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Ciudad">
                        <el-input size="mini" 
                        :value="cliente.ciudad"
                        @input="setCiudad"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Email">
                        <el-input size="mini" 
                        :value="cliente.email"
                        @input="setEmail"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Telefono">
                        <el-input size="mini" 
                        :value="cliente.telefono"
                        @input="setTelefono"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Celular">
                        <el-input size="mini" 
                        :value="cliente.celular"
                        @input="setCelular"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Persona de contacto">
                        <el-input size="mini" 
                        :value="cliente.persona_de_contacto"
                        @input="setPersonaDeContacto"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="Direccion envio de factura">
                        <el-input size="mini" 
                        :value="cliente.direccion_envio_de_factura"
                        @input="setDireccionEnvioDeFactura"
                        placeholder="">
                        </el-input>
                    </el-form-item>
				</el-col>
                <h3>Tipo de contrato</h3>
                <el-col :span="24" :md="24" :sm="24" :xs="24" class="col-p">
                    <el-row>
                        <el-col :span="8" :md="8" :sm="24" :xs="24">
                            <el-form-item label="Contrato">
                                <el-select @change="setSelectedContrato" :value="selectedContrato" placeholder="Select">
                                    <el-option
                                    v-for="item in contratoOptions"
                                   :key="item.tipo"
                                    :label="item.tipo"
                                    :value="item.tipo">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" :md="8" :sm="24" :xs="24">
                            <el-form-item label="Dias" class="padding">
                                <el-select @change="setSelectedDias" :value="selectedDias" placeholder="Select">
                                    <el-option
                                    v-for="item in diasOptions"
                                   :key="item.dias"
                                    :label="item.dias"
                                    :value="item.dias">
                                    </el-option>
                                </el-select>
                                
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" :md="8" :sm="24" :xs="24">
                            <el-form-item label="Cupo">
                                <el-input size="mini" 
                                :value="(cliente.tipo_negociacion !== null)?cliente.tipo_negociacion.cupo:0"
                                @input="setCupo"
                                placeholder="">
                                </el-input>
                            </el-form-item>
                        </el-col>
                         
                    </el-row>
                    
				</el-col>
      

        </el-row>
        
        
            
        </el-form>
   </vue-scroll>
</template>

<script>
import HTTP from '../../http';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import moment from 'moment-timezone'
import router from '../../router'

export default {
	name: 'RutasEditForm',
	data () {
      	return {

		}
    },
	computed: {
        
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('clientes', [
            'cliente',
            'contratoOptions',
            'diasOptions',
            'selectedContrato',
            'selectedDias',
        ]),

	},
	components: {
	},
    methods: {
        back() {
			router.push('/Clientes')
        },
        del(){
            this.$confirm('Esta operacion eliminara permanentemente este registro. Continuar?', 'Atencion!', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancelar',
                type: 'warning'
            }).then(() => {
                this.delCliente()
            }).catch(() => {
                this.$message({
                    type: 'success',
                    message: 'Cancelado'
                });          
            });
        },
        ...mapActions('clientes',[
            'editCliente',
            'delCliente',
        ]),
        ...mapMutations('clientes', [
            'setNombreRazonSocial',
            'setNit',
            'setDireccion',
            'setCiudad',
            'setEmail',
            'setTelefono',
            'setCelular',
            'setPersonaDeContacto',
            'setDireccionEnvioDeFactura',
            'setCupo',
            'setCelular',
            'setSelectedDias',
            'setSelectedContrato'
        ]),
        title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
        },
       
    },
    created(){
    }


}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';
.padding{
    padding:0px 5px;
}
.page-trailers-create {
	.label-switch-box {
		display: block;
		clear: both;
		width: 100%;
		text-align: right;
		margin-bottom: 20px;
	}
	.col-p {
        padding: 0px 10px;
		box-sizing: border-box;
	}
	.select-wide {
		width: 100%;
	}
	.pull-right {
		text-align: right;
	}
}

</style>
