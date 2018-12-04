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
            <ModuloSelectList op="edit"></ModuloSelectList>
        </el-col>
    </el-row>
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
        ...mapState('authentication', [
            'permisos'
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
            'setSelectedModules',
        ]),
        ...mapActions('roles', [
            'edit',
            'fetchAllModules',
            'fetchRole',
            'delRole',
        ]),
        del(){
            this.$confirm('El role '+this.roleToEdit.nombre+' sera permanentemente eliminado de los registros. Continuar?', 'Atencion', {
				confirmButtonText: 'OK',
				cancelButtonText: 'Cancelar',
				type: 'warning',
				center: true
			}).then(() => {
                this.delRole(this.roleToEdit.id)
                this.$message({
					type: 'success',
					message: 'Role eliminado'
                });
                router.push('/Roles')
			}).catch(() => {
				this.$message({
					type: 'info',
					message: 'Eliminacion cancelada'
				});
			});
        },
        actualizar(){
            this.edit()
            this.$forceUpdate()
        },
        pushToRoleTable(){
            router.push('/Roles')
        }

    },
    created(){
        this.fetchAllModules()
        let selected = []
        for(let prop in this.roleToEdit.modulos){
            selected.push(this.roleToEdit.modulos[prop]['id'])
        }
        this.setSelectedModules(selected)
    }
}
</script>

<style>
.form{
    padding:5px 30px;
}

</style>
