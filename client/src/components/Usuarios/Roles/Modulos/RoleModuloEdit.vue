<template>
<div v-if="op">
        <el-collapse v-if="modulesAvailable">
        <el-collapse-item  v-for="mod in roleToEdit.modulos" :key="mod.id" :title="mod.nombre">
       
            <el-tabs v-model="activeName[roleName][mod.nombre]"  :tab-position="tabPosition">
                <el-tab-pane 
                    v-for="sub in mod.subModulo" 
                    :key="sub.id" 
                    :label="sub.nombre" 
                    :value="sub.nombre" 
                    :name="sub.nombre"
                >
                    <p><b>Permisos {{sub.nombre}}</b></p>
                    <div style="margin: 15px 0;"></div>
                    
                   <permisos-checkboxes :checked="permisosSeleccionados[roleName][mod.nombre][sub.nombre]" :roleName="roleName" :subName="sub.nombre"></permisos-checkboxes>
                   
                    <div class="btn-ctn">
                        <el-button type="primary" :disabled="rolePermisos.editar" @click="actualizarPermisos(mod.nombre, sub.nombre, sub.id)" size="mini" round plain>Actualizar permisos</el-button>
                    </div>
                    
                </el-tab-pane>
            </el-tabs>
            
        </el-collapse-item>
        </el-collapse>

        <div class="btn-ctn" v-else>
            <el-button type="primary" :disabled="rolePermisos.editar" @click="setModuleListDialogeVisible(true)" size="mini" round plain>Agregar Modulos</el-button>
        </div>

    </div>
    
    <div v-else>
        <div class="btn-ctn">
            <el-button type="primary" @click="setModuleListDialogeVisible(true)" size="mini" round plain>Agregar Modulos</el-button>
        </div>
    </div>
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
        permisosSeleccionados: {},
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
            'rolePermisos',
            'modules',
            'roleToEdit',
            'roleModuleDialogeVisible',
            'modulesAvailable',
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
         console.log(this.permisosSeleccionados)
      },
     
    },
    created(){
       
        this.permisosSeleccionados[this.roleName] = {}
        this.activeName[this.roleName] = {}
        for(let prop in this.roleToEdit.modulos){
            let modName = this.roleToEdit.modulos[prop]['nombre']
            this.permisosSeleccionados[this.roleName][modName] = {}
            this.activeName[this.roleName][modName] = this.roleToEdit.modulos[prop].subModulo[0]['nombre']
            for(let prop3 in this.roleToEdit.modulos[prop].subModulo){
                let subName = this.roleToEdit.modulos[prop].subModulo[prop3]['nombre'].toString()
                this.permisosSeleccionados[this.roleName][modName][subName] = {}
                for(let prop4 in this.roleToEdit.modulos[prop].subModulo[prop3]['permisos'])
                {
                    delete this.roleToEdit.modulos[prop].subModulo[prop3]['permisos'][prop4]['created_at']
                    delete this.roleToEdit.modulos[prop].subModulo[prop3]['permisos'][prop4]['updated_at']
                    delete this.roleToEdit.modulos[prop].subModulo[prop3]['permisos'][prop4]['role_id']
                    delete this.roleToEdit.modulos[prop].subModulo[prop3]['permisos'][prop4]['id']
                    delete this.roleToEdit.modulos[prop].subModulo[prop3]['permisos'][prop4]['sub_modulo_id']
                    for(var prop5 in this.roleToEdit.modulos[prop].subModulo[prop3]['permisos'][prop4]){
                        this.permisosSeleccionados[this.roleName][modName][subName][prop5] = this.roleToEdit.modulos[prop].subModulo[prop3]['permisos'][prop4][prop5]
                    }

                }
            }
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
