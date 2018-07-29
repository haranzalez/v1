<template>

   
    <div>
    <user-table></user-table>
    </div>
    
</template>

<script>

import UserTable from '@/components/UserTable'
import RolesTable from '@/components/RolesTable'

export default {
    namespaced: true,
    components: {
        UserTable,
        RolesTable
	}
}
</script>

<style>

</style>
