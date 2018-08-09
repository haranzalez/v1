<template>
  <div>
    <el-form ref="form" :model="role" label-width="120px">
    <el-form-item label="Nombre">
        <el-input @input="setRoleNombre" :value="role.nombre"></el-input>
    </el-form-item>
    <el-form-item label="Descripcion">
        <el-input @input="setRoleDescription" :value="role.description"></el-input>
    </el-form-item>
    <el-form-item>
        <p>Modulos <el-button type="info" @click="setModuleListDialogeVisible(true)">+</el-button></p>
        <role-modulo-edit :role="role.nombre"></role-modulo-edit>
    </el-form-item>
    
    <el-form-item>
        <el-button type="primary" @click="edit">Actualizar</el-button>
        <el-button>Cancelar</el-button>
    </el-form-item>
    </el-form>
    <modulo-select-list></modulo-select-list>
  </div>
  
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import RoleModuloEdit from './Modulos/RoleModuloEdit'
import ModuloSelectList from './Modulos/ModuloSelectList'
export default {
    name: 'RoleEdit',
    computed: {
        ...mapState('roles', [
            'role',
            'modules',
        ]),
    },
    components: {
        RoleModuloEdit,
        ModuloSelectList,
    },
    methods: {
        ...mapMutations('roles',[
            'setRoleNombre',
            'setRoleDescription',
            'setModuleListDialogeVisible',
        ]),
        ...mapActions('roles', [
            'edit',
            'fetchAllModules'
        ]),
        addModule(){
            return
        },

    },
    created(){
        this.fetchAllModules()
    }
}
</script>

<style>

</style>
