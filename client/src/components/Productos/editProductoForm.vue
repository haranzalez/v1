<template>
   <vue-scroll class="page-productos-edit">
       <el-form size="mini" label-position="top" ref="editeProductoForm" label-width="120px">
            <el-form-item label="Nombre">
                <el-input
                :value="producto.nombre"
                @input="setNombreProducto"
                placeholder="">
                </el-input>
            </el-form-item>
            <el-form-item label="Precio">
                <el-input 
                :value="producto.precio"
                @input="setPrecioProducto"
                placeholder="">
                </el-input>
            </el-form-item>
             <el-form-item label="Descripcion">
                <el-input 
                :value="producto.descripcion"
                @input="setDescripcionProducto"
                placeholder="">
                </el-input>
            </el-form-item>
        </el-form>
   </vue-scroll>
</template>

<script>
import HTTP from '../../http';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import moment from 'moment-timezone'
import router from '../../router'

export default {
	name: 'ProductoEditForm',
	data () {
      	return {
            
		}
	},
	computed: {
        
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('productos', [
			'producto',
        ]),

	},
	components: {
	},
    methods: {
       
        back() {
			
		},
        ...mapMutations('productos', [
            'setNombreProducto',
            'setPrecioProducto',
            'setDescripcionProducto',
        ]),
        title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
        },
        ...mapActions('productos',[
            'editProducto',
        ]),
    },
    created: function(){
       
	}

}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';
.page-trailers-create {
	.label-switch-box {
		display: block;
		clear: both;
		width: 100%;
		text-align: right;
		margin-bottom: 20px;
	}
	.col-p {
		padding: 0 10px;
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
