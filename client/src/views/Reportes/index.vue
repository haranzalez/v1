<template>

   
   <el-row>
       <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
           <TablesMenu></TablesMenu>
       </el-col>
       <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">

       </el-col>
   </el-row>
    
</template>

<script>

import TablesMenu from '@/components/Reportes/tablesList'


export default {
    namespaced: true,
    components: {
        TablesMenu,
	}
}
</script>

<style>

</style>