<template>
    <user-table></user-table>
</template>

<script>

import UserTable from '@/components/UserTable'

export default {
    namespaced: true,
    data(){
        view: 'user'
    },
    components: {
        UserTable,
	}
}
</script>

<style>

</style>
