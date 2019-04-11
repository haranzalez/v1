<template>

   <div>
       <el-row>
           <el-col :span="24" :md="24" :sm="24" :xs="24">
               <tabla></tabla>
           </el-col>
       </el-row>
   </div>
    
</template>

<script>
import Tabla from '@/components/Usuarios/Roles/RolesTable'
import editForm from '@/components/Usuarios/Roles/RoleEdit'


export default {
    namespaced: true,
    components: {
        Tabla,
        editForm,
	}
}
</script>

<style>

</style>
