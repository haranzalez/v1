<template>

   
    <vue-scroll>
    <user-table></user-table>
    </vue-scroll>
    
</template>

<script>

import UserTable from '@/components/Usuarios/UserTable'


export default {
    namespaced: true,
    components: {
        UserTable,
	}
}
</script>

<style>

</style>
