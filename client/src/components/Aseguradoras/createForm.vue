<template>
   <vue-scroll class="page-aseguradoras-create">
       <el-form size="mini" label-position="top" ref="createAseguradoraForm" label-width="120px">
            <el-form-item label="NIT">
                <el-input 
                @input="setNitAseguradora"
                placeholder="">
                </el-input>
            </el-form-item>
            <el-form-item label="Nombre">
                <el-input 
                @input="setNombreAseguradora"
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
	name: 'AseguradoraCreateForm',
	data () {
      	return {
            
		}
	},
	computed: {
        
        ...mapState('authentication', [
			'permisos',
        ]),
        ...mapState('aseguradoras', [
			'aseguradora',
        ]),

	},
	components: {
	},
    methods: {
        ...mapMutations('aseguradoras', [
            'setNombreAseguradora',
            'setNitAseguradora',
        ]),
        title(field){
            field = field.split('_').join(' ')
            field = field.charAt(0).toUpperCase() + field.slice(1)
            return field
        },
    },

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
