<template>

   
   <el-row>
       <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
           <TablesMenu></TablesMenu>
       </el-col>
       <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
           <TablePage></TablePage>
       </el-col>
   </el-row>
    
</template>

<script>

import TablesMenu from '@/components/Reportes/tablesList'
import TablePage from '@/components/Reportes/tablePage'


export default {
    namespaced: true,
    components: {
        TablesMenu,
        TablePage,
	}
}
</script>

<style>

</style>