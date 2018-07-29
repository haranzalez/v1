<template>
    <el-form ref="form" :model="role" label-width="120px">
  <el-form-item label="Nombre">
    <el-input @input="setRoleNombre" :value="role.nombre"></el-input>
  </el-form-item>
  <el-form-item label="Descripcion">
    <el-input @input="setRoleDescription" :value="role.description"></el-input>
  </el-form-item>
  
  
  <el-form-item label="Modulos">
    <el-checkbox-group >
      <el-checkbox  name="modulo"></el-checkbox>

    </el-checkbox-group>
  </el-form-item>
  
  
  <el-form-item>
    <el-button type="primary" @click="edit">Actualizar</el-button>
    <el-button>Cancelar</el-button>
  </el-form-item>
</el-form>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
    name: 'RoleEdit',
    computed: {
        ...mapState('roles', [
            'role',
        ]),
    },
    methods: {
        ...mapMutations('roles',[
            'setRoleNombre',
            'setRoleDescription',
        ]),
        ...mapActions('roles', [
            'edit',
        ]),
    },
}
</script>

<style>

</style>
