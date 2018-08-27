<template>
  <div>
      <h1>Actualizando {{roleToEdit.nombre}}</h1>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>Modulos</span>
                <el-button v-if="modulesAvailable" :disabled="(permisos['Roles'].editar)? false:true" @click="setModuleListDialogeVisible(true)" style="float: right; padding: 3px 0" type="text">Manejar modulos</el-button>
            </div>
            <role-modulo-edit :role-name="roleToEdit.nombre" :op="true"></role-modulo-edit>
        </el-card>
       
    </el-col>

    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="form">
            <el-form ref="form" :model="roleToEdit" label-width="120px">
                <el-form-item label="Nombre">
                    <el-input @input="setRoleToEditNombre" :value="roleToEdit.nombre"></el-input>
                </el-form-item>
                <el-form-item label="Descripcion">
                    <el-input type="textarea" @input="setRoleToEditDescription" :value="roleToEdit.description"></el-input>
                </el-form-item>
                <el-form-item>
                
                </el-form-item>
                <el-form-item>
                     <el-button type="text" :disabled="(permisos['Roles'].eliminar)? false:true" @click="del">Eliminar</el-button>
                    <el-button @click="pushToRoleTable">Cancelar</el-button>
                     <el-button type="primary" :disabled="(permisos['Roles'].editar)? false:true" @click="actualizar">Actualizar</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-col>
    
     <modulo-select-list op="edit"></modulo-select-list>
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
