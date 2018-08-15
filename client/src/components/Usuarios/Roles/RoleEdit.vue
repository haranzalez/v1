<template>
  <div>
    <el-col :span="12">
        <div class="form">
            <el-form ref="form" :model="roleToEdit" label-width="120px">
                <el-form-item label="Nombre">
                    <el-input @input="setRoleToEditNombre" :value="roleToEdit.nombre"></el-input>
                </el-form-item>
                <el-form-item label="Descripcion">
                    <el-input type="textarea" @input="setRoleToEditDescription" :value="roleToEdit.description"></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="edit">Actualizar</el-button>
                    <el-button @click="pushToRoleTable">Cancelar</el-button>
                </el-form-item>
            </el-form>
        </div>
        
    </el-col>

    <el-col :span="12">
        <el-card class="box-card">
             <div slot="header" class="clearfix">
                <span>Modulos</span>
                <el-button v-if="modulesAvailable" @click="setModuleListDialogeVisible(true)" style="float: right; padding: 3px 0" type="text">Manejar modulos</el-button>
            </div>
            <role-modulo-edit :role-name="roleToEdit.nombre" :op="true"></role-modulo-edit>
        </el-card>
    </el-col>
    
    <modulo-select-list></modulo-select-list>
  </div>
  
</template>

<script>
import router from '../../../router'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import RoleModuloEdit from './Modulos/RoleModuloEdit'
import ModuloSelectList from './Modulos/ModuloSelectList'
export default {
    name: 'RoleEdit',
    computed: {
        ...mapState('roles', [
            'roleToEdit',
            'modules',
            'modulesAvailable',
        ]),
    },
    components: {
        RoleModuloEdit,
        ModuloSelectList,
    },
    methods: {
        ...mapMutations('roles',[
            'setRoleToEditNombre',
            'setRoleToEditDescription',
            'setModuleListDialogeVisible',
            'setRoleModuleDialogeVisible',
        ]),
        ...mapActions('roles', [
            'edit',
            'fetchAllModules'
        ]),
        addModule(){
            return
        },
        pushToRoleTable(){
            router.push('/Roles')
        }

    },
    created(){
        this.fetchAllModules()
    }
}
</script>

<style>
.form{
    padding:5px 30px;
}
</style>
