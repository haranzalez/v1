<template>
    <div v-if="op == 'edit'">
        <el-dialog  :visible.sync="moduleListDialogeVisible">
    
            <span slot="title" style="display:block;text-align:center;"><b>Modulos</b></span>
            <span style="margin-bottom: 10px !important;display: block;text-align:center;">
                Seleccione los modulos deseados y transfiera deacuerdo a lo seleccionado
            </span>
    
    
            <el-transfer
                v-model="selected"
                :data="allModules"
                :titles="['Todos', roleToEdit.nombre]"
                >
            </el-transfer>
    
    
            <span slot="footer" class="dialog-footer" style="text-align:center;">
                <el-button @click="setModuleListDialogeVisible(false)">Cancel</el-button>
                <el-button type="primary" @click="setModulos">Confirm</el-button>
            </span>
    
        
        </el-dialog>
    </div>
    <div v-else>
         <el-dialog  :visible.sync="moduleListDialogeVisible">
    
            <span slot="title" style="display:block;text-align:center;"><b>Modulos</b></span>
            <span style="margin-bottom: 10px !important;display: block;text-align:center;">
                Seleccione los modulos deseados y transfiera deacuerdo a lo seleccionado
            </span>
    
    
            <el-transfer
                :disabled="(permisos['Roles'].editar)? false:true"
                v-model="selected"
                :data="allModules"
                :titles="['Todos', 'Nuevo Role']"
                >
            </el-transfer>
    
    
            <span slot="footer" class="dialog-footer" style="text-align:center;">
                <el-button @click="setModuleListDialogeVisible(false)">Cancel</el-button>
                <el-button :disabled="(permisos['Roles'].editar)? false:true" type="primary" @click="setModulos">Confirm</el-button>
            </span>
    
        
        </el-dialog>
    </div>
   
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import HTTP from '../../../../http';
  export default {
    data() {
      return {
        selected: [],
        dialogVisible: false,
        allModules: null,
      };
    },
    props: ['op'],
    computed: {
        ...mapState('roles', [
            'moduleListDialogeVisible',
            'roleToCreate',
            'roleToEdit',
        ]),
         ...mapState('authentication', [
			'permisos',
		]),
    },
    methods: {
        ...mapMutations('roles', [
            'setModuleListDialogeVisible',
            'setSelectedModules',
        ]),
        setModulos(){
            this.setSelectedModules(this.selected)
        },
       
    },

    beforeCreate() {
        HTTP().local.get('api/modulos')
        .then(d => {
            let data = []
            if(this.op == 'edit'){
                for(let prop in this.roleToEdit.modulos){
                    this.selected.push(this.roleToEdit.modulos[prop]['id'])
                }
            }else{
                this.selected = []
            }
            
            for (let prop in d.data) {
                data.push({
                    key:d.data[prop]['id'],
                    label: d.data[prop]['nombre'],
                    disabled: false
                });
            }
            this.allModules = data
        }).catch(err => {
            console.log(err)
        })
       
        
    }
  };
</script>
<style lang="scss" scoped>
    
</style>
