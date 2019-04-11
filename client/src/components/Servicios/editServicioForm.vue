<template>
   <vue-scroll class="page-servicios-edit">
       <el-form size="mini" label-position="top" ref="editServicioForm" label-width="120px">
            <el-form-item label="Nombre">
                <el-input
                :value="servicio.nombre"
                @input="setNombreServicio"
                placeholder="">
                </el-input>
            </el-form-item>
            <el-form-item label="Precio">
                <el-input 
                :value="servicio.precio"
                @input="setPrecioServicio"
                placeholder="">
                </el-input>
            </el-form-item>
             <el-form-item label="Descripcion">
                <el-input 
                :value="servicio.descripcion"
                @input="setDescripcionServicio"
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
	name: 'ServicioEditForm',
	data () {
      	return {
            
		}
	},
	computed: {
        
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('servicios', [
			'servicio',
        ]),

	},
	components: {
	},
    methods: {
       
        back() {
			
		},
        ...mapMutations('servicios', [
            'setNombreServicio',
            'setPrecioServicio',
            'setDescripcionServicio',
        ]),
        title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
        },
        ...mapActions('servicios',[
            'editServicio',
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
