<template>
<div v-if="op">
        <el-collapse v-model="selectedMod" @change="handleSelectedModChange">
            <el-collapse-item :name="roleToEdit.nombre + '-' + mod.nombre"  v-for="mod in modules" :key="roleToEdit.nombre + '-' + mod.nombre" :title="mod.nombre">
                <el-tabs v-model="activeTabs[mod.nombre]" :tab-position="tabPosition">
                    <el-tab-pane 
                        v-for="sub in mod.subModulo" 
                        :key="sub.id" 
                        :label="sub.nombre" 
                        :value="sub.nombre" 
                        :name="sub.nombre"
                    >
                        <p><b>Permisos {{sub.nombre}}</b></p>
                        <div style="margin: 15px 0;"></div>
                        
                     <div v-for="(per, key) in availablePermisos[roleToEdit.nombre][mod.nombre][sub.nombre]" :key="roleToEdit.nombre + '-' + mod.nombre + '-' + mod.nombre + '-' +per" class="inputGroup">
                  
                        <input 
                            :disabled="(permisos['Roles'].editar)? false:true"
                            :checked="permisosOperation[roleToEdit.nombre][mod.nombre][sub.nombre][per]"
                            type="checkbox" 
                            @change="handlePermisosCheck($event, permisosOperation[roleToEdit.nombre][mod.nombre][sub.nombre]['subId'])"
                            :value="roleToEdit.nombre + '-' + mod.nombre + '-' + sub.nombre + '-' + per"
                            :name="roleToEdit.nombre + '-' + mod.nombre + '-' + sub.nombre + '-' + per"
                        >
                        <label :for="roleToEdit.nombre + '-' + mod.nombre + '-' + mod.nombre + '-' +per">{{per}}</label>
  
                    </div>
                    <!-- {{permisosOperation[roleToEdit.nombre]}} -->
                        
                    </el-tab-pane>
                </el-tabs>
            </el-collapse-item>
        </el-collapse>
</div>

</template>

<script>

import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

 export default {
    data() {
      return {
        activo: ['1'],
        selectedMod: '',
        checkAll: {},
        activeName: {},
        isIndeterminate: {},
        tabPosition: 'top',
       
      };
    },
    components:{
    },
    props: ['role-name', 'op'],
    computed: {
        permisosOperation:{
           cache: false,
           get: function(){
               return this.permisosOps
           }
        },
        ...mapState('roles', [
            'permisosReady',
            'modules',
            'roleToEdit',
            'roleModuleDialogeVisible',
            'modulesAvailable',
            'permisosOps',
            'activeTabs',
            'availablePermisos',
            'renderReady',
        ]),
        ...mapState('authentication', [
			'permisos',
        ]),
        
        
    },
    methods: {
        availablePermisosMethod(role, mod, sub){
           this.fetchPermisos('ns')
           return availablePermisos[role][mod][sub]
        },
        ...mapMutations('roles', [
            'setSelectedPermisos',
            'setModuleListDialogeVisible',
            'setPermisosOps',
        ]),
        ...mapActions('roles', [
            'edit',
            'setPermisos',
            'fetchPermisos',
            'renderPermisos',
        ]),
      actualizarPermisos(modName,subName, subId) {
        this.setPermisos(subId)
      },
      handleSelectedModChange(value){
          console.log(value)
          this.selectedMod = value
      },
      handlePermisosCheck(event, subid){
        var value = event.target.value
        value = value.split('-')
        value = value[3]
        this.setSelectedPermisos({
            op:value,
            value: event.target.checked
        })
        this.setPermisos(subid)
        console.log(event.target.checked, subid)
    },
     
    },
    created(){
       
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
