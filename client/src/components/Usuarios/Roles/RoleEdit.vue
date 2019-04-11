<template>
    <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <h3>Info</h3>
            <div>
                <el-form size="mini" ref="form" :model="roleToEdit" label-position="top" label-width="120px">
                    <el-form-item label="Nombre">
                        <el-input @input="setRoleToEditNombre" :value="roleToEdit.nombre"></el-input>
                    </el-form-item>
                    <el-form-item label="Descripcion">
                        <el-input  type="textarea" autosize @input="setRoleToEditDescription" :value="roleToEdit.description"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <h3>Permisos</h3>
            <RoleModuloEdit :role-name="roleToEdit.nombre" :op="true"></RoleModuloEdit>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <h3>Modulos</h3>
            <ModuloTransfer op="edit"></ModuloTransfer>
        </el-col>
       
        
    </el-row>
</template>

<script>
import router from '../../../router'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
//components
import RoleModuloEdit from './Modulos/RoleModuloEdit'
import ModuloTransfer from './Modulos/ModuloTransfer'

export default {
    name: 'RoleEdit',
    computed: {
        ...mapState('roles', [
            'roleToEdit',
        ]),
        ...mapState('authentication', [
            'permisos'
        ]),
    },
    components: {
        RoleModuloEdit,
        ModuloTransfer,
    },
    methods: {
        ...mapMutations('roles',[
            'setRoleToEditNombre',
            'setRoleToEditDescription',
        ]),

    },
}
</script>

<style>
.form{
    padding:5px 30px;
}

</style>
