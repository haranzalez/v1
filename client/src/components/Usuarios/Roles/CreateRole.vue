<template>
    <div>
        <!--<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>Modulos</span>
                    <el-button @click="setModuleListDialogeVisible(true)" style="float: right; padding: 3px 0" type="text">Manejar modulos</el-button>
                </div>
                <role-modulo-edit :role-name="roleToCreate.nombre"  :op="false"></role-modulo-edit>
            </el-card>
        </el-col>-->

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="form">
                <el-form ref="form" :model="roleToCreate" label-width="120px">
                    <el-form-item label="Nombre">
                        <el-input @input="setRoleToCreateNombre" ></el-input>
                    </el-form-item>
                    <el-form-item label="Descripcion">
                        <el-input type="textarea" @input="setRoleTocreateDescription"></el-input>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" :disabled="(permisos['Roles'].crear)? false:true" @click="create">Crear</el-button>
                        <el-button>Cancelar</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
        
        <modulo-select-list></modulo-select-list>
    </div>
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
            'setRoleTocreateDescription',
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
