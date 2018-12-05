<template>
<div v-if="op">
        <el-collapse>
            <el-collapse-item  v-for="mod in modules" :key="mod.id" :title="mod.nombre">
        
                <el-tabs   :tab-position="tabPosition">
                    <el-tab-pane 
                        v-for="sub in mod.subModulo" 
                        :key="sub.id" 
                        :label="sub.nombre" 
                        :value="sub.nombre" 
                        :name="sub.nombre"
                    >
                        <p><b>Permisos {{sub.nombre}}</b></p>
                        <div style="margin: 15px 0;"></div>
                        
                    <permisos-checkboxes :permiso="permisosOps[sub.nombre]" :roleName="roleName" :subName="sub.nombre"></permisos-checkboxes>
                    
                        <div class="btn-ctn">
                            <el-button type="primary" :disabled="(permisos['Roles'].editar)? false:true" @click="actualizarPermisos(mod.nombre, sub.nombre, sub.id)" size="mini" round plain>Actualizar permisos</el-button>
                        </div>
                        
                    </el-tab-pane>
                </el-tabs>
                
            </el-collapse-item>
        </el-collapse>

    </div>

</template>

<script>

import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import PermisosCheckboxes from './PermisosCheckBoxes'

 export default {
    data() {
      return {
        activo: ['1'],
        checkAll: {},
        activeName: {},
        permisosOps: {},
        isIndeterminate: {},
        tabPosition: 'top',
      };
    },
    components:{
        PermisosCheckboxes,
    },
    props: ['role-name', 'op'],
    computed: {
        ...mapState('roles', [
            'modules',
            'roleToEdit',
            'roleModuleDialogeVisible',
            'modulesAvailable',
        ]),
        ...mapState('authentication', [
			'permisos',
		]),
        
    },
    methods: {
        ...mapMutations('roles', [
            'setSelectedPermisos',
            'setModuleListDialogeVisible',
        ]),
        ...mapActions('roles', [
            'edit',
            'setPermisos',
        ]),
      actualizarPermisos(modName,subName, subId) {
        this.setPermisos(subId)
      },
      handleCheckAllChange(event, subName) {
        for(let prop in this.permisosSeleccionados[subName]){
            this.permisosSeleccionados[subName][prop] = event
        }
        this.isIndeterminate[subName] = false;
      },
      handleCheckedPermisoChange(event, subName,modName, op) {
        this.permisosSeleccionados[this.roleName][modName][subName][op] = event;
      },
     
    },
    created(){
        for(let prop in this.modulos.subModulo){
            this.permisosOps[this.modulos.subModulo[prop].nombre] = this.modulos.subModulo[prop].permisos
        }
    }
  }
</script>

<style>
.btn-ctn{
    padding-top: 20px;
    padding-bottom: 10px;
    text-align:center !important;
}

</style>
