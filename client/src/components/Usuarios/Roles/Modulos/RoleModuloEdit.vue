<template>
<div>
        <!-- DIALOG -->
        <el-dialog center width="20%" :modal="false" :title="'Permisos para ' + activeSubModName" :visible.sync="permisosDialogVisible">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">Todos</el-checkbox>
            <div style="margin: 15px 0;"></div>
            
            <el-checkbox-group v-model="checkedPermisosHandler">
                <el-checkbox v-for="per in permisosList" :key="per" :label="per">{{per}}</el-checkbox>
            </el-checkbox-group>
            <span slot="footer" class="dialog-footer">
                <el-button :loading="loadingAutorizarBtn" type="primary" size="mini" @click="handleSetPermisosBtn">Autorizar</el-button>
                 <el-button size="mini" @click="setPermisosDialogVisible(false)">Cerrar</el-button>
            </span>
        </el-dialog>
        <!-- COLLAPSE -->
        <el-collapse v-model="selectedMod" @change="handleSelectedModChange">
            <el-collapse-item :name="roleToEdit.nombre + '-' + mod.nombre"  v-for="mod in modules" :key="roleToEdit.nombre + '-' + mod.nombre" >
                <div slot="title">{{mod.nombre}} <i class="mdi mdi-view-module"></i></div>
                <el-row :gutter="0" style="text-align: left;">
                    <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6" v-for="sub in mod.subModulo" :key="sub.id">
                        <el-button :loading="loadingBtnsList[sub.id]" @click="handleBtnPermisoClick(sub.id, sub.nombre)" style="margin:10px 0px;" ><i :class="sub.icono"></i> {{sub.nombre}}</el-button>
                    </el-col>
                </el-row>
            </el-collapse-item>
        </el-collapse>
</div>
       
       


</template>

<script>

import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

 export default {
    data() {
      return {
        permisosList: ['editar', 'crear', 'eliminar'],
        activo: ['1'],
        selectedMod: '',
        activeName: {},
        tabPosition: 'top',
        isIndeterminate: false,
        checkAll: false,
        activeSubMod: null,
        activeSubModName: null, 
      };
    },
    components:{
    },
    props: ['role-name', 'op'],
  
    computed: {
        checkedPermisosHandler: {
            get: function(){
                if(this.checkedPermisos.length == 3){
                    this.checkAll = true

                }else{
                    this.checkAll = false
                }
                return this.checkedPermisos
            },
            set: function(value){
                console.log(value)
                this.setCheckedPermisos(value)
            }
        },
        permisosOperation:{
           cache: false,
           get: function(){
               return this.permisosOps
           }
        },
        ...mapState('roles', [
            'loadingBtnsList',
            'permisosDialogVisible',
            'permisosReady',
            'modules',
            'roleToEdit',
            'roleModuleDialogeVisible',
            'modulesAvailable',
            'permisosOps',
            'activeTabs',
            'availablePermisos',
            'renderReady',
            'checkedPermisos',
            'loadingAutorizarBtn',
            
        ]),
        ...mapState('authentication', [
			'permisos',
        ]),
        
        
    },
    methods: {
       
        handleBtnPermisoClick(subid, subname){
            this.activeSubMod = subid
            this.activeSubModName = subname
            this.fetchPermisosv2(subid)
        },
        handleCheckAllChange(value){
            console.log(value)
            if(value){
                this.setCheckedPermisos(['editar', 'crear', 'eliminar'])
                this.checkAll = value
                return
            }
            this.setCheckedPermisos([])
            this.checkAll = value
            
        },
        handleSetPermisosBtn(){
            this.setPermisos(this.activeSubMod)
        },
        availablePermisosMethod(role, mod, sub){
           return availablePermisos[role][mod][sub]
        },
        ...mapMutations('roles', [
            'setSelectedPermisos',
            'setModuleListDialogeVisible',
            'setPermisosOps',
            'setCheckedPermisos',
            'setSubModSelected',
            'setPermisosDialogVisible'
        ]),
        ...mapActions('roles', [
            'edit',
            'setPermisos',
            'fetchPermisosv2',
            'renderPermisos',
        ]),
      actualizarPermisos(modName,subName, subId) {
        this.setPermisos(subId)
      },
      handleSelectedModChange(value){
          this.selectedMod = value
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
