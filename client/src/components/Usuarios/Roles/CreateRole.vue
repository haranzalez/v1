<template>
    <div>
        <el-col :span="12">
            <div class="form">
                <el-form ref="form" :model="roleToCreate" label-width="120px">
                    <el-form-item label="Nombre">
                        <el-input @input="setRoleToCreateNombre" ></el-input>
                    </el-form-item>
                    <el-form-item label="Descripcion">
                        <el-input type="textarea" @input="setRoleToCreateDescription"></el-input>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="create">Crear</el-button>
                        <el-button>Cancelar</el-button>
                    </el-form-item>
                </el-form>
            </div>
            
        </el-col>

        <el-col :span="12">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>Modulos</span>
                    <el-button @click="setModuleListDialogeVisible(true)" style="float: right; padding: 3px 0" type="text">Manejar modulos</el-button>
                </div>
                <role-modulo-edit :role-name="roleToCreate.nombre"  :op="false"></role-modulo-edit>
            </el-card>
        </el-col>
        
        <modulo-select-list></modulo-select-list>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import RoleModuloEdit from './Modulos/RoleModuloEdit'
import ModuloSelectList from './Modulos/ModuloSelectList'
export default {
    name: 'RoleCreate',
    computed: {
        ...mapState('roles', [
            'roleToCreate',
            'modules',
        ]),
    },
    components: {
        RoleModuloEdit,
        ModuloSelectList,
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
