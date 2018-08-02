<template>
    <el-form ref="form" :model="role" label-width="120px">
  <el-form-item label="Nombre">
    <el-input @input="setRoleNombre" :value="role.nombre"></el-input>
  </el-form-item>
  <el-form-item label="Descripcion">
    <el-input @input="setRoleDescription" :value="role.description"></el-input>
  </el-form-item>
  
  <el-form-item>
      <role-modulo-edit></role-modulo-edit>
  </el-form-item>
  
  <el-form-item>
    <el-button type="primary" @click="edit">Actualizar</el-button>
    <el-button>Cancelar</el-button>
  </el-form-item>
</el-form>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import RoleModuloEdit from './Modulos/RoleModuloEdit'
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
    },
    methods: {
        ...mapMutations('roles',[
            'setRoleNombre',
            'setRoleDescription',
        ]),
        ...mapActions('roles', [
            'edit',
            'fetchAllModules'
        ]),
    },
    created(){
        this.fetchAllModules()
    }
}
</script>

<style>

</style>
