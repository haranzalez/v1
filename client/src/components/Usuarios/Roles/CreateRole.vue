<template>
     <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <h3>Info</h3>
            <div>
                <el-form size="mini" ref="form" :model="roleToCreate" label-position="top" label-width="120px">
                    <el-form-item label="Nombre">
                        <el-input @input="setRoleToCreateNombre"></el-input>
                    </el-form-item>
                    <el-form-item label="Descripcion">
                        <el-input  type="textarea" autosize @input="setRoleToCreateDescription"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <h3>Modulos</h3>
            <ModuloTransfer op="create"></ModuloTransfer>
        </el-col>
        
    </el-row>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import RoleModuloEdit from './Modulos/RoleModuloEdit'
import ModuloTransfer from './Modulos/ModuloTransfer'
export default {
    name: 'RoleCreate',
    computed: {
        ...mapState('roles', [
            'roleToCreate',
            'modules',
            'allModules',
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
            'setRoleToCreateNombre',
            'setRoleToCreateDescription',
            'setModuleListDialogeVisible',
            'setRoleModuleDialogeVisible',
        ]),
        ...mapActions('roles', [
            'create',
            'fetchAllModules'
        ]),

    },
    created(){
        this.fetchAllModules('ns')
    }
}
</script>

<style>

</style>
