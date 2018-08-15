<template>
<div v-if="op">
        <el-collapse v-if="modulesAvailable">
        <el-collapse-item  v-for="item in roleToEdit.modulos" :key="item.id" :title="item.nombre">
       
            <el-tabs v-model="activeName[item.nombre]" :tab-position="tabPosition">
                <el-tab-pane 
                    v-for="sub in item.subModulo" 
                    :key="sub.id" 
                    :label="sub.nombre" 
                    :value="sub.nombre" 
                    :name="sub.nombre"
                >
                    <p>Porfavor elija los permisos deseados de manipulacion a <b>{{sub.nombre}}</b> para <b>{{roleName}}</b></p>
                    <p>{{sub.descripcion}}</p>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox 
                    border
                    :checked="permisosSeleccionados[sub.nombre][per]" 
                    v-for="per in permisosDisponibles" 
                    :label="per" 
                    :key="per" 
                    @input="handleCheckedPermisoChange($event, sub.nombre, per)">
                    {{per}}
                    </el-checkbox>
                    <div class="btn-ctn">
                        <el-button type="primary" @click="actualizarPermisos(sub.nombre, sub.id)" size="mini" round plain>Actualizar permisos</el-button>
                    </div>
                    
                </el-tab-pane>
            </el-tabs>
            
        </el-collapse-item>
        </el-collapse>

        <div class="btn-ctn" v-else>
            <el-button type="primary" @click="setModuleListDialogeVisible(true)" size="mini" round plain>Agregar Modulos</el-button>
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

 export default {
    data() {
      return {
        activo: ['1'],
        checkAll: {},
        activeName: {},
        permisosSeleccionados: {},
        permisosDisponibles: ['editar', 'crear', 'eliminar'],
        isIndeterminate: {},
        tabPosition: 'top',
      };
    },
    props: ['role-name', 'op'],
    computed: {
        ...mapState('roles', [
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
      actualizarPermisos(subName, subId) {
        this.setSelectedPermisos(this.permisosSeleccionados[subName])
        this.setPermisos(subId)
      },
      handleCheckAllChange(event, subName) {
        for(let prop in this.permisosSeleccionados[subName]){
            this.permisosSeleccionados[subName][prop] = event
        }
        console.log(this.permisosSeleccionados[subName])
        this.isIndeterminate[subName] = false;
      },
      handleCheckedPermisoChange(event, subName, op) {
        this.permisosSeleccionados[subName][op] = event;
      },
     
    },
    created(){
        for(let prop in this.roleToEdit.modulos){
            this.activeName[this.roleToEdit.modulos[prop]['nombre']] = this.roleToEdit.modulos[prop].subModulo[0]['nombre']
            for(let prop3 in this.roleToEdit.modulos[prop].subModulo){
                let name = this.roleToEdit.modulos[prop].subModulo[prop3]['nombre'].toString()
                this.permisosSeleccionados[name] = {}
                for(let prop4 in this.roleToEdit.modulos[prop].subModulo[prop3]['permisos'])
                {
                    delete this.roleToEdit.modulos[prop].subModulo[prop3]['permisos'][prop4]['created_at']
                    delete this.roleToEdit.modulos[prop].subModulo[prop3]['permisos'][prop4]['updated_at']
                    delete this.roleToEdit.modulos[prop].subModulo[prop3]['permisos'][prop4]['role_id']
                    delete this.roleToEdit.modulos[prop].subModulo[prop3]['permisos'][prop4]['id']
                    delete this.roleToEdit.modulos[prop].subModulo[prop3]['permisos'][prop4]['sub_modulo_id']
                    for(var prop5 in this.roleToEdit.modulos[prop].subModulo[prop3]['permisos'][prop4]){
                        this.permisosSeleccionados[name][prop5] = this.roleToEdit.modulos[prop].subModulo[prop3]['permisos'][prop4][prop5]
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
}

</style>
